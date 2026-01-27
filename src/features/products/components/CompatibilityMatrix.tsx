import { FC } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import type { IPart } from '../types/product.types';

interface CompatibilityMatrixProps {
  product: IPart;
}

export const CompatibilityMatrix: FC<CompatibilityMatrixProps> = ({ product }) => {
  const { compatibility } = product;

  if (!compatibility) {
    return (
      <div className="text-center py-8 text-muted">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No compatibility information available.</p>
      </div>
    );
  }

  const { years, makes, models, additionalInfo } = compatibility;

  return (
    <div className="space-y-6">
      {/* Makes */}
      {makes && makes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Compatible Makes
          </h3>
          <div className="flex flex-wrap gap-2">
            {makes.map((make) => (
              <span
                key={make}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-full"
              >
                <Check className="w-3.5 h-3.5" />
                {make}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Models */}
      {models && models.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Compatible Models
          </h3>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <span
                key={model}
                className="px-3 py-1.5 bg-surface border border-gray-800 text-white text-sm rounded-full"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Years */}
      {years && years.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Compatible Years
          </h3>
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <span
                key={year}
                className="px-3 py-1.5 bg-surface border border-gray-800 text-muted text-sm rounded-full"
              >
                {year}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      {additionalInfo && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <h3 className="text-sm font-semibold text-white mb-2">
            Additional Information
          </h3>
          <p className="text-sm text-muted">{additionalInfo}</p>
        </div>
      )}
    </div>
  );
};
