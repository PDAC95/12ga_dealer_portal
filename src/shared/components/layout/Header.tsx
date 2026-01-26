import { FC } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const { dealer, logout } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-gray-800 z-40">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-surface-hover transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">12GA</span>
            <span className="text-lg font-medium text-white">Dealer Portal</span>
          </div>
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
