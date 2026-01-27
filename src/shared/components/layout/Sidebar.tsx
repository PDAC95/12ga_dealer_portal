import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Image,
  Package,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store';

interface NavItem {
  to: string;
  icon: FC<{ className?: string }>;
  label: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: '/dashboard', icon: Home, label: 'HOME' },
  { to: '/products', icon: Package, label: 'PRODUCTS' },
  { to: '/chat', icon: MessageCircle, label: 'SUPPORT' },
  { to: '/gallery', icon: Image, label: 'GALLERY' },
];

// Logo URL from Cloudinary
const LOGO =
  'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { dealer, logout } = useAuthStore();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 hidden lg:flex flex-col ${
        isCollapsed ? 'w-[80px]' : 'w-72'
      }`}
    >
      {/* Industrial background with texture effect */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Diagonal stripes pattern (hazard style) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            #ff3d24 10px,
            #ff3d24 12px
          )`,
        }}
      />

      {/* Left accent border - industrial red stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b-2 border-primary/30">
          <img
            src={LOGO}
            alt="12GA Logo"
            className={`object-contain transition-all duration-300 ${isCollapsed ? 'h-10' : 'h-11'}`}
          />
        </div>

        {/* Section divider */}
        {!isCollapsed && (
          <div className="px-5 pt-6 pb-3 flex items-center gap-2">
            <div className="h-[2px] w-3 bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Navigation
            </span>
            <div className="h-[2px] flex-1 bg-white/10" />
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isCollapsed ? 'px-2 pt-6' : 'px-3'}`}>
          <ul className="space-y-1">
            {navItems.map(({ to, icon: Icon, label, badge }) => {
              const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={`group relative flex items-center gap-3 transition-all duration-150 ${
                      isCollapsed ? 'justify-center p-3' : 'px-4 py-3'
                    } ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                    style={{
                      clipPath: isCollapsed
                        ? 'none'
                        : 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)',
                    }}
                    title={isCollapsed ? label : undefined}
                  >
                    {/* Hover highlight line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-150 ${
                      isActive ? 'bg-white' : 'bg-transparent group-hover:bg-primary'
                    }`} />

                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} />

                    {!isCollapsed && (
                      <>
                        <span className="font-bold text-xs tracking-wider">{label}</span>
                        {badge && (
                          <span className="ml-auto px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-white text-primary flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Badge indicator for collapsed */}
                    {isCollapsed && badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        {dealer && (
          <div className={`border-t-2 border-primary/30 ${isCollapsed ? 'p-2' : 'p-4'}`}>
            {/* User info */}
            <div className={`${isCollapsed ? 'flex justify-center' : 'mb-3'}`}>
              {!isCollapsed ? (
                <div className="bg-white/5 border-l-2 border-primary p-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-white truncate">
                    {dealer.companyName}
                  </p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide truncate mt-1">
                    {dealer.contactName}
                  </p>
                </div>
              ) : (
                <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <span className="text-sm font-black text-primary">
                    {dealer.companyName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className={`group flex items-center gap-3 w-full text-white/40 hover:text-primary hover:bg-primary/10 transition-all duration-150 ${
                isCollapsed ? 'justify-center p-3' : 'px-4 py-2'
              }`}
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && (
                <span className="text-xs font-bold uppercase tracking-wider">Exit</span>
              )}
            </button>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-4 top-[4.5rem] w-8 h-8 bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors shadow-lg shadow-primary/30"
          style={{
            clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',
          }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 ml-1" />
          ) : (
            <ChevronLeft className="w-4 h-4 ml-1" />
          )}
        </button>
      </div>
    </aside>
  );
};
