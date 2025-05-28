import { createClient } from '@supabase/supabase-js';
import type { User } from '@/types';
import { MOCK_MODE, mockApiResponses, showMockWarning } from './mock';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Show development warning in mock mode
if (MOCK_MODE) {
  showMockWarning();
}

// Create Supabase client only if keys are provided
export const supabase = !MOCK_MODE ? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'compliment-auth',
    flowType: 'pkce', // Proof Key for Code Exchange
  },
}) : null;

// Auth Helpers with Mock Mode Support
export const signUp = async (email: string, password: string, metadata: Partial<User>) => {
  if (MOCK_MODE) {
    return mockApiResponses.signUp(email, password);
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (MOCK_MODE) {
    return mockApiResponses.signIn(email, password);
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (MOCK_MODE) {
    console.warn('🔄 MOCK MODE: Sign out simulated');
    return { error: null };
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (MOCK_MODE) {
    return mockApiResponses.getCurrentUser();
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const resetPassword = async (email: string) => {
  if (MOCK_MODE) {
    console.warn('🔄 MOCK MODE: Password reset simulated');
    return { data: null, error: null };
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  return { data, error };
};

// Database operations with mock mode support
export const joinWishlist = async (email: string, metadata?: any) => {
  if (MOCK_MODE) {
    return mockApiResponses.joinWishlist(email);
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{
      email,
      ip_address: metadata?.ip_address,
      user_agent: metadata?.user_agent,
      referrer: metadata?.referrer,
      utm_source: metadata?.utm_source,
      utm_medium: metadata?.utm_medium,
      utm_campaign: metadata?.utm_campaign
    }]);
  
  return { data, error };
};

export const submitFeedback = async (feedback: any) => {
  if (MOCK_MODE) {
    return mockApiResponses.submitFeedback(feedback);
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase
    .from('feedback')
    .insert([feedback]);
  
  return { data, error };
};

export const signNDA = async (ndaData: any) => {
  if (MOCK_MODE) {
    return mockApiResponses.signNDA(ndaData);
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase
    .from('nda_signatures')
    .insert([ndaData]);
  
  return { data, error };
};

export const checkNDAStatus = async (userId: string) => {
  if (MOCK_MODE) {
    return mockApiResponses.checkNDAStatus();
  }
  
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  
  const { data, error } = await supabase
    .from('nda_signatures')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw error;
  }
  
  return {
    hasSignedNDA: !!data,
    signedAt: data?.signed_at,
    ndaVersion: data?.nda_version
  };
};

// Export mock mode flag for components to check
export const isMockMode = () => MOCK_MODE;
