import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AxiosError } from 'axios';

import { Button } from '@/shared/components/ui';
import { loginSchema, LoginFormData } from '../schemas/auth.schemas';
import { useLogin } from '../hooks/useAuth';
import { SocialLoginButton } from './SocialLoginButton';
import type { AuthError } from '../types/auth.types';

interface LoginFormProps {
  variant?: 'default' | 'glass';
}

export const LoginForm: FC<LoginFormProps> = ({ variant = 'default' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const getErrorMessage = () => {
    if (!loginMutation.error) return null;
    const axiosError = loginMutation.error as AxiosError<AuthError>;
    return (
      axiosError.response?.data?.error?.message ||
      'Error al iniciar sesión. Intenta de nuevo.'
    );
  };

  const isGlass = variant === 'glass';

  const inputClasses = isGlass
    ? 'w-full px-4 py-3 pl-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
    : 'w-full px-4 py-3 pl-11 bg-surface border border-gray-700 rounded-lg text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors';

  const inputWithErrorClasses = isGlass
    ? 'w-full px-4 py-3 pl-11 pr-11 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
    : 'w-full px-4 py-3 pl-11 pr-11 bg-surface border border-gray-700 rounded-lg text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Mail className={`w-5 h-5 ${isGlass ? 'text-white/60' : 'text-muted'}`} />
        </div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <Lock className={`w-5 h-5 ${isGlass ? 'text-white/60' : 'text-muted'}`} />
        </div>
        <input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          className={`${inputWithErrorClasses} ${errors.password ? 'border-red-500' : ''}`}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${isGlass ? 'text-white/60 hover:text-white' : 'text-muted hover:text-white'} transition-colors`}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            {...register('rememberMe')}
            type="checkbox"
            className="w-4 h-4 rounded border-white/30 bg-white/10 text-primary focus:ring-primary focus:ring-offset-0"
          />
          <span className={`text-sm ${isGlass ? 'text-white/70 group-hover:text-white' : 'text-muted group-hover:text-white'} transition-colors`}>
            Recordarme
          </span>
        </label>
        <Link
          to="/forgot-password"
          className={`text-sm ${isGlass ? 'text-white/70 hover:text-white' : 'text-primary hover:text-primary-hover'} transition-colors`}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {/* Error Message */}
      {loginMutation.isError && (
        <div className={`p-3 ${isGlass ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-500/10 border border-red-500/20'} rounded-lg`}>
          <p className="text-sm text-red-400">{getErrorMessage()}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={loginMutation.isPending}
        className={isGlass ? 'bg-primary hover:bg-primary-hover shadow-lg shadow-primary/25' : ''}
      >
        Iniciar Sesión
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${isGlass ? 'border-white/20' : 'border-gray-700'}`} />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-4 ${isGlass ? 'bg-transparent text-white/60' : 'bg-surface text-muted'}`}>
            o
          </span>
        </div>
      </div>

      {/* Google Login */}
      <SocialLoginButton provider="google" />
    </form>
  );
};
