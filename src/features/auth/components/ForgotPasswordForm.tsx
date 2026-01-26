import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { AxiosError } from 'axios';

import { Button, Input } from '@/shared/components/ui';
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from '../schemas/auth.schemas';
import { useForgotPassword } from '../hooks/useAuth';
import type { AuthError } from '../types/auth.types';

export const ForgotPasswordForm: FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => setEmailSent(true),
    });
  };

  const getErrorMessage = () => {
    if (!forgotPasswordMutation.error) return null;
    const axiosError = forgotPasswordMutation.error as AxiosError<AuthError>;
    return (
      axiosError.response?.data?.error?.message ||
      'Error al enviar email. Intenta de nuevo.'
    );
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-semibold text-white">Email enviado</h2>
        <p className="text-muted">
          Hemos enviado instrucciones para restablecer tu contraseña a{' '}
          <span className="text-white">{getValues('email')}</span>
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-xl font-semibold text-white">
          Recuperar contraseña
        </h2>
        <p className="text-muted text-sm">
          Ingresa tu email y te enviaremos instrucciones
        </p>
      </div>

      {/* Email Field */}
      <div className="relative">
        <div className="absolute left-3 top-3 z-10">
          <Mail className="w-5 h-5 text-muted" />
        </div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="pl-11"
          error={errors.email?.message}
          autoComplete="email"
        />
      </div>

      {/* Error Message */}
      {forgotPasswordMutation.isError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{getErrorMessage()}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={forgotPasswordMutation.isPending}
      >
        Enviar instrucciones
      </Button>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al login
        </Link>
      </div>
    </form>
  );
};
