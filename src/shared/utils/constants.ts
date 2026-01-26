export const API_BASE_URL = import.meta.env.VITE_API_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME || '12GA Dealer Portal';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const CURRENT_ENV = import.meta.env.VITE_ENV || 'development';

// Environment detection
export const IS_DEVELOPMENT = CURRENT_ENV === 'development';
export const IS_STAGING = CURRENT_ENV === 'staging';
export const IS_PRODUCTION = CURRENT_ENV === 'production';

// Feature flags
export const ENABLE_CHAT = import.meta.env.VITE_ENABLE_CHAT === 'true';
export const ENABLE_OFFLINE = import.meta.env.VITE_ENABLE_OFFLINE === 'true';

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'dealer_token',
  AUTH: 'auth-storage',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/dealers/login',
    REGISTER: '/api/dealers/register',
    PROFILE: '/api/dealers/profile',
    LOGOUT: '/api/dealers/logout',
    FORGOT_PASSWORD: '/api/dealers/forgot-password',
    RESET_PASSWORD: '/api/dealers/reset-password',
    GOOGLE: '/api/dealers/auth/google',
    GOOGLE_CALLBACK: '/api/dealers/auth/google/callback',
  },
  MARKETING: {
    IMAGES: '/api/marketing/images',
  },
  PRODUCTS: {
    SPECS: '/api/products/specs',
  },
  CHAT: {
    MESSAGE: '/api/chat/message',
  },
} as const;
