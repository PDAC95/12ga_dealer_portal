import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, X, ArrowRight } from 'lucide-react';
import { AxiosError } from 'axios';

import { loginSchema, LoginFormData } from '../schemas/auth.schemas';
import { useLogin, useGoogleAuth } from '../hooks/useAuth';
import type { AuthError } from '../types/auth.types';

interface HorizontalLoginBarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const HorizontalLoginBar: FC<HorizontalLoginBarProps> = ({
  isExpanded,
  onToggle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const { handleGoogleLogin } = useGoogleAuth();

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
      'Login failed. Please try again.'
    );
  };

  return (
    <div className="flex justify-end">
      {/* Collapsed Button */}
      {!isExpanded && (
        <button
          onClick={onToggle}
          className="
            inline-flex items-center gap-2
            px-5 py-2.5
            backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl
            text-white/90 font-medium text-sm
            hover:bg-white/15 hover:text-white
            transition-all duration-300
            rounded-xl
            group
          "
        >
          <LogIn className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          <span>Login</span>
        </button>
      )}

      {/* Expanded Form */}
      {isExpanded && (
        <div
          className="
            backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl
            w-full md:w-auto
            animate-in fade-in slide-in-from-bottom-2 duration-500
          "
        >
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Desktop: Two-row layout */}
              <div className="hidden md:block">
                {/* Top Row: Inputs and buttons */}
                <div className="flex items-center gap-3">
                  {/* Email Field */}
                  <div className="relative w-72">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <Mail className="w-4 h-4 text-white/50" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="Email"
                      className={`
                        w-full px-3 py-2.5 pl-10
                        bg-white/5 backdrop-blur-sm
                        border border-white/10 rounded-xl
                        text-white text-sm placeholder-white/40
                        focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50
                        transition-all duration-300
                        ${errors.email ? 'border-red-500/50' : ''}
                      `}
                      autoComplete="email"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative w-64">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                      <Lock className="w-4 h-4 text-white/50" />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={`
                        w-full px-3 py-2.5 pl-10 pr-10
                        bg-white/5 backdrop-blur-sm
                        border border-white/10 rounded-xl
                        text-white text-sm placeholder-white/40
                        focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50
                        transition-all duration-300
                        ${errors.password ? 'border-red-500/50' : ''}
                      `}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Login Button - Circular */}
                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="
                      w-10 h-10 flex items-center justify-center
                      bg-primary hover:bg-primary-hover
                      rounded-full
                      shadow-lg shadow-primary/30
                      transition-all duration-200
                      shrink-0
                      disabled:opacity-50
                    "
                  >
                    {loginMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Google Button - Circular */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="
                      w-10 h-10 flex items-center justify-center
                      bg-white hover:bg-gray-100
                      rounded-full
                      shadow-lg
                      transition-all duration-200
                      shrink-0
                    "
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={onToggle}
                    className="p-2 text-white/30 hover:text-white/60 transition-colors duration-200 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Row: Remember me and links */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      {...register('rememberMe')}
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0 transition-colors"
                    />
                    <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-200">
                      Remember me
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/forgot-password"
                      className="text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                    <span className="text-white/20">|</span>
                    <a
                      href="mailto:dealers@12gacustoms.com"
                      className="text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
                    >
                      Need an account? Contact 12GA
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile: Vertical layout */}
              <div className="md:hidden space-y-3">
                {/* Header with close button */}
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-semibold text-white">Sign In</h2>
                  <button
                    type="button"
                    onClick={onToggle}
                    className="p-1.5 text-white/40 hover:text-white/70 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <Mail className="w-4 h-4 text-white/50" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className={`
                      w-full px-3 py-2.5 pl-10
                      bg-white/5 backdrop-blur-sm
                      border border-white/10 rounded-xl
                      text-white text-sm placeholder-white/40
                      focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50
                      transition-all duration-300
                      ${errors.email ? 'border-red-500/50' : ''}
                    `}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400/80">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <Lock className="w-4 h-4 text-white/50" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={`
                      w-full px-3 py-2.5 pl-10 pr-10
                      bg-white/5 backdrop-blur-sm
                      border border-white/10 rounded-xl
                      text-white text-sm placeholder-white/40
                      focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50
                      transition-all duration-300
                      ${errors.password ? 'border-red-500/50' : ''}
                    `}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400/80">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      {...register('rememberMe')}
                      type="checkbox"
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/50 focus:ring-offset-0"
                    />
                    <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors duration-200">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-white/50 hover:text-white/70 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button - Rectangular */}
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="
                    w-full flex items-center justify-center gap-2
                    py-3 px-4
                    bg-primary hover:bg-primary-hover
                    rounded-xl
                    shadow-lg shadow-primary/30
                    transition-all duration-200
                    disabled:opacity-50
                    text-white font-medium text-sm
                  "
                >
                  {loginMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 text-white/40">or</span>
                  </div>
                </div>

                {/* Google Button - Rectangular */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="
                    w-full flex items-center justify-center gap-2
                    py-3 px-4
                    bg-white hover:bg-gray-100
                    rounded-xl
                    shadow-lg
                    transition-all duration-200
                  "
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium text-sm">Continue with Google</span>
                </button>

                {/* Need an account link */}
                <div className="text-center pt-2">
                  <a
                    href="mailto:dealers@12gacustoms.com"
                    className="text-xs text-white/50 hover:text-white/70 transition-colors duration-200"
                  >
                    Need an account? Contact 12GA
                  </a>
                </div>
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <div className="mt-3 p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-xs text-red-400/90">{getErrorMessage()}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
