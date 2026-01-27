import { useQuery, useMutation } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { PartsFilters, CompatibilityRequest } from '../types/product.types';

/**
 * Hook to fetch all parts with optional filters
 */
export const useProducts = (filters?: PartsFilters) => {
  return useQuery({
    queryKey: ['parts', filters],
    queryFn: () => productService.getAll(filters),
  });
};

/**
 * Hook to fetch a single part by slug
 */
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['part', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  });
};

/**
 * Hook to fetch a single part by ID
 */
export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['part', 'id', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook for checking vehicle compatibility
 */
export const useCompatibility = () => {
  return useMutation({
    mutationFn: (request: CompatibilityRequest) =>
      productService.checkCompatibility(request),
  });
};

/**
 * Hook to fetch multiple part configurations
 */
export const usePartConfigurations = (slugs: string[]) => {
  return useQuery({
    queryKey: ['parts', 'configurations', slugs],
    queryFn: () => productService.getConfigurations(slugs),
    enabled: slugs.length > 0,
  });
};
