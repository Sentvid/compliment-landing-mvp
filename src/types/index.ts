// User Authentication Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  company?: string;
  position?: string;
  investor_type?: 'vc' | 'angel' | 'corporate' | 'other';
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  GUEST = 'guest',
  AUTHENTICATED = 'authenticated',
  INVESTOR = 'investor',
  ADMIN = 'admin'
}

export interface UserPermissions {
  canViewGlossary: boolean;
  canSubmitFeedback: boolean;
  canJoinWishlist: boolean;
  canViewAnalytics: boolean;
}

// Wishlist Types
export interface WishlistEntry {
  id: string;
  email: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
}

// NDA Types
export interface NDASignature {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  position: string;
  email: string;
  ip_address: string;
  user_agent?: string;
  signature_text: string;
  signed_at: string;
  nda_version: string;
}

// Feedback Types
export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'question' | 'idea' | 'bug' | 'partnership';
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  status: 'new' | 'read' | 'replied' | 'archived';
}

// Technology Card Types
export interface TechnologyCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  details: {
    technology: string[];
    features: string[];
    benefits: string[];
  };
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Form Types
export interface WishlistFormData {
  email: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
  type: Feedback['type'];
}

export interface NDAFormData {
  full_name: string;
  company: string;
  position: string;
  email: string;
  signature_text: string;
}

// Animation Types
export interface MotionVariants {
  initial: any;
  animate: any;
  exit?: any;
  transition?: any;
}

// Three.js Scene Types
export interface SceneConfig {
  enableParticles: boolean;
  particleCount: number;
  enableInteraction: boolean;
  colors: string[];
}
