/**
 * Media category types
 */
export type MediaCategory = 'photos' | 'videos' | 'brand' | 'documents';

/**
 * Media file type
 */
export type MediaFileType = 'image' | 'video' | 'pdf' | 'archive';

/**
 * Media item interface
 */
export interface IMediaItem {
  _id: string;
  title: string;
  description?: string;
  category: MediaCategory;
  type: MediaFileType;
  url: string;
  thumbnailUrl: string;
  fileSize?: number;
  format?: string;
  tags?: string[];
  downloadCount?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Media filters for querying
 */
export interface MediaFilters {
  category?: MediaCategory;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * API response for media list
 */
export interface MediaListResponse {
  success: boolean;
  data: IMediaItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * API response for single media item
 */
export interface MediaItemResponse {
  success: boolean;
  data: IMediaItem;
}

/**
 * Category display info
 */
export interface CategoryInfo {
  value: MediaCategory;
  label: string;
  icon: string;
  description: string;
}

/**
 * Category definitions with labels
 */
export const MEDIA_CATEGORIES: CategoryInfo[] = [
  {
    value: 'photos',
    label: 'Product Photos',
    icon: 'image',
    description: 'High-resolution product images for marketing',
  },
  {
    value: 'videos',
    label: 'Videos',
    icon: 'video',
    description: 'Promotional and tutorial videos',
  },
  {
    value: 'brand',
    label: 'Brand Assets',
    icon: 'palette',
    description: 'Logos, banners, and design templates',
  },
  {
    value: 'documents',
    label: 'Documents',
    icon: 'file-text',
    description: 'Catalogs, specs, and sales guides',
  },
];

/**
 * Get category label by value
 */
export const getCategoryLabel = (category: MediaCategory): string => {
  return MEDIA_CATEGORIES.find((c) => c.value === category)?.label || category;
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
