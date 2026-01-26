# PRD - 12GA Dealer Portal PWA

**Version:** 1.0  
**Date:** 2025-01-26  
**Author:** Patricio  
**Status:** Draft  

---

## 1. Executive Summary

### 1.1 Product Vision
PWA móvil-first para distribuidores autorizados de 12GA Customs que centraliza recursos de ventas: fotos de marketing, fichas técnicas de productos y un asistente AI especializado en el catálogo 12GA.

### 1.2 Problem Statement
Los distribuidores necesitan acceso rápido y portátil a materiales de venta cuando están:
- En eventos o exposiciones
- Visitando clientes en campo
- Inspeccionando camiones fuera de oficina
- Realizando demostraciones de productos

Actualmente no existe una herramienta unificada y móvil para esto.

### 1.3 Solution
Portal PWA ligero que:
- Funciona offline (recursos cacheados)
- Acceso instantáneo a galería de marketing
- Fichas técnicas de productos consultables
- Chat AI que responde preguntas específicas sobre productos 12GA

---

## 2. Target Users

### 2.1 Primary User: Dealer Autorizado
**Perfil:**
- Distribuidor/vendedor externo de productos 12GA
- Necesita información técnica en tiempo real
- Frecuentemente móvil (eventos, visitas a clientes)
- Nivel técnico: medio (conoce productos de camiones)

**Necesidades:**
- Acceso rápido a fotos profesionales de productos
- Consultar especificaciones técnicas
- Responder preguntas de clientes sobre compatibilidad/instalación

### 2.2 Secondary User: Admin 12GA
**Perfil:**
- Equipo interno de 12GA Customs
- Gestiona contenido y acceso de dealers

**Necesidades:**
- Aprobar/gestionar dealers registrados
- Subir/actualizar contenido de marketing
- Ver estadísticas de uso (futuro)

---

## 3. Functional Requirements

### 3.1 Core Features (MVP)

#### F1: Autenticación de Dealers
| Aspecto | Detalle |
|---------|---------|
| Registro | Via link compartido por 12GA (no público) |
| Login | Email + password |
| Sesión | Persistente con JWT |
| Logout | Manual |

#### F2: Galería de Marketing
| Aspecto | Detalle |
|---------|---------|
| Visualización | Grid de imágenes por categoría/producto |
| Acciones | Solo visualizar (sin descarga) |
| Filtros | Por producto, categoría, tipo de camión |
| Calidad | Imágenes optimizadas para móvil |

#### F3: Fichas Técnicas
| Aspecto | Detalle |
|---------|---------|
| Formato | Cards con specs del producto |
| Contenido | Nombre, descripción, compatibilidad, dimensiones, materiales |
| Búsqueda | Por nombre o SKU |
| Navegación | Por categoría de producto |

#### F4: Chat AI
| Aspecto | Detalle |
|---------|---------|
| Scope | Solo productos 12GA |
| Capacidades | Responder specs, compatibilidad, instalación básica |
| Limitaciones | No procesa órdenes, no da precios |
| Historial | Sesión actual únicamente |

### 3.2 Admin Features (desde 12GA principal)

#### F5: Gestión de Dealers
- Ver lista de dealers registrados
- Activar/desactivar acceso
- Ver último login

#### F6: Gestión de Contenido
- Subir imágenes de marketing
- Asociar imágenes a productos
- Actualizar fichas técnicas (sync con productos existentes)

---

## 4. Non-Functional Requirements

### 4.1 Performance
- First contentful paint: < 2s
- Tiempo de carga de imágenes: < 3s (lazy loading)
- Respuesta del chat: < 5s

### 4.2 Availability
- PWA instalable en dispositivos móviles
- Funcionalidad offline para contenido cacheado
- 99% uptime

### 4.3 Security
- JWT con expiración
- HTTPS obligatorio
- Solo dealers autorizados pueden acceder

### 4.4 Scalability
- Soportar hasta 100 dealers concurrentes
- Hasta 1000 imágenes en galería
- Hasta 100 productos con fichas

---

## 5. Technical Architecture

### 5.1 System Overview

```
┌─────────────────────┐         ┌──────────────────────┐
│  PWA Dealer Portal  │────────▶│  Backend 12GA        │
│  (React + Vite)     │   API   │  (Express/Node)      │
│  Vercel             │         │  Railway             │
│  dealer.12ga.ca     │         │  api.12gacustoms.ca  │
└─────────────────────┘         └──────────────────────┘
                                         │
                                         ▼
                                ┌──────────────────┐
                                │  MongoDB Atlas   │
                                │  + Cloudinary    │
                                └──────────────────┘
```

### 5.2 Tech Stack - PWA

| Layer | Technology |
|-------|------------|
| Language | TypeScript 5.0 |
| Framework | React 18 |
| Build Tool | Vite 5.0 |
| Styling | Tailwind CSS + SASS |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| PWA | vite-plugin-pwa |
| HTTP Client | Axios |

### 5.3 New Backend Endpoints

```
POST   /api/dealers/register     # Registro de dealer
POST   /api/dealers/login        # Login de dealer
GET    /api/dealers/profile      # Perfil del dealer
POST   /api/dealers/logout       # Logout

GET    /api/marketing/images     # Galería de marketing
GET    /api/marketing/images/:id # Detalle de imagen

GET    /api/products/specs       # Fichas técnicas
GET    /api/products/specs/:id   # Ficha específica

POST   /api/chat/message         # Enviar mensaje al AI
```

### 5.4 New Database Models

```javascript
// Dealer Model
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  companyName: String,
  contactName: String,
  phone: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}

// MarketingImage Model
{
  _id: ObjectId,
  title: String,
  imageUrl: String (Cloudinary),
  productId: ObjectId (ref: Product),
  category: String,
  truckBrand: String,
  tags: [String],
  createdAt: Date
}

// ChatHistory Model (optional)
{
  _id: ObjectId,
  dealerId: ObjectId,
  messages: [{
    role: 'user' | 'assistant',
    content: String,
    timestamp: Date
  }],
  createdAt: Date
}
```

---

## 6. User Flows

### 6.1 Dealer Registration
```
1. Admin comparte link de registro
2. Dealer accede al link
3. Dealer completa formulario (empresa, contacto, email, password)
4. Sistema crea cuenta (inactiva por defecto o activa?)
5. Dealer recibe confirmación
6. Dealer puede hacer login
```

### 6.2 Consulta de Producto
```
1. Dealer hace login
2. Navega a "Productos"
3. Filtra por categoría (ej: Bumpers)
4. Selecciona producto
5. Ve ficha técnica completa
6. Opcional: Ve galería de ese producto
```

### 6.3 Uso del Chat AI
```
1. Dealer abre Chat
2. Escribe pregunta (ej: "¿Qué bumper es compatible con Peterbilt 389?")
3. AI responde con productos compatibles
4. Dealer puede preguntar más detalles
5. Historial visible durante sesión
```

---

## 7. MVP Scope

### 7.1 Included in MVP
- ✅ Registro/Login de dealers
- ✅ Galería de imágenes de marketing
- ✅ Fichas técnicas de productos
- ✅ Chat AI básico
- ✅ PWA instalable
- ✅ Mobile-first responsive

### 7.2 NOT in MVP (Future)
- ❌ Descarga de imágenes
- ❌ Catálogo de precios
- ❌ Procesamiento de órdenes
- ❌ Notificaciones push
- ❌ Estadísticas de uso
- ❌ Multi-idioma
- ❌ Modo offline completo

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Dealers registrados | 10+ en primer mes |
| Uso semanal por dealer | 3+ sesiones |
| Preguntas al chat/mes | 50+ |
| Tiempo promedio en app | 5+ min |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Chat AI da info incorrecta | Alto | Limitar scope, entrenar con datos reales |
| Dealers comparten acceso | Medio | Monitorear IPs, sesiones únicas |
| Imágenes pesadas | Medio | Optimización Cloudinary, lazy loading |
| Backend lento | Alto | Caching, optimización queries |

---

## 10. Timeline (Estimated)

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup | 1 semana | Repo, estructura, PWA base |
| Auth | 1 semana | Login/registro dealers |
| Galería | 1 semana | Visualización imágenes |
| Fichas | 1 semana | Specs de productos |
| Chat AI | 2 semanas | Integración AI |
| Testing | 1 semana | QA, fixes |
| **Total** | **7-8 semanas** | **MVP completo** |

---

## 11. Open Questions

1. ¿Los dealers nuevos se activan automáticamente o requieren aprobación manual?
2. ¿El chat AI usará OpenAI API, Anthropic API, u otro?
3. ¿Las imágenes de marketing son diferentes a las de productos existentes?
4. ¿Dominio final? Sugerencia: `dealer.12gacustoms.ca`

---

## 12. Appendix

### A. Wireframes
*Por crear*

### B. API Contracts
*Definir en ARCHITECTURE.md*

### C. Database Schema Details
*Definir en ARCHITECTURE.md*

---

**Document History:**
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-26 | Patricio | Initial draft |
