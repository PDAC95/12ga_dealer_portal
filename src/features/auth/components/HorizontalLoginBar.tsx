import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, X, ArrowRight } from 'lucide-react';
import { AxiosError } from 'axios';

import { loginSchema, LoginFormData } from '../schemas/auth.schemas';
import { useLogin } from '../hooks/useAuth';
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
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-3 md:hidden">
                <h2 className="text-lg font-semibold text-white">Sign In</h2>
                <button
                  type="button"
                  onClick={onToggle}
                  className="p-1.5 text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Fields Row */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                {/* Email Field */}
                <div className="relative md:w-72">
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
                    <p className="mt-1 text-xs text-red-400/80 md:hidden">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative md:w-64">
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
                    <p className="mt-1 text-xs text-red-400/80 md:hidden">{errors.password.message}</p>
                  )}
                </div>

                {/* Desktop: Circular Buttons */}
                <div className="hidden md:flex items-center gap-2">
                  {/* Login Button */}
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

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={onToggle}
                    className="p-2 text-white/30 hover:text-white/60 transition-colors duration-200 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Remember Me & Links Row */}
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
                <div className="hidden md:flex items-center gap-3">
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
                <Link
                  to="/forgot-password"
                  className="text-xs text-white/50 hover:text-white/70 transition-colors duration-200 md:hidden"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Mobile: Full Width Buttons */}
              <div className="md:hidden mt-4 space-y-3">
                {/* Sign In Button */}
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

              {/* Error Messages */}
              {(errors.email || errors.password) && (
                <div className="hidden md:block mt-2">
                  {errors.email && (
                    <p className="text-xs text-red-400/80">{errors.email.message}</p>
                  )}
                  {errors.password && (
                    <p className="text-xs text-red-400/80">{errors.password.message}</p>
                  )}
                </div>
              )}

              {/* API Error Message */}
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
