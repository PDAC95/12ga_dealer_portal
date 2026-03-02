import { create } from 'zustand';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ScreensaverConfig {
  enabled: boolean;
  timeoutSeconds: number;
}

interface UIState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  toasts: Toast[];
  screensaver: ScreensaverConfig;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setScreensaverEnabled: (enabled: boolean) => void;
  setScreensaverTimeout: (seconds: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  isSidebarOpen: false,
  toasts: [],
  screensaver: {
    enabled: true,
    timeoutSeconds: 60,
  },
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: Date.now().toString() }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  setScreensaverEnabled: (enabled) =>
    set((state) => ({
      screensaver: { ...state.screensaver, enabled },
    })),
  setScreensaverTimeout: (seconds) =>
    set((state) => ({
      screensaver: { ...state.screensaver, timeoutSeconds: seconds },
    })),
}));
