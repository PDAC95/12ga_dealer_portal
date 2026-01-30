import { useQuery } from '@tanstack/react-query';
import { mediaService } from '../services/mediaService';
import type { MediaFilters } from '../types/media.types';

/**
 * Hook to fetch all media items with optional filters
 */
export const useMedia = (filters?: MediaFilters) => {
  return useQuery({
    queryKey: ['media', filters],
    queryFn: () => mediaService.getAll(filters),
  });
};

/**
 * Hook to fetch a single media item by ID
 */
export const useMediaItem = (id: string) => {
  return useQuery({
    queryKey: ['media', id],
    queryFn: () => mediaService.getById(id),
    enabled: !!id,
  });
};
