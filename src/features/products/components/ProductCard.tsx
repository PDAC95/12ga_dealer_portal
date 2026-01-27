import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import type { IPart } from '../types/product.types';

interface ProductCardProps {
  product: IPart;
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dzwmrurhg/image/upload';

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : product.image
    ? `${CLOUDINARY_BASE}/w_400,h_300,c_fill,f_auto,q_auto/${product.image}`
    : null;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="block bg-surface border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all group"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gray-900 relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-700" />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-primary text-white rounded-md">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white truncate group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        <div className="flex items-center justify-between mt-3">
          {product.pricing?.basePrice ? (
            <span className="text-sm font-medium text-primary">
              From ${product.pricing.basePrice.toLocaleString()} {product.pricing.currency}
            </span>
          ) : (
            <span className="text-sm text-muted">Contact for pricing</span>
          )}
          <ChevronRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
};
