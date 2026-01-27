export type PartZone =
  | 'front'
  | 'engine-air-system'
  | 'top-cabin'
  | 'side-storage'
  | 'exhaust-air'
  | 'sleeper-interior'
  | 'rear-accessories';

export type InstallationDifficulty = 'Easy' | 'Moderate' | 'Hard' | 'Professional';

export interface IPart {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  zone: PartZone;
  sku?: string;
  specifications?: Record<string, string>;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    weight?: string;
    additionalDimensions?: Record<string, string>;
  };
  materials?: Array<{
    type: string;
    description?: string;
  }>;
  compatibility?: {
    years: string[];
    makes: string[];
    models: string[];
    additionalInfo?: string;
  };
  installation?: {
    difficulty: InstallationDifficulty;
    estimatedTime?: string;
    professionalRecommended?: boolean;
    specialNotes?: string;
  };
  diyGuide?: {
    difficulty?: InstallationDifficulty;
    tools?: string[];
    preparation?: string[];
    mountingSteps?: string[];
    finalCheck?: string[];
    detailedSteps?: string[];
  };
  keyFeatures?: string[];
  customOptions?: string[];
  pricing?: {
    basePrice: number;
    maxPrice?: number;
    currency: 'USD' | 'CAD';
    shippingIncluded?: boolean;
  };
  styleVariants?: Array<{
    name: string;
    description?: string;
    image?: string;
    truckPhotos?: string[];
    technicalSpecs?: string;
    diagram?: string;
    isDefault?: boolean;
  }>;
  inStock?: boolean;
  stockQuantity?: number;
  leadTime?: string;
  active?: boolean;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PartsFilters {
  zone?: PartZone;
  search?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}

export interface PartsResponse {
  success: boolean;
  data: IPart[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface PartResponse {
  success: boolean;
  data: IPart;
}

export interface CompatibilityRequest {
  productSlug: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
  };
}

export interface CompatibilityResponse {
  success: boolean;
  compatible: boolean;
  product?: IPart;
  alternatives?: IPart[];
  message?: string;
}

// Zone display names for UI
export const ZONE_LABELS: Record<PartZone, string> = {
  'front': 'Front',
  'engine-air-system': 'Engine & Air System',
  'top-cabin': 'Top & Cabin',
  'side-storage': 'Side & Storage',
  'exhaust-air': 'Exhaust & Air',
  'sleeper-interior': 'Sleeper & Interior',
  'rear-accessories': 'Rear Accessories',
};
