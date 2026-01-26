import { FC, ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 lg:pb-4 px-4">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
};
