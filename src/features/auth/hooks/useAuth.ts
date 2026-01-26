import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { authService } from '../services/authService';
import type {
  LoginCredentials,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthError,
} from '../types/auth.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setDealer, setRememberMe } = useAuthStore();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (response, variables) => {
      const { dealer, token } = response.data;

      // Guardar preferencia de remember me
      setRememberMe(variables.rememberMe);

      // Guardar dealer y token en el store
      setDealer(dealer, token);

      // Redirigir al dashboard
      navigate('/dashboard');
    },
    onError: (error: AxiosError<AuthError>) => {
      console.error('Login error:', error.response?.data?.error?.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordRequest) =>
      authService.forgotPassword(payload),
    onError: (error: AxiosError<AuthError>) => {
      console.error(
        'Forgot password error:',
        error.response?.data?.error?.message
      );
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) =>
      authService.resetPassword(payload),
    onSuccess: () => {
      navigate('/login', {
        state: { message: 'Contraseña actualizada exitosamente' },
      });
    },
    onError: (error: AxiosError<AuthError>) => {
      console.error(
        'Reset password error:',
        error.response?.data?.error?.message
      );
    },
  });
};

export const useGoogleAuth = () => {
  const handleGoogleLogin = () => {
    const googleAuthUrl = authService.getGoogleAuthUrl();
    window.location.href = googleAuthUrl;
  };

  return { handleGoogleLogin };
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    queryClient.clear();
    navigate('/login');
  };

  return { handleLogout };
};
