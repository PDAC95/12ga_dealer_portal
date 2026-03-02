import type {
  IMediaItem,
  MediaFilters,
  MediaListResponse,
  MediaItemResponse,
} from '../types/media.types';

/**
 * Mock media data for development
 * TODO: Replace with actual API calls when backend is ready
 */
const MOCK_MEDIA: IMediaItem[] = [
  // Product Photos
  {
    _id: 'photo-1',
    title: '12GA Bumper - Front View',
    description: 'High-resolution front view of the signature 12GA bumper installed on Freightliner Cascadia',
    category: 'photos',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1738083091/Front%20Bumpers/freightliner-cascadia-2018-front-bumper_oagq0t.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083091/Front%20Bumpers/freightliner-cascadia-2018-front-bumper_oagq0t.jpg',
    fileSize: 2457600,
    format: 'jpg',
    tags: ['bumper', 'front', 'freightliner', 'cascadia'],
    downloadCount: 156,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    _id: 'photo-2',
    title: '12GA Bumper - Side Profile',
    description: 'Side angle showing the aggressive styling and build quality',
    category: 'photos',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1738083091/Front%20Bumpers/freightliner-cascadia-2018-front-bumper_oagq0t.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083091/Front%20Bumpers/freightliner-cascadia-2018-front-bumper_oagq0t.jpg',
    fileSize: 1843200,
    format: 'jpg',
    tags: ['bumper', 'side', 'profile'],
    downloadCount: 89,
    createdAt: '2025-01-14T10:00:00Z',
    updatedAt: '2025-01-14T10:00:00Z',
  },
  {
    _id: 'photo-3',
    title: 'Grille Guard Installation',
    description: 'Professional installation shot showcasing the grille guard',
    category: 'photos',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1738083089/Grille%20Guards/western-star-4900-grille-guard_m3ug3s.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083089/Grille%20Guards/western-star-4900-grille-guard_m3ug3s.jpg',
    fileSize: 2048000,
    format: 'jpg',
    tags: ['grille', 'guard', 'installation', 'western star'],
    downloadCount: 67,
    createdAt: '2025-01-13T10:00:00Z',
    updatedAt: '2025-01-13T10:00:00Z',
  },
  {
    _id: 'photo-4',
    title: 'Sun Visor Close-up',
    description: 'Detailed close-up of the sun visor aerodynamic design',
    category: 'photos',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1738083085/Sun%20Visors/kenworth-t680-sun-visor_dvwp91.jpg',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083085/Sun%20Visors/kenworth-t680-sun-visor_dvwp91.jpg',
    fileSize: 1536000,
    format: 'jpg',
    tags: ['sun visor', 'kenworth', 'aerodynamic'],
    downloadCount: 45,
    createdAt: '2025-01-12T10:00:00Z',
    updatedAt: '2025-01-12T10:00:00Z',
  },

  // Videos
  {
    _id: 'video-1',
    title: '12GA Product Overview',
    description: 'Complete overview of our product line and manufacturing process',
    category: 'videos',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083091/Front%20Bumpers/freightliner-cascadia-2018-front-bumper_oagq0t.jpg',
    format: 'mp4',
    tags: ['overview', 'products', 'manufacturing'],
    downloadCount: 234,
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    _id: 'video-2',
    title: 'Bumper Installation Guide',
    description: 'Step-by-step installation tutorial for 12GA front bumpers',
    category: 'videos',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083089/Grille%20Guards/western-star-4900-grille-guard_m3ug3s.jpg',
    format: 'mp4',
    tags: ['installation', 'tutorial', 'bumper'],
    downloadCount: 189,
    createdAt: '2025-01-09T10:00:00Z',
    updatedAt: '2025-01-09T10:00:00Z',
  },
  {
    _id: 'video-3',
    title: 'Customer Testimonial - Fleet Owner',
    description: 'Hear from a fleet owner about their experience with 12GA products',
    category: 'videos',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fill,f_auto,q_auto/v1738083085/Sun%20Visors/kenworth-t680-sun-visor_dvwp91.jpg',
    format: 'mp4',
    tags: ['testimonial', 'customer', 'fleet'],
    downloadCount: 78,
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-08T10:00:00Z',
  },

  // Brand Assets
  {
    _id: 'brand-1',
    title: '12GA Logo - Full Color',
    description: 'Official 12GA logo in full color, PNG format with transparent background',
    category: 'brand',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 512000,
    format: 'png',
    tags: ['logo', 'brand', 'full color'],
    downloadCount: 312,
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
  },
  {
    _id: 'brand-2',
    title: '12GA Logo - White',
    description: 'White version of the 12GA logo for dark backgrounds',
    category: 'brand',
    type: 'image',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 256000,
    format: 'png',
    tags: ['logo', 'brand', 'white'],
    downloadCount: 245,
    createdAt: '2025-01-05T10:00:00Z',
    updatedAt: '2025-01-05T10:00:00Z',
  },
  {
    _id: 'brand-3',
    title: 'Social Media Banner Pack',
    description: 'Ready-to-use banners for Facebook, Instagram, and LinkedIn',
    category: 'brand',
    type: 'archive',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 5242880,
    format: 'zip',
    tags: ['social media', 'banner', 'facebook', 'instagram'],
    downloadCount: 167,
    createdAt: '2025-01-04T10:00:00Z',
    updatedAt: '2025-01-04T10:00:00Z',
  },

  // Documents
  {
    _id: 'doc-1',
    title: '2025 Product Catalog',
    description: 'Complete product catalog with specifications and pricing',
    category: 'documents',
    type: 'pdf',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 15728640,
    format: 'pdf',
    tags: ['catalog', 'products', '2025', 'pricing'],
    downloadCount: 423,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    _id: 'doc-2',
    title: 'Technical Specifications Sheet',
    description: 'Detailed technical specs for all bumper models',
    category: 'documents',
    type: 'pdf',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 3145728,
    format: 'pdf',
    tags: ['specs', 'technical', 'bumper'],
    downloadCount: 289,
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z',
  },
  {
    _id: 'doc-3',
    title: 'Dealer Sales Guide',
    description: 'Comprehensive guide for dealers with selling tips and FAQs',
    category: 'documents',
    type: 'pdf',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 2097152,
    format: 'pdf',
    tags: ['sales', 'guide', 'dealer', 'faq'],
    downloadCount: 198,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    _id: 'doc-4',
    title: 'Compatibility Chart',
    description: 'Quick reference chart for product compatibility by truck model',
    category: 'documents',
    type: 'pdf',
    url: 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    thumbnailUrl: 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_400,h_300,c_fit,f_auto,q_auto/v1767629522/12-Ga-no-V-Logo_axzh7o.png',
    fileSize: 1048576,
    format: 'pdf',
    tags: ['compatibility', 'chart', 'truck', 'reference'],
    downloadCount: 356,
    createdAt: '2024-12-10T10:00:00Z',
    updatedAt: '2024-12-10T10:00:00Z',
  },
];

/**
 * Simulate API delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Media service for fetching and managing media resources
 */
export const mediaService = {
  /**
   * Get all media items with optional filters
   */
  getAll: async (filters?: MediaFilters): Promise<MediaListResponse> => {
    await delay(300); // Simulate network delay

    let filteredMedia = [...MOCK_MEDIA];

    // Filter by category
    if (filters?.category) {
      filteredMedia = filteredMedia.filter((item) => item.category === filters.category);
    }

    // Filter by search term
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredMedia = filteredMedia.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginatedMedia = filteredMedia.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginatedMedia,
      pagination: {
        page,
        limit,
        total: filteredMedia.length,
        pages: Math.ceil(filteredMedia.length / limit),
      },
    };
  },

  /**
   * Get a single media item by ID
   */
  getById: async (id: string): Promise<MediaItemResponse> => {
    await delay(200);

    const item = MOCK_MEDIA.find((m) => m._id === id);

    if (!item) {
      throw new Error('Media item not found');
    }

    return {
      success: true,
      data: item,
    };
  },

  /**
   * Track download (increment counter)
   * In production, this would call an API endpoint
   */
  trackDownload: async (id: string): Promise<void> => {
    await delay(100);
    // In production: await api.post(`/media/download/${id}`);
    console.log(`Download tracked for media: ${id}`);
  },

  /**
   * Download a media file
   */
  downloadFile: async (item: IMediaItem): Promise<void> => {
    // Track the download
    await mediaService.trackDownload(item._id);

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = item.url;
    link.download = `${item.title}.${item.format || 'file'}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
