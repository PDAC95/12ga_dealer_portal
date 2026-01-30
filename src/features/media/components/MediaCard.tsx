import { FC } from 'react';
import { Download, Play, Eye, FileText, Image, Film, Archive } from 'lucide-react';
import type { IMediaItem } from '../types/media.types';
import { formatFileSize, getCategoryLabel } from '../types/media.types';

interface MediaCardProps {
  item: IMediaItem;
  onPreview: (item: IMediaItem) => void;
  onDownload: (item: IMediaItem) => void;
}

const getTypeIcon = (type: IMediaItem['type']) => {
  switch (type) {
    case 'video':
      return Film;
    case 'pdf':
      return FileText;
    case 'archive':
      return Archive;
    default:
      return Image;
  }
};

export const MediaCard: FC<MediaCardProps> = ({ item, onPreview, onDownload }) => {
  const TypeIcon = getTypeIcon(item.type);
  const isVideo = item.type === 'video';

  return (
    <div className="group relative bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onPreview(item)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            title="Preview"
          >
            {isVideo ? (
              <Play className="w-5 h-5 text-white" />
            ) : (
              <Eye className="w-5 h-5 text-white" />
            )}
          </button>
          <button
            onClick={() => onDownload(item)}
            className="w-10 h-10 rounded-full bg-primary/80 hover:bg-primary flex items-center justify-center transition-colors"
            title="Download"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Type badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-black/70 rounded-lg backdrop-blur-sm">
          <TypeIcon className="w-3.5 h-3.5 text-white/70" />
          <span className="text-[10px] font-medium text-white/70 uppercase">
            {item.format || item.type}
          </span>
        </div>

        {/* Video play indicator */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
          {getCategoryLabel(item.category)}
        </span>

        {/* Title */}
        <h3 className="mt-1 text-sm font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="mt-1 text-xs text-white/50 line-clamp-2">{item.description}</p>
        )}

        {/* Meta */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
          <span>{formatFileSize(item.fileSize)}</span>
          {item.downloadCount !== undefined && (
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {item.downloadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
