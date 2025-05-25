import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/lib/store';
import type { User } from '@/types';

export const useAuth = () => {
  const { user, isLoading, setUser, setLoading, setNDAStatus, reset } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    
    // Check active sessions
    const initializeAuth = async () => {
      try {
        setLoading(true);
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

    // Listen for auth changes
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
          reset();
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, setNDAStatus, reset]);

  const checkNDAStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('nda_signatures')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking NDA status:', error);
        return;
      }

      setNDAStatus(!!data);
    } catch (error) {
      console.error('Error checking NDA status:', error);
    }
  };

  return {
    user,
    isLoading,
  };
};
