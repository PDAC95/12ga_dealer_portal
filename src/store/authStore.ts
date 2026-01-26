import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IDealer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
  phone?: string;
  role?: 'dealer';
  isActive?: boolean;
}

interface AuthState {
  dealer: IDealer | null;
  token: string | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  setDealer: (dealer: IDealer, token: string) => void;
  setRememberMe: (remember: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      dealer: null,
      token: null,
      isAuthenticated: false,
      rememberMe: false,
      setDealer: (dealer, token) => {
        localStorage.setItem('dealer_token', token);
        set({ dealer, token, isAuthenticated: true });
      },
      setRememberMe: (remember) => {
        set({ rememberMe: remember });
      },
      logout: () => {
        localStorage.removeItem('dealer_token');
        set({
          dealer: null,
          token: null,
          isAuthenticated: false,
          rememberMe: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        dealer: state.dealer,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
