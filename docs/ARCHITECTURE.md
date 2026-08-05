# BirruLabs Website Architecture

**Version:** 1.0.0  
**Last Updated:** 2026-08-05  
**Status:** Production

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Data Models](#data-models)
6. [Routing & i18n](#routing--i18n)
7. [Security](#security)
8. [Performance](#performance)
9. [Deployment](#deployment)

---

## Overview

BirruLabs website adalah Next.js 15 App Router application dengan bilingual support (Indonesian primary, English secondary). Static-generated (SSG) untuk semua halaman, dark-first mobile-first design, dan security-first architecture.

**Key Characteristics:**
- 100% static generation (no SSR, no ISR)
- Bilingual routing via `[locale]` dynamic segment
- Static translations (no external i18n library)
- Security headers via middleware
- Zero runtime dependencies on external APIs

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Vercel Edge                        │
│  (CDN, Edge Functions, Static Assets Distribution) │
└─────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│                 Next.js Middleware                   │
│   (Security Headers: CSP, HSTS, X-Frame, etc.)     │
└─────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│            Next.js App Router (SSG)                  │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ [locale]     │  │ Static Data  │                │
│  │ - /id/*      │  │ - projects   │                │
│  │ - /en/*      │  │ - articles   │                │
│  └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Static HTML + Assets                    │
│   (Pre-rendered at build time, served from CDN)    │
└─────────────────────────────────────────────────────┘
```

### Request Flow

1. **User navigates to `/id/projects`**
2. **Edge:** Vercel CDN serves cached HTML
3. **Middleware:** Injects security headers
4. **Response:** Static HTML delivered (no server-side processing)

---

## Technology Stack

### Core

| Layer          | Technology       | Version | Purpose                                  |
|----------------|------------------|---------|------------------------------------------|
| **Framework**  | Next.js          | 15.5.22 | App Router, SSG, React Server Components |
| **Runtime**    | React            | 19.x    | UI components, Server Components         |
| **Language**   | TypeScript       | 5.x     | Type safety, strict mode                 |
| **Styling**    | Tailwind CSS     | 3.4.x   | Utility-first CSS, dark theme            |
| **Icons**      | Lucide React     | latest  | Icon library                             |
| **Validation** | Zod              | 3.x     | Schema validation (future forms)         |

### Infrastructure

| Component      | Service          | Purpose                                  |
|----------------|------------------|------------------------------------------|
| **Hosting**    | Vercel           | Static hosting, edge functions, CDN      |
| **Repository** | GitHub           | Version control, CI/CD trigger           |
| **CI/CD**      | Vercel Git       | Auto-deploy on push to main              |
| **Domain**     | birrulabs.biz.id | Production domain                        |

### Future (Planned)

- **Database:** Supabase PostgreSQL (for form submissions, analytics)
- **Storage:** Supabase Storage (for uploaded assets)
- **Email:** Resend or SendGrid (for contact form)
- **Analytics:** Plausible or Vercel Analytics

---

## Project Structure

```
birrulabs-audit/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Bilingual routing
│   │   ├── layout.tsx            # Root layout (Navbar, Footer)
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx        # About
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [slug]/page.tsx   # Project detail
│   │   ├── articles/
│   │   │   ├── page.tsx          # Articles index
│   │   │   └── [slug]/page.tsx   # Article detail
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── startup/page.tsx      # Startup profile
│   │   ├── services/page.tsx     # Services/capabilities
│   │   ├── roadmap/page.tsx      # Roadmap
│   │   ├── research/page.tsx     # Research & experiments
│   │   ├── tech-stack/page.tsx   # Tech stack
│   │   ├── faq/page.tsx          # FAQ
│   │   ├── privacy/page.tsx      # Privacy policy
│   │   ├── terms/page.tsx        # Terms of use
│   │   ├── security/page.tsx     # Security & disclosure
│   │   └── not-found.tsx         # 404 page
│   ├── globals.css               # CSS custom properties, Tailwind
│   ├── robots.ts                 # robots.txt generation
│   └── sitemap.ts                # sitemap.xml generation
├── src/
│   ├── components/               # React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── data/                     # Static data
│   │   ├── projects.ts           # 6 projects
│   │   └── articles.ts           # 2 articles
│   └── lib/
│       └── translations.ts       # Bilingual static translations
├── middleware.ts                 # Security headers
├── tailwind.config.ts            # Tailwind config + design tokens
├── next.config.js                # Next.js config
├── tsconfig.json                 # TypeScript config (strict mode)
├── package.json                  # Dependencies
└── vercel.json                   # Vercel deployment config
```

---

## Data Models

### Project

```typescript
interface Project {
  id: string;
  slug: string;
  title: { id: string; en: string };
  summary: { id: string; en: string };
  description: { id: string; en: string };
  status: 'Internal Alpha' | 'Prototype' | 'In Development' | 'Research';
  category: 'Automation' | 'Business Software' | 'AI Agents' | 'Creative AI' | 'AI Infrastructure';
  techStack: string[];
  features: { id: string; en: string }[];
}
```

**Source:** `src/data/projects.ts`  
**Count:** 6 projects (Affiloom, BirruHealthOS, Social Media AI Manager, Creative Factory, BirruAffHub, AI Agent Orchestration)

### Article

```typescript
interface Article {
  id: string;
  slug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  content: { id: string; en: string };
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;  // ISO 8601
  readingTime: number;  // minutes
  featured?: boolean;
}
```

**Source:** `src/data/articles.ts`  
**Count:** 2 articles (AI agent orchestration, human-in-the-loop)

### Translation

```typescript
interface Translation {
  nav: { home: string; about: string; projects: string; articles: string; contact: string };
  home: { hero_title: string; cta_primary: string; /* ... */ };
  about: { title: string; mission: string; /* ... */ };
  projects: { title: string; all_projects: string; /* ... */ };
  articles: { title: string; read_more: string; /* ... */ };
  contact: { title: string; name: string; email: string; /* ... */ };
  common: { learn_more: string; back: string; /* ... */ };
}
```

**Source:** `src/lib/translations.ts`  
**Locales:** `id` (primary), `en` (secondary)

---

## Routing & i18n

### Dynamic Locale Routing

Next.js 15 `[locale]` segment:

```
/id/about     → Bahasa Indonesia
/en/about     → English
```

**Implementation:**

1. **Root redirect:** `/` → `/id` (middleware)
2. **Locale detection:** No auto-detection, explicit URL prefix
3. **Static params:** `generateStaticParams()` pre-renders both locales

**Code:**

```typescript
// app/[locale]/layout.tsx
export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }];
}
```

### Translation System

**No external library** — static JSON object:

```typescript
// src/lib/translations.ts
export const translations = {
  id: { /* Indonesian */ },
  en: { /* English */ }
};

export function getT(locale: Locale) {
  return translations[locale];
}
```

**Usage:**

```typescript
const t = getT(locale);
return <h1>{t.home.hero_title}</h1>;
```

---

## Security

### Middleware Security Headers

```typescript
// middleware.ts
const headers = {
  'Content-Security-Policy': "default-src 'self'; ...",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
```

### Content Security Policy (CSP)

**Current policy:**
- `default-src 'self'` — only same-origin resources
- `script-src 'self' 'unsafe-inline'` — inline scripts for Next.js
- `style-src 'self' 'unsafe-inline'` — Tailwind inline styles
- `img-src 'self' data: https:` — images from CDN
- `font-src 'self'` — self-hosted fonts

**Future improvements:**
- Remove `'unsafe-inline'` when using external stylesheets
- Add nonce-based script execution

### Input Validation

**Current:** Contact form client-side validation only  
**Future:** Zod schema validation + server-side sanitization

### Dependency Security

- `npm audit` run on every build
- No packages with critical vulnerabilities
- Minimal dependency tree
- Vercel auto-updates security patches

---

## Performance

### Build Metrics

| Metric                  | Value          |
|-------------------------|----------------|
| **Build time**          | ~25s           |
| **Routes generated**    | 26 (SSG)       |
| **First Load JS**       | ~103 KB shared |
| **Middleware size**     | 34.2 KB        |
| **Lighthouse (target)** | 90+ all scores |

### Optimization Strategies

1. **Static Generation:** All pages pre-rendered at build time
2. **Code Splitting:** Automatic per-route splitting
3. **Image Optimization:** Next.js `<Image>` component (when images added)
4. **Font Optimization:** `next/font` for Inter + JetBrains Mono
5. **CSS Purging:** Tailwind purges unused CSS in production

### Lighthouse Targets

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

---

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### Environment Variables

**None required for static site.**  
Future (when form backend added):
- `DATABASE_URL` (Supabase PostgreSQL)
- `SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (email)

### CI/CD Pipeline

1. **Push to `main`** → triggers Vercel build
2. **Vercel:** `npm run build`
3. **Build output:** `.next/` directory
4. **Deploy:** Static assets to CDN
5. **Alias:** `birrulabs-audit.vercel.app` → `birrulabs.biz.id`

### Rollback

Vercel keeps previous deployments — instant rollback via dashboard.

---

**Next:** [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md) for content operations and approval workflows.
