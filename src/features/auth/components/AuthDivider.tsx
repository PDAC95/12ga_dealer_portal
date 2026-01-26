import { FC } from 'react';

export const AuthDivider: FC = () => {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-surface text-muted">o continuar con</span>
      </div>
    </div>
  );
};
