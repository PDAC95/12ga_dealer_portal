import { apiClient } from '@/lib/axios';
import type {
  LoginCredentials,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../types/auth.types';

const AUTH_ENDPOINTS = {
  LOGIN: '/api/dealers/login',
  FORGOT_PASSWORD: '/api/dealers/forgot-password',
  RESET_PASSWORD: '/api/dealers/reset-password',
  GOOGLE_AUTH: '/api/dealers/auth/google',
  PROFILE: '/api/dealers/profile',
};

export const authService = {
  /**
   * Login con email y password
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return data;
  },

  /**
   * Solicitar reset de contraseña
   */
  forgotPassword: async (
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const { data } = await apiClient.post<ForgotPasswordResponse>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      payload
    );
    return data;
  },

  /**
   * Resetear contraseña con token
   */
  resetPassword: async (
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const { data } = await apiClient.post<ResetPasswordResponse>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      payload
    );
    return data;
  },

  /**
   * Obtener URL de autenticación Google
   */
  getGoogleAuthUrl: (): string => {
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}${AUTH_ENDPOINTS.GOOGLE_AUTH}`;
  },

  /**
   * Verificar sesión actual
   */
  verifySession: async () => {
    const { data } = await apiClient.get(AUTH_ENDPOINTS.PROFILE);
    return data;
  },
};
