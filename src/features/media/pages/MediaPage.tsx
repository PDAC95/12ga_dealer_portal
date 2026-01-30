import { FC, useState, useMemo } from 'react';
import { FolderOpen } from 'lucide-react';
import { MediaGrid, CategoryTabs, SearchBar, MediaPreviewModal } from '../components';
import { useMedia } from '../hooks/useMedia';
import { mediaService } from '../services/mediaService';
import type { IMediaItem, MediaCategory } from '../types/media.types';

export const MediaPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState<MediaCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewItem, setPreviewItem] = useState<IMediaItem | null>(null);

  // Fetch media with filters
  const { data, isLoading } = useMedia({
    category: activeCategory || undefined,
    search: searchQuery || undefined,
  });

  const mediaItems = data?.data || [];

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    if (!data?.data) return undefined;

    // For counts, we need all items (without category filter)
    // This is a simplified version - in production, the API would return counts
    const allItems = data.data;
    return {
      all: allItems.length,
      photos: allItems.filter((i) => i.category === 'photos').length,
      videos: allItems.filter((i) => i.category === 'videos').length,
      brand: allItems.filter((i) => i.category === 'brand').length,
      documents: allItems.filter((i) => i.category === 'documents').length,
    };
  }, [data?.data]);

  const handlePreview = (item: IMediaItem) => {
    setPreviewItem(item);
  };

  const handleDownload = async (item: IMediaItem) => {
    await mediaService.downloadFile(item);
  };

  const handleClosePreview = () => {
    setPreviewItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Media & Resources</h1>
              <p className="text-sm text-white/50">
                Marketing materials, product photos, and sales resources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="w-full sm:w-72">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or tag..."
          />
        </div>

        {/* Category tabs */}
        <div className="flex-1">
          <CategoryTabs
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            counts={categoryCounts}
          />
        </div>
      </div>

      {/* Results info */}
      {!isLoading && (
        <div className="text-sm text-white/40">
          {mediaItems.length} {mediaItems.length === 1 ? 'resource' : 'resources'} found
          {activeCategory && ` in ${activeCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}

      {/* Media grid */}
      <MediaGrid
        items={mediaItems}
        isLoading={isLoading}
        onPreview={handlePreview}
        onDownload={handleDownload}
      />

      {/* Preview modal */}
      <MediaPreviewModal
        item={previewItem}
        onClose={handleClosePreview}
        onDownload={handleDownload}
      />
    </div>
  );
};
