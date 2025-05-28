import { useEffect } from 'react';
import { supabase, isMockMode } from '@/lib/supabase';
import { useAuthStore } from '@/lib/store';
import { mockUser } from '@/lib/mock';
import type { User } from '@/types';

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading, setNDAStatus, clearAuth } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    
    // Check active sessions
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Handle mock mode
        if (isMockMode()) {
          if (mounted) {
            setUser(mockUser);
            setNDAStatus(true, new Date().toISOString());
          }
          return;
        }
        
        // Real Supabase auth
        if (!supabase) {
          console.error('Supabase client not initialized');
          return;
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }

        if (session?.user && mounted) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            company: session.user.user_metadata?.company,
            position: session.user.user_metadata?.position,
            investor_type: session.user.user_metadata?.investor_type,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          };
          
          setUser(userData);
          
          // Check NDA status
          await checkNDAStatus(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Skip auth listener in mock mode
    if (isMockMode()) {
      return;
    }

    // Listen for auth changes (only in real mode)
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_IN' && session?.user) {
            const userData: User = {
              id: session.user.id,
              email: session.user.email!,
              full_name: session.user.user_metadata?.full_name,
              company: session.user.user_metadata?.company,
              position: session.user.user_metadata?.position,
              investor_type: session.user.user_metadata?.investor_type,
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at,
            };
            
            setUser(userData);
            await checkNDAStatus(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            clearAuth();
          }
        }
      );

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, [setUser, setLoading, setNDAStatus, clearAuth]);

  const checkNDAStatus = async (userId: string) => {
    try {
      // Mock mode always returns signed NDA
      if (isMockMode()) {
        setNDAStatus(true, new Date().toISOString());
        return;
      }
      
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      const { data, error } = await supabase
        .from('nda_signatures')
        .select('signed_at')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking NDA status:', error);
        return;
      }

      setNDAStatus(!!data, data?.signed_at);
    } catch (error) {
      console.error('Error checking NDA status:', error);
    }
  };

  return {
    user,
    isLoading,
  };
};
