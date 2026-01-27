import { FC } from 'react';
import { Zap } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

// Logo URL from Cloudinary
const LOGO =
  'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png';

export const WelcomeCard: FC = () => {
  const { dealer } = useAuthStore();

  if (!dealer) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-surface">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center p-2 border border-white/10">
            <img
              src={LOGO}
              alt="12GA"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm text-white/60">Welcome back</p>
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white truncate mt-1">
              {dealer.companyName}
            </h1>
            <p className="text-sm text-white/50 truncate mt-0.5">
              {dealer.contactName}
            </p>
          </div>
        </div>

        {/* Stats or quick info */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-white/50">Portal Active</span>
          </div>
          <span className="text-xs text-white/40">Dealer Account</span>
        </div>
      </div>
    </div>
  );
};
