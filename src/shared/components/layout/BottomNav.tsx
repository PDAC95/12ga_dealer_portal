import { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Image, Package, MessageCircle, Phone, X } from 'lucide-react';

interface NavItem {
  to: string;
  icon: FC<{ className?: string }>;
  label: string;
}

// Navigation items in order: Home, Products, Chat (featured), Gallery, Phone
const leftNavItems: NavItem[] = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/products', icon: Package, label: 'Products' },
];

const rightNavItems: NavItem[] = [
  { to: '/gallery', icon: Image, label: 'Gallery' },
];

// Company phone numbers
const PHONE_NUMBERS = [
  { label: 'Sales', number: '+1 (555) 123-4567' },
  { label: 'Support', number: '+1 (555) 987-6543' },
];

export const BottomNav: FC = () => {
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const location = useLocation();
  const isChatActive = location.pathname === '/chat';

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber.replace(/[^+\d]/g, '')}`;
    setShowPhoneMenu(false);
  };

  return (
    <>
      {/* Phone Menu Overlay */}
      {showPhoneMenu && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setShowPhoneMenu(false)}
        >
          <div
            className="absolute bottom-24 right-4 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Phone menu card */}
            <div className="bg-[#0a0a0a] border-2 border-primary/30 overflow-hidden">
              {/* Header */}
              <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-white" />
                  <span className="font-bold text-sm uppercase tracking-wider text-white">
                    Call 12GA
                  </span>
                </div>
                <button
                  onClick={() => setShowPhoneMenu(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Phone options */}
              <div className="p-2">
                {PHONE_NUMBERS.map(({ label, number }) => (
                  <button
                    key={number}
                    onClick={() => handleCall(number)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                      <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                        {label}
                      </p>
                      <p className="text-lg font-bold text-white mt-0.5">
                        {number}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow pointing to phone button */}
            <div className="flex justify-end pr-6">
              <div className="w-4 h-4 bg-[#0a0a0a] border-r-2 border-b-2 border-primary/30 transform rotate-45 -mt-2" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
        </div>

        {/* Navigation content */}
        <div className="relative h-20 flex items-end pb-2">
          {/* Left items: Home, Products */}
          <div className="flex-1 flex justify-around">
            {leftNavItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all ${
                    isActive ? 'text-primary' : 'text-white/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                      <Icon className="w-5 h-5" />
                      {isActive && (
                        <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
                      )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : ''}`}>
                      {label}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 w-6 h-[3px] bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Center Featured Chat Button */}
          <div className="relative -mt-8 mx-2">
            <NavLink
              to="/chat"
              className="block"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 border-4 border-[#0a0a0a] ${
                isChatActive
                  ? 'bg-white shadow-white/30'
                  : 'bg-primary shadow-primary/50'
              }`}>
                <MessageCircle className={`w-7 h-7 transition-colors ${isChatActive ? 'text-primary' : 'text-white'}`} />
              </div>
              <span className={`block text-center text-[9px] font-bold uppercase tracking-wider mt-1 ${
                isChatActive ? 'text-primary' : 'text-primary'
              }`}>
                Chat
              </span>
            </NavLink>
          </div>

          {/* Right items: Gallery, Phone */}
          <div className="flex-1 flex justify-around">
            {rightNavItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all ${
                    isActive ? 'text-primary' : 'text-white/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`relative ${isActive ? 'scale-110' : ''} transition-transform`}>
                      <Icon className="w-5 h-5" />
                      {isActive && (
                        <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
                      )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : ''}`}>
                      {label}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 w-6 h-[3px] bg-primary" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Phone Button */}
            <button
              onClick={() => setShowPhoneMenu(!showPhoneMenu)}
              className={`relative flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all ${
                showPhoneMenu ? 'text-primary' : 'text-white/50'
              }`}
            >
              <div className={`relative ${showPhoneMenu ? 'scale-110' : ''} transition-transform`}>
                <Phone className="w-5 h-5" />
                {showPhoneMenu && (
                  <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
                )}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider ${showPhoneMenu ? 'text-primary' : ''}`}>
                Call
              </span>
              {showPhoneMenu && (
                <div className="absolute bottom-0 w-6 h-[3px] bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Safe area for iOS */}
        <div className="h-safe-area-inset-bottom bg-[#0a0a0a]" />
      </nav>
    </>
  );
};
