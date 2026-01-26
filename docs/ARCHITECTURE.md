# ARCHITECTURE.md - 12GA Dealer Portal PWA

**Version:** 1.0  
**Last Updated:** 2025-01-26  
**Status:** Approved  

---

## 1. System Overview

### 1.1 Architecture Type
**Frontend-only PWA** que consume APIs del backend 12GA existente.

```
┌─────────────────────────┐         ┌──────────────────────────┐
│  12GA Dealer Portal     │         │  12GA Backend            │
│  (React + TypeScript)   │────────▶│  (Express + MongoDB)     │
│                         │   API   │                          │
│  dealer.12gacustoms.ca  │         │  api.12gacustoms.ca      │
│  Vercel                 │         │  Railway                 │
└─────────────────────────┘         └──────────────────────────┘
                                             │
                                             ▼
                                    ┌────────────────┐
                                    │  MongoDB Atlas │
                                    │  + Cloudinary  │
                                    └────────────────┘
```

### 1.2 Key Principles
- **Mobile-first:** Diseñado primero para móviles
- **Offline-capable:** Recursos críticos cacheados
- **Type-safe:** TypeScript en todo el código
- **Feature-based:** Estructura modular por funcionalidad

---

## 2. Technology Stack

### 2.1 Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Language | TypeScript | ^5.0 | Type safety |
| Framework | React | ^18.2 | UI library |
| Build Tool | Vite | ^5.0 | Fast bundling |
| Styling | Tailwind CSS | ^3.4 | Utility-first CSS |
| Styling | SASS | ^1.69 | Custom styles |
| State | Zustand | ^4.4 | Global state management |
| Data Fetching | TanStack Query | ^5.0 | Server state, caching |
| Routing | React Router | ^6.20 | Client-side routing |
| Forms | React Hook Form | ^7.48 | Form handling |
| Validation | Zod | ^3.22 | Schema validation |
| PWA | vite-plugin-pwa | ^0.17 | Service worker, manifest |
| Icons | Lucide React | ^0.294 | Icon library |
| HTTP | Axios | ^1.6 | API calls (used by TanStack Query) |

### 2.2 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| TypeScript ESLint | TS-specific linting |
| Husky | Git hooks |
| lint-staged | Pre-commit linting |

---

## 3. Project Structure

```
12ga-dealer-portal/
├── docs/
│   ├── ARCHITECTURE.md        # This file
│   └── PRD.md                 # Product requirements
│
├── public/
│   ├── icons/                 # PWA icons (192x192, 512x512)
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── features/              # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   └── RegisterPage.tsx
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts       # Public exports
│   │   │
│   │   ├── gallery/
│   │   │   ├── components/
│   │   │   │   ├── GalleryGrid.tsx
│   │   │   │   └── ImageCard.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useGallery.ts
│   │   │   ├── pages/
│   │   │   │   └── GalleryPage.tsx
│   │   │   ├── services/
│   │   │   │   └── galleryService.ts
│   │   │   ├── types/
│   │   │   │   └── gallery.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── products/
│   │   │   ├── components/
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   └── ProductSpecs.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useProducts.ts
│   │   │   ├── pages/
│   │   │   │   ├── ProductsPage.tsx
│   │   │   │   └── ProductDetailPage.tsx
│   │   │   ├── services/
│   │   │   │   └── productService.ts
│   │   │   ├── types/
│   │   │   │   └── product.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   └── ChatInput.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useChat.ts
│   │   │   ├── pages/
│   │   │   │   └── ChatPage.tsx
│   │   │   ├── services/
│   │   │   │   └── chatService.ts
│   │   │   ├── types/
│   │   │   │   └── chat.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── dashboard/
│   │       ├── components/
│   │       │   └── DashboardStats.tsx
│   │       ├── pages/
│   │       │   └── DashboardPage.tsx
│   │       └── index.ts
│   │
│   ├── shared/                # Shared across features
│   │   ├── components/
│   │   │   ├── ui/            # Base UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   └── index.ts
│   │   │   └── layout/
│   │   │       ├── Header.tsx
│   │   │       ├── BottomNav.tsx
│   │   │       ├── MainLayout.tsx
│   │   │       └── index.ts
│   │   ├── hooks/
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useMediaQuery.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       ├── validators.ts
│   │       └── constants.ts
│   │
│   ├── store/                 # Zustand stores
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── index.ts
│   │
│   ├── styles/                # Global styles
│   │   ├── base/
│   │   │   ├── _reset.scss
│   │   │   ├── _typography.scss
│   │   │   └── _variables.scss
│   │   ├── components/
│   │   │   └── _custom.scss
│   │   └── main.scss
│   │
│   ├── types/                 # Global types
│   │   ├── api.types.ts
│   │   ├── common.types.ts
│   │   └── index.ts
│   │
│   ├── lib/                   # Library configurations
│   │   ├── axios.ts           # Axios instance
│   │   ├── queryClient.ts     # TanStack Query client
│   │   └── router.tsx         # Router configuration
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env.example
├── .env.local                 # Local environment (git ignored)
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── CLAUDE.md
├── TASKS.md
└── README.md
```

---

## 4. Naming Conventions

### 4.1 Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `ProductCard.tsx` |
| Pages | PascalCase.tsx | `LoginPage.tsx` |
| Hooks | camelCase.ts | `useAuth.ts` |
| Services | camelCase.ts | `authService.ts` |
| Types | kebab-case.types.ts | `auth.types.ts` |
| Stores | camelCase.ts | `authStore.ts` |
| Utils | camelCase.ts | `formatters.ts` |
| SCSS | _kebab-case.scss | `_variables.scss` |

### 4.2 Code

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `isLoading` |
| Functions | camelCase | `handleSubmit` |
| Components | PascalCase | `ProductCard` |
| Interfaces | PascalCase + prefix I | `IProduct` |
| Types | PascalCase | `ProductResponse` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Enums | PascalCase | `UserRole` |
| CSS Classes | kebab-case | `product-card` |

### 4.3 Git

**Branches:**
```
feature/[feature-name]     # feature/dealer-login
fix/[bug-description]      # fix/gallery-loading
refactor/[scope]           # refactor/auth-service
```

**Commits (Conventional Commits):**
```
feat: add dealer registration form
fix: resolve image caching issue
style: update button hover states
refactor: extract api client config
docs: add API documentation
chore: update dependencies
```

---

## 5. API Integration

### 5.1 Base Configuration

```typescript
// src/lib/axios.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('dealer_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('dealer_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 5.2 TanStack Query Setup

```typescript
// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 5.3 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/dealers/register` | Register new dealer |
| POST | `/api/dealers/login` | Dealer login |
| GET | `/api/dealers/profile` | Get dealer profile |
| POST | `/api/dealers/logout` | Logout |
| GET | `/api/marketing/images` | Get marketing images |
| GET | `/api/marketing/images/:id` | Get single image |
| GET | `/api/products/specs` | Get product specs |
| GET | `/api/products/specs/:id` | Get single product spec |
| POST | `/api/chat/message` | Send chat message |

### 5.4 API Response Format

```typescript
// Success Response
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
}
```

---

## 6. State Management

### 6.1 Zustand Store Pattern

```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IDealer {
  id: string;
  email: string;
  companyName: string;
  contactName: string;
}

interface AuthState {
  dealer: IDealer | null;
  isAuthenticated: boolean;
  setDealer: (dealer: IDealer) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      dealer: null,
      isAuthenticated: false,
      setDealer: (dealer) => set({ dealer, isAuthenticated: true }),
      logout: () => set({ dealer: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

### 6.2 State Separation

| Store | Purpose | Persisted |
|-------|---------|-----------|
| authStore | Dealer authentication | Yes |
| uiStore | UI state (modals, toasts) | No |

---

## 7. Component Patterns

### 7.1 Feature Component

```typescript
// src/features/products/components/ProductCard.tsx
import { FC } from 'react';
import { IProduct } from '../types/product.types';

interface ProductCardProps {
  product: IProduct;
  onClick?: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="bg-surface rounded-lg p-4 cursor-pointer hover:bg-surface-hover transition-colors"
      onClick={onClick}
    >
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-3 text-white">
        {product.name}
      </h3>
      <p className="text-muted text-sm mt-1">
        {product.category}
      </p>
    </div>
  );
};
```

### 7.2 Custom Hook with TanStack Query

```typescript
// src/features/products/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => productService.getAll(categoryId),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};
```

### 7.3 Service Pattern

```typescript
// src/features/products/services/productService.ts
import { apiClient } from '@/lib/axios';
import { IProduct, ProductsResponse } from '../types/product.types';

export const productService = {
  getAll: async (categoryId?: string): Promise<IProduct[]> => {
    const params = categoryId ? { category: categoryId } : {};
    const { data } = await apiClient.get<ProductsResponse>('/api/products/specs', { params });
    return data.data;
  },

  getById: async (id: string): Promise<IProduct> => {
    const { data } = await apiClient.get<{ data: IProduct }>(`/api/products/specs/${id}`);
    return data.data;
  },
};
```

### 7.4 Form with React Hook Form + Zod

```typescript
// src/features/auth/components/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Handle login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-surface border border-gray-700 rounded-lg"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-surface border border-gray-700 rounded-lg"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};
```

---

## 8. Styling System

### 8.1 Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff3d24',
        'primary-hover': '#e63520',
        background: '#0d0d0d',
        surface: '#1a1a1a',
        'surface-hover': '#252525',
        muted: '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### 8.2 SASS Variables (for custom styles)

```scss
// src/styles/base/_variables.scss
$primary: #ff3d24;
$primary-hover: #e63520;
$background: #0d0d0d;
$surface: #1a1a1a;
$surface-hover: #252525;
$text-white: #ffffff;
$text-muted: #888888;
$success: #28a745;
$error: #dc3545;
$warning: #ffc107;

// Breakpoints (match Tailwind)
$screen-sm: 640px;
$screen-md: 768px;
$screen-lg: 1024px;
$screen-xl: 1280px;
```

---

## 9. PWA Configuration

### 9.1 Vite PWA Plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: '12GA Dealer Portal',
        short_name: '12GA Dealer',
        description: 'Portal para distribuidores autorizados de 12GA Customs',
        theme_color: '#ff3d24',
        background_color: '#0d0d0d',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.12gacustoms\.ca\/api\/marketing/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'marketing-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
```

---

## 10. Environment Variables

```bash
# .env.example

# API
VITE_API_URL=http://localhost:5000

# App
VITE_APP_NAME=12GA Dealer Portal
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_OFFLINE=true
```

---

## 11. Security Considerations

### 11.1 Authentication
- JWT stored in localStorage (HttpOnly cookies preferred for production)
- Token refresh on 401 responses
- Automatic logout on token expiry

### 11.2 Data Protection
- HTTPS only in production
- No sensitive data in localStorage (except JWT)
- Input sanitization on all forms

### 11.3 API Security
- All requests include Authorization header
- CORS configured for specific domains only

---

## 12. Performance Optimizations

### 12.1 Code Splitting
- Lazy loading for pages
- Dynamic imports for heavy components

### 12.2 Images
- Lazy loading with `loading="lazy"`
- Cloudinary transformations for optimal sizes
- WebP format when supported

### 12.3 Caching
- TanStack Query stale time: 5 minutes
- Service Worker caches static assets
- Marketing images cached for 7 days

---

## 13. Testing Strategy (Future)

| Type | Tool | Scope |
|------|------|-------|
| Unit | Vitest | Utils, hooks |
| Component | Testing Library | UI components |
| E2E | Playwright | Critical flows |

---

**Document History:**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-26 | Initial architecture |
