import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle = ({ showLabel = false, className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-2 p-2 rounded-lg transition-colors
        hover:bg-surface-hover text-text-secondary hover:text-text-primary ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
      {showLabel && (
        <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
};
