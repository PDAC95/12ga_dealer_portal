import { FC, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Archive } from 'lucide-react';
import type { IMediaItem } from '../types/media.types';
import { formatFileSize, getCategoryLabel } from '../types/media.types';

interface MediaPreviewModalProps {
  item: IMediaItem | null;
  onClose: () => void;
  onDownload: (item: IMediaItem) => void;
}

export const MediaPreviewModal: FC<MediaPreviewModalProps> = ({
  item,
  onClose,
  onDownload,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  const renderPreview = () => {
    switch (item.type) {
      case 'video':
        // For YouTube links, extract video ID and embed
        if (item.url.includes('youtube.com') || item.url.includes('youtu.be')) {
          const videoId = item.url.includes('youtu.be')
            ? item.url.split('/').pop()
            : new URLSearchParams(new URL(item.url).search).get('v');
          return (
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={item.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }
        // For direct video files
        return (
          <video
            src={item.url}
            controls
            className="max-h-[60vh] rounded-lg"
            poster={item.thumbnailUrl}
          >
            Your browser does not support video playback.
          </video>
        );

      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-lg">
            <FileText className="w-20 h-20 text-primary/60 mb-4" />
            <p className="text-white/60 text-center mb-4">
              PDF documents cannot be previewed directly.
              <br />
              Click download to view the file.
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </a>
          </div>
        );

      case 'archive':
        return (
          <div className="flex flex-col items-center justify-center py-12 bg-white/5 rounded-lg">
            <Archive className="w-20 h-20 text-primary/60 mb-4" />
            <p className="text-white/60 text-center">
              Archive files cannot be previewed.
              <br />
              Click download to get the file.
            </p>
          </div>
        );

      default:
        return (
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] max-w-full object-contain rounded-lg"
          />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Modal content */}
      <div
        className="bg-[#111] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Preview area */}
        <div className="flex items-center justify-center p-6 bg-black/50">
          {renderPreview()}
        </div>

        {/* Info section */}
        <div className="p-6 border-t border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Category */}
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                {getCategoryLabel(item.category)}
              </span>

              {/* Title */}
              <h2 className="mt-1 text-xl font-bold text-white">{item.title}</h2>

              {/* Description */}
              {item.description && (
                <p className="mt-2 text-sm text-white/60">{item.description}</p>
              )}

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/40">
                {item.format && (
                  <span className="px-2 py-1 bg-white/5 rounded uppercase">
                    {item.format}
                  </span>
                )}
                {item.fileSize && <span>{formatFileSize(item.fileSize)}</span>}
                {item.downloadCount !== undefined && (
                  <span>{item.downloadCount} downloads</span>
                )}
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={() => onDownload(item)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/5 rounded text-xs text-white/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
