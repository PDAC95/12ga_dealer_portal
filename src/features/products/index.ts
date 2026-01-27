// Pages
export { ProductsPage } from './pages/ProductsPage';
export { ProductDetailPage } from './pages/ProductDetailPage';

// Components
export {
  ProductCard,
  ProductFilters,
  SpecsTable,
  CompatibilityMatrix,
  InstallationGuide,
  ImageGallery,
} from './components';

// Hooks
export {
  useProducts,
  useProduct,
  useProductById,
  useCompatibility,
  usePartConfigurations,
} from './hooks/useProducts';

// Services
export { productService } from './services/productService';

// Types
export type {
  IPart,
  PartZone,
  InstallationDifficulty,
  PartsFilters,
  PartsResponse,
  PartResponse,
  CompatibilityRequest,
  CompatibilityResponse,
} from './types/product.types';
export { ZONE_LABELS } from './types/product.types';
