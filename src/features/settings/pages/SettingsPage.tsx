import { Moon, Sun, Settings, Palette } from 'lucide-react';
import { useThemeStore, Theme } from '@/store/themeStore';
import { useAuthStore } from '@/store';

export const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { dealer } = useAuthStore();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        </div>
        <p className="text-text-secondary text-sm">
          Customize your dealer portal experience
        </p>
      </div>

      {/* Profile Section */}
      {dealer && (
        <section className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
            <div className="h-[2px] w-3 bg-primary" />
            Account
          </h2>
          <div className="bg-surface border border-border p-4">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider">Company</label>
                <p className="text-text-primary font-medium">{dealer.companyName}</p>
              </div>
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider">Contact</label>
                <p className="text-text-primary font-medium">{dealer.contactName}</p>
              </div>
              <div>
                <label className="text-xs text-text-secondary uppercase tracking-wider">Email</label>
                <p className="text-text-primary font-medium">{dealer.email}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Appearance Section */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-4 flex items-center gap-2">
          <div className="h-[2px] w-3 bg-primary" />
          <Palette className="w-4 h-4" />
          Appearance
        </h2>

        <div className="bg-surface border border-border p-4">
          <p className="text-sm text-text-secondary mb-4">
            Choose your preferred theme
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Dark Theme Option */}
            <button
              onClick={() => handleThemeChange('dark')}
              className={`relative p-4 border-2 transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Theme Preview */}
              <div className="w-full aspect-video bg-[#0d0d0d] border border-white/10 mb-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center">
                  <Moon className="w-4 h-4 text-white/60" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Dark</span>
                {theme === 'dark' && (
                  <div className="w-4 h-4 bg-primary flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* Light Theme Option */}
            <button
              onClick={() => handleThemeChange('light')}
              className={`relative p-4 border-2 transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Theme Preview */}
              <div className="w-full aspect-video bg-[#f5f5f5] border border-black/10 mb-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center">
                  <Sun className="w-4 h-4 text-black/60" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">Light</span>
                {theme === 'light' && (
                  <div className="w-4 h-4 bg-primary flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
