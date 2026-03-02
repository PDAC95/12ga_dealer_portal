import { FC } from 'react';
import type { IPart, PartZone } from '../types/product.types';
import { ZONE_LABELS } from '../types/product.types';
import { SearchAutocomplete } from './SearchAutocomplete';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedZone: PartZone | null;
  onZoneChange: (zone: PartZone | null) => void;
  products: IPart[];
}

const ZONES: PartZone[] = [
  'front',
  'engine-air-system',
  'top-cabin',
  'side-storage',
  'exhaust-air',
  'sleeper-interior',
  'rear-accessories',
];

export const ProductFilters: FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedZone,
  onZoneChange,
  products,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input with Autocomplete */}
      <SearchAutocomplete
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        products={products}
      />

      {/* Zone Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onZoneChange(null)}
          className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
            selectedZone === null
              ? 'bg-primary text-white'
              : 'bg-surface border border-gray-800 text-muted hover:text-white hover:border-gray-700'
          }`}
        >
          All
        </button>
        {ZONES.map((zone) => (
          <button
            key={zone}
            onClick={() => onZoneChange(zone)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
              selectedZone === zone
                ? 'bg-primary text-white'
                : 'bg-surface border border-gray-800 text-muted hover:text-white hover:border-gray-700'
            }`}
          >
            {ZONE_LABELS[zone]}
          </button>
        ))}
      </div>
    </div>
  );
};
