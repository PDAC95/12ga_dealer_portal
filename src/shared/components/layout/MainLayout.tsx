import { FC, ReactNode, useState } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { Screensaver } from '../Screensaver';
import { useUIStore } from '../../../store/uiStore';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { screensaver } = useUIStore();

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Screensaver */}
      <Screensaver
        timeout={screensaver.timeoutSeconds}
        enabled={screensaver.enabled}
      />

      {/* Sidebar - visible on desktop */}
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      {/* Header - visible on mobile */}
      <Header className="lg:hidden" />

      {/* Main content */}
      <main
        className={`pt-16 lg:pt-0 pb-20 lg:pb-4 px-4 lg:px-8 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-72'
        }`}
      >
        <div className="max-w-7xl mx-auto lg:py-8">{children}</div>
      </main>

      {/* Bottom nav - visible on mobile */}
      <BottomNav />
    </div>
  );
};
