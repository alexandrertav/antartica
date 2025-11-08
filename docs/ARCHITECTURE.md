# 🏗️ Arquitetura Técnica - Antártica WebMapa

## Visão Geral

Sistema web para visualização interativa de dados geoespaciais da pesquisa antártica na Baía do Almirantado.

---

## 📐 Diagrama de Arquitetura Atual (v0.1)

```
┌─────────────────────────────────────────────────────────────┐
│                        Cliente (Browser)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────┐      ┌──────────────────────┐        │
│  │   Next.js App     │      │   React Components   │        │
│  │   (App Router)    │◄────►│   - AntarcticaMap    │        │
│  │                   │      │   - GlassPanels      │        │
│  │  - SSR/SSG        │      │   - Header/Footer    │        │
│  │  - API Routes     │      │                      │        │
│  └───────────────────┘      └──────────────────────┘        │
│           │                            │                     │
│           │                            │                     │
│           ▼                            ▼                     │
│  ┌──────────────────┐      ┌──────────────────────┐        │
│  │  Leaflet.js      │      │   Custom Hooks       │        │
│  │  - Map rendering │      │   - usePhotoFilters  │        │
│  │  - Markers       │      │   - useExport        │        │
│  │  - Clustering    │      │                      │        │
│  └──────────────────┘      └──────────────────────┘        │
│           │                            │                     │
└───────────┼────────────────────────────┼─────────────────────┘
            │                            │
            ▼                            ▼
    ┌───────────────┐          ┌─────────────────┐
    │  CDN / Tiles  │          │  Static Files   │
    │  - OSM        │          │  - fotos.csv    │
    │  - Satellite  │          │  - images       │
    └───────────────┘          └─────────────────┘
```

---

## 🏗️ Arquitetura Futura (v1.0 - Pós-Fase 2)

```
                     ┌──────────────────────┐
                     │    Load Balancer     │
                     │    (Cloudflare)      │
                     └──────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                                   ▼
    ┌───────────────┐                  ┌────────────────┐
    │   Frontend    │                  │   Backend API  │
    │   (Vercel)    │                  │   (Railway)    │
    │               │                  │                │
    │  Next.js 15   │◄────────────────►│  NestJS/Express│
    │  React 19     │      REST/       │  TypeScript    │
    │  TypeScript   │     GraphQL      │                │
    └───────────────┘                  └────────────────┘
            │                                   │
            │                                   │
            ▼                                   ▼
    ┌───────────────┐                  ┌────────────────┐
    │   CDN Static  │                  │   PostgreSQL   │
    │   Assets      │                  │   + PostGIS    │
    │               │                  │                │
    │  - Images     │                  │  - Photos      │
    │  - Tiles      │                  │  - Observers   │
    │  - JS/CSS     │                  │  - Layers      │
    └───────────────┘                  └────────────────┘
            │                                   │
            │                                   ▼
            │                          ┌────────────────┐
            │                          │  Redis Cache   │
            │                          │                │
            │                          │  - Queries     │
            │                          │  - Sessions    │
            │                          └────────────────┘
            │
            ▼
    ┌───────────────┐
    │  Object Store │
    │  (S3/R2)      │
    │               │
    │  - Raw Photos │
    │  - Thumbnails │
    │  - Exports    │
    └───────────────┘
```

---

## 📂 Estrutura de Pastas

```
antartica/
├── public/                    # Assets estáticos
│   ├── fotos.csv             # Dados de fotos (temporário)
│   ├── images/               # Imagens estáticas
│   └── tiles/                # Tiles de mapas (futuro)
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Layout raiz
│   │   ├── page.tsx          # Home page
│   │   ├── mapa/             # Página do mapa
│   │   │   └── page.tsx
│   │   └── api/              # API Routes (futuro)
│   │       ├── photos/
│   │       ├── export/
│   │       └── stats/
│   │
│   ├── components/           # Componentes React
│   │   ├── map/
│   │   │   ├── AntarcticaMap.tsx
│   │   │   ├── MapControls.tsx
│   │   │   └── MarkerCluster.tsx
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   ├── panels/
│   │   │   ├── LayersPanel.tsx
│   │   │   ├── SearchPanel.tsx
│   │   │   ├── ExportPanel.tsx
│   │   │   └── InfoPanel.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   │
│   ├── hooks/                # Custom React Hooks
│   │   ├── usePhotoFilters.ts
│   │   ├── useMap.ts
│   │   ├── useExport.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── lib/                  # Utilitários e serviços
│   │   ├── exportService.ts
│   │   ├── csvParser.ts
│   │   ├── mapUtils.ts
│   │   └── utils.ts
│   │
│   ├── types/                # TypeScript types
│   │   ├── photo.ts
│   │   ├── filters.ts
│   │   ├── map.ts
│   │   └── index.ts
│   │
│   ├── styles/               # Estilos globais
│   │   └── globals.css
│   │
│   └── config/               # Configurações
│       ├── mapConfig.ts
│       └── constants.ts
│
├── backend/ (futuro)         # Backend separado
│   ├── src/
│   │   ├── modules/
│   │   │   ├── photos/
│   │   │   ├── observers/
│   │   │   ├── layers/
│   │   │   └── auth/
│   │   ├── database/
│   │   ├── services/
│   │   └── utils/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── tests/                    # Testes
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/                     # Documentação
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md
│   ├── GETTING_STARTED.md
│   └── API.md
│
└── scripts/                  # Scripts utilitários
    ├── import-csv.ts
    ├── generate-thumbnails.ts
    └── seed-db.ts
```

---

## 🔧 Tecnologias por Camada

### Frontend

#### Core
- **Next.js 15:** Framework React com SSR/SSG
- **React 19:** Biblioteca UI
- **TypeScript 5:** Tipagem estática

#### Mapas
- **Leaflet 1.9.4:** Biblioteca de mapas
- **leaflet.markercluster:** Clustering de marcadores
- **turf.js:** Análise espacial em JavaScript
- **proj4js:** Conversão de projeções

#### UI/UX
- **Tailwind CSS 4:** Framework CSS utilitário
- **Headless UI:** Componentes acessíveis
- **Framer Motion:** Animações
- **Lucide React:** Ícones

#### Data Management
- **React Query (TanStack Query):** Cache e state server
- **Zustand:** State management leve
- **Zod:** Validação de schemas

#### Formulários & Inputs
- **React Hook Form:** Gerenciamento de formulários
- **react-datepicker:** Seletor de datas
- **fuse.js:** Busca fuzzy

#### Exportação
- **xlsx (SheetJS):** Exportação Excel
- **jsPDF:** Geração de PDFs
- **file-saver:** Download de arquivos

---

### Backend (Futuro)

#### Core
- **Node.js 20+** ou **Bun:** Runtime JavaScript
- **NestJS:** Framework backend TypeScript
- **Express:** Web server (alternativa)

#### Banco de Dados
- **PostgreSQL 15+:** Banco relacional
- **PostGIS 3.4+:** Extensão geoespacial
- **Prisma:** ORM TypeScript
- **Redis:** Cache in-memory

#### API
- **REST API:** Endpoints RESTful
- **GraphQL:** API flexível (opcional)
- **Swagger/OpenAPI:** Documentação

#### Autenticação
- **NextAuth.js:** Auth para Next.js
- **JWT:** Tokens de autenticação
- **bcrypt:** Hash de senhas

#### File Processing
- **Sharp:** Processamento de imagens
- **Multer:** Upload de arquivos
- **exiftool-vendored:** Leitura de EXIF

#### GIS Processing
- **GDAL:** Processamento de rasters
- **Shapely (Python):** Geometrias
- **GeoPandas (Python):** Data frames geoespaciais

---

### DevOps & Infrastructure

#### Containerização
- **Docker:** Containers
- **Docker Compose:** Orquestração local

#### CI/CD
- **GitHub Actions:** Pipeline de deploy
- **Vercel:** Deploy automático frontend
- **Railway/Render:** Deploy backend

#### Monitoramento
- **Sentry:** Error tracking
- **LogRocket:** Session replay
- **Uptime Robot:** Monitoramento de uptime

#### Analytics
- **Plausible:** Analytics privacy-first
- **PostHog:** Product analytics

#### Testing
- **Vitest:** Unit tests
- **Playwright:** E2E tests
- **Jest:** Test runner
- **Testing Library:** React testing

---

## 🗄️ Modelo de Dados

### Atual (CSV)

```typescript
interface PhotoData {
  PATH: string           // Caminho local da foto
  NÚMERO: string         // ID único da foto
  URL: string            // URL do Google Drive
  ANO: string            // Ano da coleta
  TIPO: string           // Tipo: "Detalhe" | "Paisagem"
  REC_TIME: string       // Timestamp com timezone
  DATA: string           // Data formatada (DD/MM/YYYY)
  LATITUDE: string       // Latitude (formato BR: vírgula)
  LONGITUDE: string      // Longitude (formato BR: vírgula)
  ELEVATION: string      // Elevação em metros
  OBSERVADOR: string     // Nome do observador
}
```

---

### Futuro (PostgreSQL + PostGIS)

```sql
-- Tabela de fotografias
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Arquivos
  file_path TEXT,
  google_drive_url TEXT,
  storage_url TEXT,        -- URL do S3/R2
  thumbnail_url TEXT,
  
  -- Temporal
  year INTEGER,
  date DATE,
  recorded_at TIMESTAMP WITH TIME ZONE,
  
  -- Tipo
  type photo_type NOT NULL,
  
  -- Geoespacial (PostGIS)
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  elevation NUMERIC(10, 6),
  
  -- Relacionamentos
  observer_id INTEGER REFERENCES observers(id),
  expedition_id INTEGER REFERENCES expeditions(id),
  
  -- Metadados flexíveis (JSONB)
  exif_data JSONB,
  metadata JSONB,
  
  -- Auditoria
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES users(id)
);

-- Enum para tipos de foto
CREATE TYPE photo_type AS ENUM ('detalhe', 'paisagem', 'macro', 'aerea');

-- Índices
CREATE INDEX idx_photos_location ON photos USING GIST(location);
CREATE INDEX idx_photos_date ON photos(date);
CREATE INDEX idx_photos_observer ON photos(observer_id);
CREATE INDEX idx_photos_type ON photos(type);
CREATE INDEX idx_photos_metadata ON photos USING GIN(metadata);
CREATE INDEX idx_photos_exif ON photos USING GIN(exif_data);

-- Full-text search
CREATE INDEX idx_photos_search ON photos USING GIN(
  to_tsvector('portuguese', 
    COALESCE(metadata->>'description', '') || ' ' ||
    COALESCE(metadata->>'tags', '')
  )
);
```

```sql
-- Tabela de observadores
CREATE TABLE observers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  orcid VARCHAR(50) UNIQUE,    -- ORCID ID
  institution VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

```sql
-- Tabela de expedições
CREATE TABLE expeditions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  
  -- Área de estudo
  study_area GEOGRAPHY(POLYGON, 4326),
  
  -- Equipe
  lead_researcher_id INTEGER REFERENCES observers(id),
  
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

```sql
-- Tabela de camadas (layers)
CREATE TABLE layers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  
  -- Tipo de camada
  type layer_type NOT NULL,
  
  -- Dados
  url TEXT,
  data JSONB,           -- Para GeoJSON inline
  style JSONB,          -- Estilo visual
  
  -- Configurações
  min_zoom INTEGER DEFAULT 0,
  max_zoom INTEGER DEFAULT 22,
  opacity NUMERIC(3, 2) DEFAULT 1.0,
  
  -- Controle
  active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE layer_type AS ENUM ('raster', 'vector', 'tile', 'wms', 'geojson');
```

```sql
-- Tabela de áreas de interesse
CREATE TABLE areas_of_interest (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Geometria
  geometry GEOGRAPHY(POLYGON, 4326) NOT NULL,
  
  -- Tipo de área
  type area_type,
  
  metadata JSONB,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE area_type AS ENUM ('study_site', 'protected_area', 'danger_zone', 'glacier', 'station');
```

```sql
-- Tabela de usuários (para sistema com login)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  
  -- Perfil
  name VARCHAR(255),
  avatar_url TEXT,
  
  -- OAuth
  google_id VARCHAR(255),
  orcid VARCHAR(50),
  
  -- Papel
  role user_role DEFAULT 'viewer',
  
  -- API
  api_key VARCHAR(100) UNIQUE,
  api_rate_limit INTEGER DEFAULT 1000,
  
  -- Auditoria
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE user_role AS ENUM ('admin', 'researcher', 'viewer');
```

---

## 🔐 Segurança

### Frontend
- [ ] **Sanitização de inputs:** Prevenir XSS
- [ ] **HTTPS obrigatório:** Redirect HTTP → HTTPS
- [ ] **CSP Headers:** Content Security Policy
- [ ] **CORS configurado:** Apenas domínios permitidos

### Backend (Futuro)
- [ ] **Autenticação JWT:** Tokens seguros
- [ ] **Rate limiting:** Prevenir DDoS
- [ ] **SQL Injection:** Uso de ORM/prepared statements
- [ ] **Validação de entrada:** Zod/class-validator
- [ ] **CSRF protection:** Tokens CSRF
- [ ] **Helmet.js:** Security headers

### Banco de Dados
- [ ] **Row Level Security:** PostgreSQL RLS
- [ ] **Encrypted at rest:** Dados criptografados
- [ ] **Backups automáticos:** Diários
- [ ] **Least privilege:** Usuários com mínimo acesso
- [ ] **Audit logs:** Log de todas as operações sensíveis

---

## 🚀 Performance

### Frontend

#### Otimizações Implementadas
- ✅ **Code splitting:** Next.js automático
- ✅ **Image optimization:** next/image
- ✅ **Dynamic imports:** Componente de mapa
- ✅ **CSS-in-JS:** Tailwind purge

#### Otimizações Planejadas
- [ ] **Virtual scrolling:** Listas longas
- [ ] **Lazy loading:** Imagens e componentes
- [ ] **Service Worker:** Cache offline
- [ ] **Web Workers:** Processamento em background
- [ ] **Debouncing:** Inputs de busca
- [ ] **Memoization:** React.memo, useMemo, useCallback

### Backend (Futuro)

#### Database
- [ ] **Índices espaciais:** GIST indexes
- [ ] **Query optimization:** EXPLAIN ANALYZE
- [ ] **Connection pooling:** PgBouncer
- [ ] **Read replicas:** Distribuir leitura

#### Cache
- [ ] **Redis cache:** Queries frequentes
- [ ] **CDN cache:** Assets estáticos
- [ ] **HTTP cache:** Cache headers
- [ ] **Query result cache:** React Query

#### API
- [ ] **Pagination:** Limitar resultados
- [ ] **Field selection:** GraphQL-style
- [ ] **Compression:** Gzip/Brotli
- [ ] **HTTP/2:** Multiplexing

---

## 📊 Monitoramento

### Métricas Frontend
- **Core Web Vitals:**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

- **Lighthouse Score:**
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 90
  - SEO > 90

### Métricas Backend
- **Uptime:** > 99.9%
- **Response time:** p95 < 200ms
- **Error rate:** < 0.1%
- **Throughput:** Requests/segundo

### Ferramentas
- **Sentry:** Error tracking
- **Plausible:** Analytics
- **Uptime Robot:** Status monitoring
- **Lighthouse CI:** Performance monitoring

---

## 🔄 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

name: Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      
  deploy-frontend:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🌐 Deployment

### Ambientes

#### Development
- **URL:** http://localhost:3000
- **Database:** Docker PostgreSQL local
- **Storage:** Filesystem local

#### Staging
- **URL:** https://staging-antartica.vercel.app
- **Database:** Supabase (dev)
- **Storage:** S3 bucket (dev)

#### Production
- **URL:** https://antartica-ifrs.com.br
- **Database:** Supabase (prod) ou Railway
- **Storage:** S3 bucket (prod)
- **CDN:** Cloudflare

### Estratégia de Deploy
1. **Feature branches:** Develop em branches separados
2. **Pull requests:** Review antes de merge
3. **Develop branch:** Testes integrados
4. **Main branch:** Deploy automático para produção
5. **Rollback:** Revert git commit se necessário

---

## 📈 Escalabilidade

### Horizontal Scaling
- **Frontend:** Serverless (Vercel/Netlify)
- **Backend:** Múltiplas instâncias (Load balancer)
- **Database:** Read replicas
- **Cache:** Redis cluster

### Vertical Scaling
- **Database:** Aumentar CPU/RAM conforme necessidade
- **Storage:** Auto-scaling (S3)

### Otimizações Futuras
- **Edge computing:** Cloudflare Workers
- **CDN global:** Distribuição de assets
- **Database sharding:** Se > 10M fotos
- **Microservices:** Separar serviços críticos

---

## 🔗 Integrações Externas

### Atuais
- ✅ **Google Drive:** Hospedagem de fotos
- ✅ **OpenStreetMap:** Tiles de mapa
- ✅ **Esri Satellite:** Imagens de satélite
- ✅ **CartoDB:** Mapas temáticos

### Planejadas
- [ ] **Quantarctica:** Dados antárticos
- [ ] **ORCID:** Autenticação acadêmica
- [ ] **Zenodo:** DOI para datasets
- [ ] **GBIF:** Compartilhamento de dados
- [ ] **AWS S3 / R2:** Storage de arquivos
- [ ] **Mapbox:** Tiles customizados (opcional)

---

## 📚 Padrões de Código

### TypeScript
- **Strict mode:** Enabled
- **No any:** Evitar uso de `any`
- **Interfaces > Types:** Para objetos
- **Enums:** Para valores fixos

### React
- **Functional components:** Sem class components
- **Hooks:** Usar hooks customizados
- **Prop types:** TypeScript interfaces
- **Naming:** PascalCase para componentes

### CSS
- **Tailwind first:** Usar Tailwind quando possível
- **CSS Modules:** Para estilos complexos
- **Responsive:** Mobile-first
- **Dark mode:** Preparar suporte (futuro)

### Commits
- **Conventional Commits:** 
  - `feat:` Nova feature
  - `fix:` Bug fix
  - `docs:` Documentação
  - `refactor:` Refatoração
  - `test:` Testes
  - `chore:` Manutenção

---

## 🧪 Estratégia de Testes

### Unit Tests (70%)
- Funções utilitárias
- Hooks customizados
- Serviços (exportService, etc)
- Validações

### Integration Tests (20%)
- Componentes + Hooks
- API calls
- Database queries
- Fluxos de dados

### E2E Tests (10%)
- Fluxos críticos do usuário
- Busca + filtros
- Exportação
- Navegação no mapa

---

**Última atualização:** Outubro 2025  
**Versão:** 0.1 → 1.0 (planejado)

---

*Para roadmap completo, veja [ROADMAP.md](./ROADMAP.md)*  
*Para começar desenvolvimento, veja [GETTING_STARTED.md](./GETTING_STARTED.md)*

