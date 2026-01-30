import { FC } from 'react';
import { MediaCard } from './MediaCard';
import type { IMediaItem } from '../types/media.types';
import { Loader2, FolderOpen } from 'lucide-react';

interface MediaGridProps {
  items: IMediaItem[];
  isLoading?: boolean;
  onPreview: (item: IMediaItem) => void;
  onDownload: (item: IMediaItem) => void;
}

export const MediaGrid: FC<MediaGridProps> = ({
  items,
  isLoading,
  onPreview,
  onDownload,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <FolderOpen className="w-8 h-8 text-white/30" />
        </div>
        <h3 className="text-lg font-semibold text-white/70">No resources found</h3>
        <p className="mt-1 text-sm text-white/40">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <MediaCard
          key={item._id}
          item={item}
          onPreview={onPreview}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};
