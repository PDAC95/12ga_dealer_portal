import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Image, Package, MessageCircle } from 'lucide-react';

interface NavItem {
  to: string;
  icon: FC<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: Home, label: 'Inicio' },
  { to: '/gallery', icon: Image, label: 'Galería' },
  { to: '/products', icon: Package, label: 'Productos' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
];

export const BottomNav: FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-gray-800 z-40 lg:hidden">
      <div className="flex items-center justify-around h-full">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
                isActive ? 'text-primary' : 'text-muted hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
