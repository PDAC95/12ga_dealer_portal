# CLAUDE.md - 12GA Dealer Portal PWA Development Rules

**Version:** 1.1  
**Last Updated:** 2025-01-26  
**Project:** 12GA Dealer Portal PWA  
**Status:** Initial Setup  

---

## 🎯 PROJECT OVERVIEW

### What is this project?
PWA móvil-first para distribuidores autorizados de 12GA Customs. Proporciona acceso a fotos de marketing, fichas técnicas y un chat AI especializado en productos 12GA.

### Key Facts
- **Type:** Progressive Web App (PWA) - Frontend only
- **Language:** TypeScript
- **Users:** Dealers/distribuidores externos autorizados
- **Approach:** Mobile-first, ligera, offline-capable
- **Backend:** Consume APIs del backend principal 12GA (NO tiene backend propio)
- **Admin:** Panel de gestión en el sitio principal 12GA

---

## 🚀 MANDATORY WORKFLOW

### START OF EVERY SESSION

**CRITICAL: Read files in this EXACT order:**

1. **CLAUDE.md** (this file ✅)
2. **docs/ARCHITECTURE.md** - Technical setup and conventions
3. **TASKS.md** - Find next P0 task to work on

**Then announce your work plan:**
```
📋 Files loaded successfully.

Next Task: [TASK-XXX] - [Title]
Priority: [P0/P1/P2]
Files to modify: [List]

Starting work...
```

### ONE STEP AT A TIME

**CRITICAL for ADHD-friendly workflow:**
- ❌ NEVER multiple steps in one message
- ❌ NEVER long explanations
- ✅ ONE instruction per message
- ✅ Wait for "funciona" confirmation
- ✅ Then next step

---

## 💻 TECHNICAL STANDARDS

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Language | TypeScript | ^5.0 |
| Framework | React | ^18.2 |
| Build Tool | Vite | ^5.0 |
| Styling | Tailwind CSS | ^3.4 |
| Styling | SASS | ^1.69 |
| State | Zustand | ^4.4 |
| Data Fetching | TanStack Query | ^5.0 |
| Routing | React Router | ^6.20 |
| Forms | React Hook Form | ^7.48 |
| Validation | Zod | ^3.22 |
| PWA | vite-plugin-pwa | ^0.17 |
| Icons | Lucide React | ^0.294 |
| HTTP | Axios | ^1.6 |

### API Configuration

```typescript
// Development
const API_URL = "http://localhost:5000"

// Production
const API_URL = "https://api.12gacustoms.ca"

// Always use environment variable
const API_URL = import.meta.env.VITE_API_URL
```

### Project Structure

```
12ga-dealer-portal/
├── docs/
│   ├── ARCHITECTURE.md
│   └── PRD.md
├── public/
│   └── icons/
├── src/
│   ├── features/           # Feature modules
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── gallery/
│   │   ├── products/
│   │   ├── chat/
│   │   └── dashboard/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   ├── hooks/
│   │   └── utils/
│   ├── store/              # Zustand stores
│   ├── styles/             # SASS files
│   │   ├── base/
│   │   ├── components/
│   │   └── main.scss
│   ├── types/              # Global types
│   ├── lib/                # Library configs
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md
├── TASKS.md
└── README.md
```

### Naming Conventions

**Files & Folders:**
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase.tsx | `ProductCard.tsx` |
| Pages | PascalCase.tsx | `LoginPage.tsx` |
| Hooks | camelCase.ts | `useAuth.ts` |
| Services | camelCase.ts | `authService.ts` |
| Types | kebab-case.types.ts | `auth.types.ts` |
| Stores | camelCase.ts | `authStore.ts` |
| SCSS | _kebab-case.scss | `_variables.scss` |

**Code:**
| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `isLoading` |
| Functions | camelCase | `handleSubmit` |
| Components | PascalCase | `ProductCard` |
| Interfaces | PascalCase + I | `IProduct` |
| Types | PascalCase | `ProductResponse` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |

---

## 📁 FEATURE MODULE STRUCTURE

Each feature follows this structure:
```
feature/
├── components/     # UI components for this feature
├── hooks/          # Custom hooks (useFeature.ts)
├── pages/          # Page components
├── services/       # API calls
├── types/          # TypeScript types
└── index.ts        # Public exports
```

### Example: Creating a new feature hook

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
```

---

## 🎨 STYLING RULES

### Tailwind First
- Use Tailwind classes for 90% of styling
- Custom SASS only for complex animations or very specific styles

### Color Palette
```
Primary:     #ff3d24 (brand red)
Background:  #0d0d0d (dark)
Surface:     #1a1a1a (cards)
Muted:       #888888 (secondary text)
```

### Tailwind Custom Classes
```typescript
// Use these in components:
className="bg-primary"
className="bg-background"
className="bg-surface"
className="text-muted"
```

---

## 🔐 AUTHENTICATION

### Token Storage
```typescript
// Store
localStorage.setItem('dealer_token', token);

// Retrieve
const token = localStorage.getItem('dealer_token');

// Remove (logout)
localStorage.removeItem('dealer_token');
```

### Protected Routes
```typescript
// Use ProtectedRoute wrapper
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

### Zustand Auth Store
```typescript
// Access auth state anywhere:
const { dealer, isAuthenticated, logout } = useAuthStore();
```

---

## 📡 API CALLS

### Using TanStack Query (Preferred)

```typescript
// For GET requests - use hooks
const { data, isLoading, error } = useProducts();

// For mutations (POST, PUT, DELETE)
const mutation = useMutation({
  mutationFn: authService.login,
  onSuccess: (data) => {
    // Handle success
  },
});
```

### Service Pattern

```typescript
// src/features/auth/services/authService.ts
import { apiClient } from '@/lib/axios';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post('/api/dealers/login', credentials);
    return data;
  },
};
```

---

## 📝 FORMS

### React Hook Form + Zod Pattern

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

// 2. Infer type
type FormData = z.infer<typeof schema>;

// 3. Use form
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

---

## 🚫 FORBIDDEN ACTIONS

- ❌ Add packages without mentioning first
- ❌ Modify backend code without explicit instruction
- ❌ Use inline styles (use Tailwind or SASS)
- ❌ Skip TypeScript types (no `any`)
- ❌ Hardcode API URLs
- ❌ Multiple steps in one message
- ❌ Skip error handling in async code
- ❌ Create components outside feature folders
- ❌ Use Context API for global state (use Zustand)

---

## ✅ REQUIRED ACTIONS

- ✅ One step at a time
- ✅ Wait for confirmation before next step
- ✅ Type everything (no implicit `any`)
- ✅ Mobile-first responsive design
- ✅ Follow feature-based structure exactly
- ✅ Update TASKS.md after completions
- ✅ Test on mobile viewport (375px)
- ✅ Use TanStack Query for all API calls
- ✅ Use Zustand for global state
- ✅ Export from feature index.ts

---

## 🔄 GIT CONVENTIONS

### Branch Naming
```
feature/[feature-name]    # feature/dealer-login
fix/[bug-description]     # fix/gallery-loading
refactor/[scope]          # refactor/auth-hooks
```

### Commit Messages (Conventional Commits)
```
feat: add dealer login page
fix: resolve gallery image loading
style: update button hover states
refactor: extract auth logic to store
docs: update README
chore: update dependencies
```

---

## 🧪 TESTING CHECKLIST

Before marking any task complete:
- [ ] No TypeScript errors
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1200px+)
- [ ] No console errors
- [ ] Loading states work
- [ ] Error states handled
- [ ] Empty states handled

---

## 📞 COMMUNICATION

### When Starting
```
📋 Starting: [TASK-XXX]
File: [path/to/file]
Action: [what you'll do]
```

### When Complete
```
✅ Done: [TASK-XXX]
Changes: [brief list]
```

### When Blocked
```
🚧 Blocked: [TASK-XXX]
Issue: [description]
Need: [what's required]
```

---

## 📚 QUICK REFERENCE

### Commands
```bash
npm run dev       # Start development
npm run build     # Build for production
npm run preview   # Preview build
npm run lint      # Run linter
```

### Environment Variables
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=12GA Dealer Portal
```

### Import Aliases
```typescript
import { Button } from '@/shared/components/ui';
import { useAuth } from '@/features/auth';
import { apiClient } from '@/lib/axios';
```

### API Endpoints
```
POST   /api/dealers/register
POST   /api/dealers/login
GET    /api/dealers/profile
GET    /api/marketing/images
GET    /api/products/specs
POST   /api/chat/message
```

---

## ⚡ TL;DR - CRITICAL RULES

1. 📖 **Read CLAUDE.md, ARCHITECTURE.md, TASKS.md first**
2. 🔴 **ONE step at a time - wait for confirmation**
3. 📱 **Mobile-first always**
4. 🎨 **Tailwind for styling**
5. 📦 **Feature-based structure**
6. 🔷 **TypeScript - no `any`**
7. 📡 **TanStack Query for API calls**
8. 🗃️ **Zustand for global state**
9. ✍️ **Update TASKS.md after completions**
10. 🚫 **No backend changes without instruction**

---

**"Ligero, tipado, móvil. Dealer-first experience."**

---

_This is your source of truth. Follow it strictly._
