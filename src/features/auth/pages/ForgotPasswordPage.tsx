import { FC } from 'react';
import { Card } from '@/shared/components/ui';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export const ForgotPasswordPage: FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header con logo */}
      <div className="flex-shrink-0 pt-8 pb-4 px-4">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">12GA</span>
            <span className="text-2xl font-medium text-white">Customs</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <Card padding="lg" className="border border-gray-800">
            <ForgotPasswordForm />
          </Card>
        </div>
      </div>
    </div>
  );
};
