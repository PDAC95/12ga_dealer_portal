import { FC } from 'react';
import type { IPart } from '../types/product.types';

interface SpecsTableProps {
  product: IPart;
}

export const SpecsTable: FC<SpecsTableProps> = ({ product }) => {
  const { specifications, dimensions, materials } = product;

  const hasSpecs = specifications && Object.keys(specifications).length > 0;
  const hasDimensions = dimensions && Object.values(dimensions).some((v) => v);
  const hasMaterials = materials && materials.length > 0;

  if (!hasSpecs && !hasDimensions && !hasMaterials) {
    return (
      <div className="text-center py-8 text-muted">
        <p>No specifications available for this product.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dimensions */}
      {hasDimensions && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Dimensions
          </h3>
          <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-800">
                {dimensions?.length && (
                  <tr>
                    <td className="px-4 py-3 text-sm text-muted">Length</td>
                    <td className="px-4 py-3 text-sm text-white text-right">{dimensions.length}</td>
                  </tr>
                )}
                {dimensions?.width && (
                  <tr>
                    <td className="px-4 py-3 text-sm text-muted">Width</td>
                    <td className="px-4 py-3 text-sm text-white text-right">{dimensions.width}</td>
                  </tr>
                )}
                {dimensions?.height && (
                  <tr>
                    <td className="px-4 py-3 text-sm text-muted">Height</td>
                    <td className="px-4 py-3 text-sm text-white text-right">{dimensions.height}</td>
                  </tr>
                )}
                {dimensions?.weight && (
                  <tr>
                    <td className="px-4 py-3 text-sm text-muted">Weight</td>
                    <td className="px-4 py-3 text-sm text-white text-right">{dimensions.weight}</td>
                  </tr>
                )}
                {dimensions?.additionalDimensions &&
                  Object.entries(dimensions.additionalDimensions).map(([key, value]) => (
                    <tr key={key}>
                      <td className="px-4 py-3 text-sm text-muted capitalize">{key}</td>
                      <td className="px-4 py-3 text-sm text-white text-right">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Materials */}
      {hasMaterials && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Materials
          </h3>
          <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-800">
                {materials?.map((material, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-white">{material.type}</td>
                    {material.description && (
                      <td className="px-4 py-3 text-sm text-muted text-right">
                        {material.description}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Specifications */}
      {hasSpecs && (
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Specifications
          </h3>
          <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-800">
                {Object.entries(specifications || {}).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-3 text-sm text-muted capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </td>
                    <td className="px-4 py-3 text-sm text-white text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
