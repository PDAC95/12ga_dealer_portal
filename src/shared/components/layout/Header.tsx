import { FC } from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store';

// Logo URL from Cloudinary
const LOGO =
  'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className = '' }) => {
  const { dealer, logout } = useAuthStore();

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 bg-surface border-b border-gray-800 z-40 ${className}`}
    >
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="12GA Logo" className="h-8 object-contain" />
        </div>

        <div className="flex items-center gap-4">
          {dealer && (
            <>
              <span className="text-sm text-muted hidden sm:block">
                {dealer.companyName}
              </span>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5 text-muted" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
