import { FC, ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard: FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        rounded-2xl
        shadow-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};
