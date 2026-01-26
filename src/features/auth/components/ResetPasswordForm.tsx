import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AxiosError } from 'axios';

import { Button, Input } from '@/shared/components/ui';
import {
  resetPasswordSchema,
  ResetPasswordFormData,
} from '../schemas/auth.schemas';
import { useResetPassword } from '../hooks/useAuth';
import type { AuthError } from '../types/auth.types';

export const ResetPasswordForm: FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate({
      token,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  const getErrorMessage = () => {
    if (!resetPasswordMutation.error) return null;
    const axiosError = resetPasswordMutation.error as AxiosError<AuthError>;
    return (
      axiosError.response?.data?.error?.message ||
      'Error al restablecer contraseña. El token puede haber expirado.'
    );
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-white">Token inválido</h2>
        <p className="text-muted">
          El enlace de recuperación es inválido o ha expirado. Por favor,
          solicita uno nuevo.
        </p>
        <Link
          to="/forgot-password"
          className="inline-block text-primary hover:text-primary-hover transition-colors"
        >
          Solicitar nuevo enlace
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-semibold text-white">Nueva contraseña</h2>
        <p className="text-muted text-sm">Ingresa tu nueva contraseña</p>
      </div>

      {/* Password Field */}
      <div className="relative">
        <div className="absolute left-3 top-3 z-10">
          <Lock className="w-5 h-5 text-muted" />
        </div>
        <Input
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          placeholder="Nueva contraseña"
          className="pl-11 pr-11"
          error={errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-muted hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Confirm Password Field */}
      <div className="relative">
        <div className="absolute left-3 top-3 z-10">
          <Lock className="w-5 h-5 text-muted" />
        </div>
        <Input
          {...register('confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirmar contraseña"
          className="pl-11 pr-11"
          error={errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-3 text-muted hover:text-white transition-colors"
        >
          {showConfirmPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Password Requirements */}
      <p className="text-xs text-muted">
        La contraseña debe tener al menos 8 caracteres, una mayúscula, una
        minúscula y un número.
      </p>

      {/* Error Message */}
      {resetPasswordMutation.isError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{getErrorMessage()}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={resetPasswordMutation.isPending}
      >
        Restablecer contraseña
      </Button>
    </form>
  );
};
