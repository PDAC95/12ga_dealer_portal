import { FC, useState, useMemo } from 'react';
import { Package, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard, ProductFilters } from '../components';
import type { PartZone } from '../types/product.types';
import { Loader } from '@/shared/components/ui';

export const ProductsPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<PartZone | null>(null);

  // Fetch filtered products for display
  const { data, isLoading, error } = useProducts({
    zone: selectedZone || undefined,
    search: searchQuery || undefined,
    limit: 50,
  });

  // Fetch all products for autocomplete suggestions
  const { data: allProductsData } = useProducts({ limit: 100 });

  const products = useMemo(() => {
    if (!data?.data) return [];
    return data.data;
  }, [data]);

  const allProducts = useMemo(() => {
    if (!allProductsData?.data) return [];
    return allProductsData.data;
  }, [allProductsData]);

  return (
    <div className="py-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Technical Sheets</h1>
        <p className="text-muted mt-1">
          Browse product specifications and technical information
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        products={allProducts}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Failed to load products
          </h3>
          <p className="text-muted text-sm">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="w-12 h-12 text-muted mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            No products found
          </h3>
          <p className="text-muted text-sm">
            {searchQuery || selectedZone
              ? 'Try adjusting your filters or search query.'
              : 'Products will appear here once available.'}
          </p>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && products.length > 0 && (
        <>
          <p className="text-sm text-muted">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
