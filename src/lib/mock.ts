// Mock data and utilities for development without Supabase
// This file provides fallback functionality when Supabase is not configured

export const MOCK_MODE = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://your-project.supabase.co';

// Mock Auth State
export const mockUser = {
  id: 'mock-user-123',
  email: 'demo@investor.com',
  full_name: 'Demo Investor',
  company: 'VC Fund',
  position: 'Partner',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

// Mock API Responses
export const mockApiResponses = {
  signUp: async (email: string, password: string) => {
    console.warn('🔄 MOCK MODE: Using mock authentication');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return {
      data: { user: mockUser, session: { access_token: 'mock-token' } },
      error: null
    };
  },

  signIn: async (email: string, password: string) => {
    console.warn('🔄 MOCK MODE: Using mock authentication');
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      data: { user: mockUser, session: { access_token: 'mock-token' } },
      error: null
    };
  },

  getCurrentUser: async () => {
    return { user: mockUser, error: null };
  },

  joinWishlist: async (email: string) => {
    console.warn('🔄 MOCK MODE: Wishlist signup simulated');
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: { id: 'mock-wishlist-' + Date.now(), email },
      error: null
    };
  },

  submitFeedback: async (feedback: any) => {
    console.warn('🔄 MOCK MODE: Feedback submission simulated');
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      data: { id: 'mock-feedback-' + Date.now(), ...feedback },
      error: null
    };
  },

  signNDA: async (ndaData: any) => {
    console.warn('🔄 MOCK MODE: NDA signature simulated');
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      data: { id: 'mock-nda-' + Date.now(), ...ndaData, signed_at: new Date().toISOString() },
      error: null
    };
  },

  checkNDAStatus: async () => {
    return {
      hasSignedNDA: true,
      signedAt: new Date().toISOString(),
      ndaVersion: 'v1.0'
    };
  }
};

// Development console messages
export const showMockWarning = () => {
  if (MOCK_MODE) {
    console.log(`
🚧 DEVELOPMENT MODE ACTIVE 🚧
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ App running with MOCK DATA
✅ All features functional for demo purposes
⚠️  Supabase not configured - using fallback mode

TO ENABLE FULL FUNCTIONALITY:
1. Create Supabase project at supabase.com
2. Copy .env.local to .env 
3. Add your Supabase URL and anon key
4. Restart development server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }
};

// Mock YouTube video fallback
export const FALLBACK_VIDEO_ID = 'JyENjwMuMGA'; // Default demo video

// Export helper to check if we're in mock mode
export const isMockMode = () => MOCK_MODE;
