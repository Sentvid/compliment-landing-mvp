import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserPermissions, UserRole } from '@/types';

// Get user permissions based on role and NDA status
const getUserPermissions = (user: User | null, hasSignedNDA: boolean): UserPermissions => {
  if (!user) {
    return {
      canViewGlossary: false,
      canSubmitFeedback: true,
      canJoinWishlist: true,
      canViewAnalytics: false
    };
  }

  const isInvestor = user.investor_type === 'vc' || user.investor_type === 'angel' || user.investor_type === 'corporate';
  
  return {
    canViewGlossary: hasSignedNDA,
    canSubmitFeedback: true,
    canJoinWishlist: true,
    canViewAnalytics: isInvestor && hasSignedNDA
  };
};

// Auth Store
interface AuthState {
  user: User | null;
  isLoading: boolean;
  hasSignedNDA: boolean;
  ndaSignedAt: string | null;
  permissions: UserPermissions;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setNDAStatus: (signed: boolean, signedAt?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isLoading: true,
  hasSignedNDA: false,
  ndaSignedAt: null,
  permissions: getUserPermissions(null, false),
  setUser: (user) => {
    const { hasSignedNDA } = get();
    const permissions = getUserPermissions(user, hasSignedNDA);
    set({ user, permissions });
  },
  setLoading: (isLoading) => set({ isLoading }),
  setNDAStatus: (hasSignedNDA, ndaSignedAt) => {
    const { user } = get();
    const permissions = getUserPermissions(user, hasSignedNDA);
    set({ hasSignedNDA, ndaSignedAt, permissions });
  },
  clearAuth: () => set({ 
    user: null, 
    hasSignedNDA: false, 
    ndaSignedAt: null,
    permissions: getUserPermissions(null, false)
  }),
}));

// Modal Store
interface ModalState {
  isAuthModalOpen: boolean;
  isFeedbackModalOpen: boolean;
  authMode: 'signin' | 'signup';
  setAuthModalOpen: (open: boolean) => void;
  setFeedbackModalOpen: (open: boolean) => void;
  setAuthMode: (mode: 'signin' | 'signup') => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalOpen: false,
  isFeedbackModalOpen: false,
  authMode: 'signin',
  setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
  setFeedbackModalOpen: (isFeedbackModalOpen) => set({ isFeedbackModalOpen }),
  setAuthMode: (authMode) => set({ authMode }),
}));

// UI Store
interface UIState {
  isMobileMenuOpen: boolean;
  activeSection: string;
  scrollY: number;
  setMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setActiveSection: (section: string) => void;
  setScrollY: (y: number) => void;
  openModal: (modalType: 'auth' | 'feedback') => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isMobileMenuOpen: false,
  activeSection: 'hero',
  scrollY: 0,
  setMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
  toggleMobileMenu: () => {
    const { isMobileMenuOpen } = get();
    set({ isMobileMenuOpen: !isMobileMenuOpen });
  },
  setActiveSection: (activeSection) => set({ activeSection }),
  setScrollY: (scrollY) => set({ scrollY }),
  openModal: (modalType) => {
    if (modalType === 'auth') {
      useModalStore.getState().setAuthModalOpen(true);
    } else if (modalType === 'feedback') {
      useModalStore.getState().setFeedbackModalOpen(true);
    }
  },
}));

// Analytics Store
interface AnalyticsState {
  wishlistSignups: number;
  videoViews: number;
  faqViews: number;
  ndaSignatures: number;
  incrementWishlistSignups: () => void;
  incrementVideoViews: () => void;
  incrementFaqViews: () => void;
  incrementNdaSignatures: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set) => ({
      wishlistSignups: 0,
      videoViews: 0,
      faqViews: 0,
      ndaSignatures: 0,
      incrementWishlistSignups: () => set((state) => ({ wishlistSignups: state.wishlistSignups + 1 })),
      incrementVideoViews: () => set((state) => ({ videoViews: state.videoViews + 1 })),
      incrementFaqViews: () => set((state) => ({ faqViews: state.faqViews + 1 })),
      incrementNdaSignatures: () => set((state) => ({ ndaSignatures: state.ndaSignatures + 1 })),
    }),
    {
      name: 'compliment-analytics',
    }
  )
);

// Technology Cards Store
interface TechCardState {
  activeCard: string | null;
  expandedCard: string | null;
  setActiveCard: (card: string | null) => void;
  setExpandedCard: (card: string | null) => void;
}

export const useTechCardStore = create<TechCardState>((set) => ({
  activeCard: null,
  expandedCard: null,
  setActiveCard: (activeCard) => set({ activeCard }),
  setExpandedCard: (expandedCard) => set({ expandedCard }),
}));

// Form Store
interface FormState {
  wishlistEmail: string;
  feedbackForm: {
    name: string;
    email: string;
    message: string;
    type: 'question' | 'idea' | 'bug' | 'partnership';
  };
  ndaForm: {
    fullName: string;
    company: string;
    position: string;
    email: string;
    signature: string;
  };
  setWishlistEmail: (email: string) => void;
  setFeedbackForm: (form: Partial<FormState['feedbackForm']>) => void;
  setNdaForm: (form: Partial<FormState['ndaForm']>) => void;
  resetFeedbackForm: () => void;
  resetNdaForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  wishlistEmail: '',
  feedbackForm: {
    name: '',
    email: '',
    message: '',
    type: 'question',
  },
  ndaForm: {
    fullName: '',
    company: '',
    position: '',
    email: '',
    signature: '',
  },
  setWishlistEmail: (wishlistEmail) => set({ wishlistEmail }),
  setFeedbackForm: (form) => set((state) => ({ 
    feedbackForm: { ...state.feedbackForm, ...form } 
  })),
  setNdaForm: (form) => set((state) => ({ 
    ndaForm: { ...state.ndaForm, ...form } 
  })),
  resetFeedbackForm: () => set({
    feedbackForm: {
      name: '',
      email: '',
      message: '',
      type: 'question',
    }
  }),
  resetNdaForm: () => set({
    ndaForm: {
      fullName: '',
      company: '',
      position: '',
      email: '',
      signature: '',
    }
  }),
}));
