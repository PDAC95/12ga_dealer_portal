import { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/axios';
import { HorizontalLoginBar } from '../components/HorizontalLoginBar';
import { ImageSlider } from '../components/ImageSlider';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dzwmrurhg/image/upload/w_1920,h_1080,c_fill,f_auto,q_auto';
const LOGO_URL = 'https://res.cloudinary.com/dzwmrurhg/image/upload/v1760465523/logo_ok_qrk7ar.png';

// Fallback images in case API fails
const FALLBACK_IMAGES = [
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/peterbilt-389-dave-gillis-main`,
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/wes-riley-main`,
  `${CLOUDINARY_BASE}/twelve-ga-customs/trucks/davis-pete-main`,
];

interface Truck {
  _id: string;
  image: string;
  title: string;
}

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, setDealer } = useAuthStore();
  const [images, setImages] = useState<string[]>(FALLBACK_IMAGES);
  const [isLoginExpanded, setIsLoginExpanded] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Load featured trucks from API
  useEffect(() => {
    const loadFeaturedTrucks = async () => {
      try {
        const response = await apiClient.get('/api/trucks', {
          params: { featured: true, limit: 10 },
        });

        if (response.data.success && response.data.data.length > 0) {
          const truckImages = response.data.data.map((truck: Truck) => {
            // Build full Cloudinary URL from image path
            const imagePath = truck.image.startsWith('http')
              ? truck.image
              : `${CLOUDINARY_BASE}/${truck.image}`;
            return imagePath;
          });
          setImages(truckImages);
        }
      } catch (error) {
        console.error('Error loading featured trucks:', error);
        // Keep fallback images on error
      }
    };

    loadFeaturedTrucks();
  }, []);

  // Manejar callback de Google OAuth
  useEffect(() => {
    const token = searchParams.get('token');
    const dealerData = searchParams.get('dealer');

    if (token && dealerData) {
      try {
        const dealer = JSON.parse(decodeURIComponent(dealerData));
        setDealer(dealer, token);
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error parsing OAuth callback data:', error);
      }
    }
  }, [searchParams, setDealer, navigate]);

  // Mensaje de éxito de reset password
  const successMessage = (location.state as { message?: string })?.message;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image Slider */}
      <ImageSlider images={images} interval={6000} />

      {/* Logo - Top left corner */}
      <div className="absolute top-6 left-6 z-20">
        <img
          src={LOGO_URL}
          alt="12GA Customs"
          className="h-6 md:h-8 w-auto drop-shadow-lg"
        />
      </div>

      {/* Success Message - Floating */}
      {successMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="px-6 py-3 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl">
            <p className="text-sm text-green-400 text-center">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* Login Button / Horizontal Bar - Bottom right */}
      <div className="absolute bottom-0 right-0 z-20 w-full md:w-auto p-4 md:p-8">
        <HorizontalLoginBar
          isExpanded={isLoginExpanded}
          onToggle={() => setIsLoginExpanded(!isLoginExpanded)}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};
