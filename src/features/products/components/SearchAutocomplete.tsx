import { FC, useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { IPart } from '../types/product.types';

interface SearchAutocompleteProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: IPart[];
}

export const SearchAutocomplete: FC<SearchAutocompleteProps> = ({
  searchQuery,
  onSearchChange,
  products,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter suggestions based on product name only
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    return products
      .filter((product) => product.name.toLowerCase().includes(query))
      .slice(0, 6); // Limit to 6 suggestions
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown' && suggestions.length > 0) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelectProduct(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSelectProduct = (product: IPart) => {
    setIsOpen(false);
    onSearchChange('');
    navigate(`/products/${product.slug}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setIsOpen(value.length >= 2);
  };

  const handleClear = () => {
    onSearchChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => searchQuery.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-3 bg-surface border border-gray-800 rounded-xl text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-surface border border-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="py-1">
            {suggestions.map((product, index) => (
              <button
                key={product._id}
                onClick={() => handleSelectProduct(product)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  index === highlightedIndex
                    ? 'bg-primary/10'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Product Image or Icon */}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg bg-white/5"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                )}

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {product.name}
                  </p>
                  {product.shortDescription && (
                    <p className="text-xs text-muted truncate mt-0.5">
                      {product.shortDescription}
                    </p>
                  )}
                </div>

                {/* SKU Badge */}
                {product.sku && (
                  <span className="text-[10px] font-medium text-muted bg-white/5 px-2 py-1 rounded">
                    {product.sku}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View all results hint */}
          <div className="px-4 py-2 border-t border-gray-800 bg-white/[0.02]">
            <p className="text-xs text-muted text-center">
              Press Enter to search all results
            </p>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && searchQuery.length >= 2 && suggestions.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-surface border border-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="px-4 py-6 text-center">
            <Package className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">No products found</p>
            <p className="text-xs text-muted/60 mt-1">
              Try different keywords
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
