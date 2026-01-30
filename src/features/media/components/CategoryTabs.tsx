import { FC } from 'react';
import { Image, Film, Palette, FileText, LayoutGrid } from 'lucide-react';
import type { MediaCategory } from '../types/media.types';

interface CategoryTabsProps {
  activeCategory: MediaCategory | null;
  onChange: (category: MediaCategory | null) => void;
  counts?: Record<MediaCategory | 'all', number>;
}

interface TabItem {
  value: MediaCategory | null;
  label: string;
  icon: FC<{ className?: string }>;
}

const TABS: TabItem[] = [
  { value: null, label: 'All', icon: LayoutGrid },
  { value: 'photos', label: 'Photos', icon: Image },
  { value: 'videos', label: 'Videos', icon: Film },
  { value: 'brand', label: 'Brand', icon: Palette },
  { value: 'documents', label: 'Docs', icon: FileText },
];

export const CategoryTabs: FC<CategoryTabsProps> = ({
  activeCategory,
  onChange,
  counts,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeCategory === tab.value;
        const count = counts?.[tab.value || 'all'];

        return (
          <button
            key={tab.value || 'all'}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              isActive
                ? 'bg-primary text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20' : 'bg-white/10'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
