import { apiClient } from '@/lib/axios';
import type {
  IPart,
  PartsFilters,
  PartsResponse,
  PartResponse,
  CompatibilityRequest,
  CompatibilityResponse,
} from '../types/product.types';

export const productService = {
  /**
   * Get all parts with optional filters
   */
  getAll: async (filters?: PartsFilters): Promise<PartsResponse> => {
    const params: Record<string, string | number | boolean | undefined> = {};

    if (filters?.zone) params.zone = filters.zone;
    if (filters?.search) params.search = filters.search;
    if (filters?.featured !== undefined) params.featured = filters.featured;
    if (filters?.limit) params.limit = filters.limit;
    if (filters?.page) params.page = filters.page;

    const { data } = await apiClient.get<PartsResponse>('/api/parts', { params });
    return data;
  },

  /**
   * Get a single part by slug with full configuration
   */
  getBySlug: async (slug: string, includeConfig = true): Promise<IPart> => {
    const { data } = await apiClient.get<PartResponse>(
      `/api/parts/slug/${slug}`,
      { params: { includeConfig } }
    );
    return data.data;
  },

  /**
   * Get a single part by ID
   */
  getById: async (id: string): Promise<IPart> => {
    const { data } = await apiClient.get<PartResponse>(`/api/parts/${id}`);
    return data.data;
  },

  /**
   * Check vehicle compatibility for a part
   */
  checkCompatibility: async (
    request: CompatibilityRequest
  ): Promise<CompatibilityResponse> => {
    const { data } = await apiClient.post<CompatibilityResponse>(
      '/api/parts/compatibility',
      request
    );
    return data;
  },

  /**
   * Get multiple part configurations at once
   */
  getConfigurations: async (slugs: string[]): Promise<IPart[]> => {
    const { data } = await apiClient.get<{ success: boolean; data: IPart[] }>(
      '/api/parts/configurations',
      { params: { slugs: slugs.join(',') } }
    );
    return data.data;
  },
};
