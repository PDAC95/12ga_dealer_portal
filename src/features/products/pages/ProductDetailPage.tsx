import { FC, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  AlertCircle,
  Check,
  Clock,
  Tag,
  Wrench,
  Truck,
  Shield,
  ChevronRight,
  MessageCircle,
  Play,
  X,
} from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import {
  ImageGallery,
  SpecsTable,
  CompatibilityMatrix,
  InstallationGuide,
} from '../components';
import { ZONE_LABELS } from '../types/product.types';
import { Loader } from '@/shared/components/ui';

type TabId = 'overview' | 'specs' | 'compatibility' | 'installation';

interface Tab {
  id: TabId;
  label: string;
  icon: FC<{ className?: string }>;
}

const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', icon: Package },
  { id: 'specs', label: 'Specs', icon: Tag },
  { id: 'compatibility', label: 'Fit Guide', icon: Truck },
  { id: 'installation', label: 'Install', icon: Wrench },
];

export const ProductDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(slug || '');

  const handleAskAboutProduct = () => {
    // Navigate to chat with pre-filled question about this product
    const productName = product?.name || 'this product';
    const message = `I have a question about ${productName}`;
    navigate(`/chat?product=${encodeURIComponent(productName)}&message=${encodeURIComponent(message)}`);
  };

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="flex items-center justify-center py-12">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Product not found
          </h3>
          <p className="text-muted text-sm">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const images = [
    product.image,
    ...(product.gallery || []),
    ...(product.styleVariants?.flatMap((v) => v.truckPhotos || []) || []),
  ].filter(Boolean);

  return (
    <div className="py-4 space-y-6">
      {/* Back Link */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium">Back to Products</span>
      </Link>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-surface via-surface to-primary/5">
        <div className="flex flex-col lg:flex-row">
          {/* Image Gallery */}
          <div className="lg:w-3/5 p-4 lg:p-6">
            {images.length > 0 ? (
              <ImageGallery images={images} productName={product.name} />
            ) : (
              <div className="aspect-[4/3] bg-white/5 rounded-xl flex items-center justify-center">
                <Package className="w-20 h-20 text-white/10" />
              </div>
            )}
          </div>

          {/* Product Info Panel */}
          <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col">
            {/* Zone & SKU */}
            <div className="flex items-center gap-2 mb-4">
              {product.zone && (
                <span className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full">
                  {ZONE_LABELS[product.zone]}
                </span>
              )}
              {product.sku && (
                <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white/60 rounded-full">
                  {product.sku}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-white/60 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Key Features Preview */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="mt-6 space-y-2">
                {product.keyFeatures.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1 min-h-4" />

            {/* Price & Status Cards */}
            <div className="mt-6 space-y-3">
              {/* Watch Video Button */}
              {product.videoUrl && (
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/20"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  Watch Product Video
                </button>
              )}

              {/* Ask About Product Button */}
              <button
                onClick={handleAskAboutProduct}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                <MessageCircle className="w-5 h-5" />
                Ask about this product
              </button>

              {/* Price Card */}
              {product.pricing?.basePrice && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        Starting From
                      </p>
                      <p className="text-2xl font-bold text-white mt-1">
                        ${product.pricing.basePrice.toLocaleString()}
                        <span className="text-sm font-normal text-white/60 ml-1">
                          {product.pricing.currency}
                        </span>
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Tag className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
              )}

              {/* Status Row */}
              <div className="flex gap-3">
                {/* Stock Status */}
                <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        product.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm font-medium text-white">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Lead Time */}
                {product.leadTime && (
                  <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/40" />
                      <span className="text-sm font-medium text-white">
                        {product.leadTime}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-surface/50 rounded-2xl p-6 min-h-[300px]">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Package className="w-5 h-5 text-primary" />
                  About This Product
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features Grid */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  Key Features
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-sm text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Options */}
            {product.customOptions && product.customOptions.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Wrench className="w-5 h-5 text-primary" />
                  Customization Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.customOptions.map((option, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/70 border border-white/10"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Style Variants */}
            {product.styleVariants && product.styleVariants.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <Tag className="w-5 h-5 text-primary" />
                  Available Styles
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {product.styleVariants.map((variant, index) => (
                    <div
                      key={index}
                      className={`group relative p-4 rounded-xl transition-all cursor-pointer ${
                        variant.isDefault
                          ? 'bg-primary/10 border-2 border-primary'
                          : 'bg-white/5 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">
                          {variant.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                      </div>
                      {variant.description && (
                        <p className="text-xs text-white/50 mt-1">
                          {variant.description}
                        </p>
                      )}
                      {variant.isDefault && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                          DEFAULT
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && <SpecsTable product={product} />}

        {activeTab === 'compatibility' && (
          <CompatibilityMatrix product={product} />
        )}

        {activeTab === 'installation' && (
          <InstallationGuide product={product} />
        )}
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && product.videoUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={product.videoUrl}
              title={`${product.name} - Product Video`}
              className="w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
