# Redesign Audit — BirruLabs Website

**Date:** 2026-08-06  
**Auditor:** Hermes  
**Branch:** main  
**Commit:** 4550249  
**Build Status:** ✓ PASS (49 static pages, 0 errors)

---

## 1. Framework & Stack

| Item | Value |
|---|---|
| Framework | Next.js 15.5.22 |
| Router | App Router (`app/[locale]/`) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Fonts | Inter, JetBrains Mono (via next/font/google) |
| i18n | Custom static translations (`src/lib/translations.ts`) |
| Database | Supabase (connected, not actively used in frontend) |
| Deployment | Vercel (vercel.json present) |
| Node version | 22 |

**Assessment:** Stack solid. Next.js 15 App Router — modern dan maintainable.

---

## 2. Project Structure

```
app/
  [locale]/          ← App Router dengan locale segment
    layout.tsx       ← Navbar + Footer wrapper
    page.tsx         ← Homepage
    about/, articles/, contact/, faq/
    projects/[slug]/ ← Dynamic project pages
    articles/[slug]/ ← Dynamic article pages
    research/, roadmap/, security/, services/
    startup/, tech-stack/, terms/, privacy/
  globals.css
  layout.tsx         ← Root layout (html/body)
  robots.ts
  sitemap.ts

src/
  components/        ← Reusable components
    Navbar.tsx, Footer.tsx, MobileMenu.tsx
    LanguageSwitcher.tsx, ArticleCard.tsx
    ProjectCard.tsx, ContactForm.tsx, Section.tsx
  data/
    projects.ts      ← Static project data (typed)
    articles.ts      ← Static article data
  lib/
    i18n.ts          ← i18next config (unused at runtime)
    translations.ts  ← Static bilingual translations
    fonts.ts         ← Font config
  types/
    project.ts, article.ts

content/
  en/, id/           ← Markdown content files
  (not actively used — data comes from src/data/)
```

**Issues:**
- `src/lib/i18n.ts` menggunakan i18next dengan HttpBackend — ini adalah **dead code**. Runtime i18n sepenuhnya dari `src/lib/translations.ts` (static object).
- `content/` folder ada tapi tidak digunakan — halaman article masih hardcoded dari `src/data/articles.ts`.
- `public/locales/` ada (untuk i18next) tapi tidak diperlukan.
- Duplikasi konfigurasi: `tailwind.config.js` dan `tailwind.config.ts` keduanya ada.

---

## 3. Routing

- URL pattern: `/{locale}/{page}` (e.g., `/id/about`, `/en/projects`)
- Default locale: `id` (Indonesia)
- `generateStaticParams()` di setiap halaman untuk SSG
- Middleware: locale detection + redirect dari `/` ke `/{defaultLocale}` (via i18n.config.ts)
- Redirects: `/blog` → `/articles`, `/portfolio` → `/projects`

**Issues:**
- Tidak ada redirect dari `/` ke `/id` — user yang akses root URL akan mendapat 404 atau not-found
- `i18n.config.ts` di root folder tapi logikanya ada di middleware — membingungkan

---

## 4. Component Architecture

| Component | Type | Quality |
|---|---|---|
| Navbar | Client | ✓ Good — sticky, keyboard-accessible, aria-label |
| Footer | Server | ✓ Good — grid layout, social links dengan aria-label |
| MobileMenu | Client | ✓ Good — accessible, aria-expanded |
| LanguageSwitcher | Client | ✓ Functional |
| ArticleCard | Server | ✓ Clean |
| ProjectCard | Server | ✓ Clean |
| ContactForm | Client | Needs review — `any` type ditemukan |
| Section | Server | ✓ Good — wrapper component |

**Assessment:** Component architecture bersih dan modular. Semua di `src/components/` dan dieksport via barrel `index.ts`.

---

## 5. Styling & Design System

### Design Tokens (Tailwind config)

```
Surface:  #0F1115 (base), #16191F (elevated), #1A1D23 (inset)
Brand:    #6366F1 (primary/indigo), #10B981 (accent/emerald)
Text:     #F0F2F5 (primary), #A3A6AC (secondary), #6C6F75 (tertiary)
Border:   #2D3036 (default), #6366F1 (focus)
Semantic: #F59E0B (warning), #EF4444 (danger)
```

**Strengths:**
- Design system terdefinisi di Tailwind config — konsisten
- CSS custom properties di globals.css sebagai mirror
- Dark-first (bukan dark mode toggle) — konsisten
- `prefers-reduced-motion` support terpasang
- `focus-visible` terdefinisi global

**Issues:**
- Banyak hardcode hex di komponen (e.g., `bg-[#0F1115]`, `text-[#A3A6AC]`) — tidak menggunakan Tailwind tokens
- Tidak ada `@layer components` untuk reusable patterns
- Typography scale tidak konsisten — beberapa halaman pakai `text-4xl`, yang lain `text-3xl` untuk H1
- Spacing arbitrary ditemukan di beberapa halaman

---

## 6. Design Consistency

**Main (branch main):**
- Dark theme konsisten
- Hero section: gradient overlay indigo/emerald — cukup generic
- Card pattern: `bg-[#16191F] border border-[#2D3036]` — konsisten tapi flat
- CTA: indigo button — konsisten

**Branch `feat/ui-redesign-antigravity`:**
- Glassmorphism aesthetic
- Interactive multi-agent widget
- Lebih experimental, belum production-ready

**Branch `feat/editorial-product-lab-redesign`:**
- "Design Bible" approach
- Most recent commit di branch ini

**Assessment:** Main branch adalah yang paling stabil. Visual saat ini functional tapi terasa seperti dark-mode SaaS template generik. Tidak memiliki karakter brand yang kuat.

---

## 7. SEO

| Item | Status |
|---|---|
| `<title>` per halaman | ✓ Ada via generateMetadata |
| `<meta description>` | ⚠ Beberapa halaman pakai translation string yang terlalu pendek |
| Open Graph | ✗ Tidak ada OG image |
| Twitter Card | ✗ Tidak ada |
| sitemap.xml | ✓ Ada (`app/sitemap.ts`) |
| robots.txt | ✓ Ada (`app/robots.ts`) |
| Canonical URL | ✗ Tidak ada |
| Structured data | ✗ Tidak ada (Organization, WebSite schema) |
| hreflang | ✗ Tidak ada bilingual hreflang tags |
| Heading hierarchy | ⚠ Perlu audit per halaman |

**Issues:**
- URL struktur `/id/page` tidak ideal untuk SEO — mesin pencari prefer `/page` atau subdomain
- Tidak ada OG image = social sharing terlihat buruk
- Tidak ada structured data

---

## 8. Accessibility

| Item | Status |
|---|---|
| `focus-visible` global | ✓ Terpasang |
| `aria-label` di Navbar | ✓ Ada |
| `aria-current="page"` | ✓ Ada di nav links |
| `aria-label` social links Footer | ✓ Ada |
| `aria-hidden` pada icons | ✓ Ada |
| `prefers-reduced-motion` | ✓ Ada di globals.css |
| Alt text gambar | ⚠ Beberapa gambar menggunakan Unsplash/Picsum tanpa meaningful alt |
| Form label | ⚠ ContactForm perlu diaudit |
| Skip link | ✗ Tidak ada |
| Contrast ratio | ⚠ `#A3A6AC` on `#0F1115` = ~5.5:1 (pass AA), tapi tertiary text `#6C6F75` perlu cek |
| ARIA landmarks | ⚠ `<main>` ada, tapi tidak ada `<nav aria-label>` di semua halaman |

---

## 9. Security

| Item | Status |
|---|---|
| CSP header | ✓ Terpasang via middleware |
| X-Frame-Options: DENY | ✓ |
| X-Content-Type-Options | ✓ |
| Referrer-Policy | ✓ |
| Permissions-Policy | ✓ |
| HTTPS enforcement | ✓ (via Vercel) |
| Secrets di kode | ✓ Tidak ada — .env.example ada |
| `unsafe-inline` di CSP | ⚠ Script-src menggunakan `unsafe-inline` dan `unsafe-eval` — perlu di-tighten |

**Assessment:** Security baseline baik. CSP ada tapi terlalu permissive (`unsafe-eval`).

---

## 10. Performance

| Item | Status |
|---|---|
| next/image | ⚠ Images pakai `unoptimized: true` — tidak ada optimasi |
| next/font | ✓ Inter dan JetBrains Mono via next/font |
| font-display: swap | ✓ |
| SSG | ✓ Semua halaman static (`generateStaticParams`) |
| Bundle size First Load JS | 102–107 kB per route — acceptable |
| Code splitting | ✓ Next.js default |
| CLS prevention | ⚠ Images tanpa explicit dimensions |

**Issues:**
- `images.unoptimized: true` di next.config.js — ini menghilangkan Next.js image optimization. Kemungkinan dipasang untuk Vercel deploy compatibility dengan external images, tapi sebaiknya dihapus dan gunakan `domains` atau `remotePatterns`.

---

## 11. CI/CD & Deployment

| Item | Status |
|---|---|
| GitHub Actions | ✓ 4 workflows: ci.yml, deploy.yml, pr-check.yml, release.yml |
| Vercel integration | ✓ vercel.json ada |
| Branch protection | ⚠ Tidak ada PR requirement di main terlihat dari 2 branch yang belum di-merge |
| Node version | ✓ 20 di CI |

---

## 12. Technical Debt

### HIGH
1. **`images.unoptimized: true`** — menghilangkan image optimization
2. **Dead code: `src/lib/i18n.ts`** — i18next setup tidak digunakan
3. **Dead code: `public/locales/`** — tidak diperlukan
4. **Duplikasi config: `tailwind.config.js` + `tailwind.config.ts`**
5. **`tsconfig.json` duplikasi key** (`skipLibCheck` dua kali)
6. **`content/` folder tidak digunakan** — misleading, perlu dihapus atau diintegrasikan

### MEDIUM
7. **Hardcoded hex colors** di komponen — tidak menggunakan Tailwind tokens
8. **Typography tidak konsisten** antar halaman
9. **`unsafe-eval` di CSP** — perlu di-tighten
10. **Tidak ada canonical URL** di metadata
11. **Tidak ada hreflang** untuk bilingual SEO
12. **`any` type** di ContactForm

### LOW
13. **`console.log`** ditemukan di Footer dan ContactForm
14. **No skip link** untuk keyboard/screen reader navigation
15. **No OG image** untuk social sharing
16. **No structured data** (Organization schema)

---

## 13. Protected Functionality (WAJIB DIPERTAHANKAN)

Daftar berikut TIDAK boleh diubah tanpa alasan eksplisit:

1. **Routing structure** — `app/[locale]/` pattern dan semua routes yang ada
2. **i18n mechanism** — `src/lib/translations.ts` static translation system
3. **`i18n.config.ts`** — locale list dan defaultLocale
4. **Project data** — `src/data/projects.ts` (6 projects dengan data lengkap)
5. **Article data** — `src/data/articles.ts`
6. **Middleware security headers** — CSP, X-Frame-Options, dsb
7. **`app/sitemap.ts`** dan `app/robots.ts`
8. **`generateStaticParams()`** di setiap halaman — diperlukan untuk SSG
9. **CI/CD workflows** di `.github/workflows/`
10. **Vercel config** — `vercel.json`
11. **Environment variable structure** — `.env.local.example`

---

## 14. Reusable Components (BISA DIPAKAI ULANG)

Semua komponen di bawah sudah production-ready dan hanya perlu visual update:

- `Navbar.tsx` — logic sudah bagus, hanya perlu visual refresh
- `Footer.tsx` — struktur bagus, hanya perlu visual refresh
- `MobileMenu.tsx` — accessibility sudah bagus
- `LanguageSwitcher.tsx` — functional, mungkin perlu redesign UI
- `Section.tsx` — wrapper generic, pertahankan
- `ArticleCard.tsx` — structure bagus
- `ProjectCard.tsx` — structure bagus

---

## Summary Score

| Dimension | Score | Notes |
|---|---|---|
| Framework/Stack | 9/10 | Modern, solid |
| Architecture | 8/10 | Bersih, modular |
| Design/Visual | 5/10 | Generic dark SaaS template |
| SEO | 5/10 | Missing OG, structured data, hreflang |
| Accessibility | 7/10 | Baseline bagus, beberapa gap |
| Security | 8/10 | Bagus, CSP perlu di-tighten |
| Performance | 6/10 | SSG bagus, image optimization disabled |
| Code Quality | 7/10 | Ada dead code dan tech debt medium |
| **Overall** | **6.9/10** | **Good foundation, needs visual & SEO work** |
