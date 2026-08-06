# Redesign Strategy — BirruLabs Website

**Date:** 2026-08-06  
**Based on:** docs/redesign-audit.md  
**Decision:** Rebuild Presentation Layer

---

## Recommendation: Rebuild Presentation Layer

### Definisi

Rebuild presentation layer berarti:
- **Pertahankan:** routing, i18n, data layer, security, CI/CD, deployment config, komponen logic
- **Rebuild:** seluruh visual — layout, typography, spacing, color usage, section design, komponen UI

Ini bukan full rebuild (tidak ubah framework/stack) dan bukan sekadar refactor (visual memang perlu perubahan signifikan).

---

## Alasan Teknis

### Mengapa BUKAN sekadar refactor UI?

1. **Visual terlalu generic.** Homepage saat ini adalah dark card grid dengan indigo/emerald — tampilan yang digunakan ribuan SaaS template. Tidak ada karakter brand yang membedakan BirruLabs.

2. **Typography tidak konsisten.** H1 berbeda size di tiap halaman. Tidak ada type scale yang diterapkan secara sistematis.

3. **Hardcoded colors.** 80%+ class warna di komponen adalah arbitrary values (`bg-[#0F1115]`) bukan Tailwind tokens. Susah di-maintain dan tidak konsisten.

4. **Layout terlalu flat.** Semua section menggunakan pola yang sama: heading + subtitle + card grid. Tidak ada visual rhythm, hierarchy, atau storytelling.

5. **No distinctive moments.** Tidak ada elemen yang membuat user berhenti dan memperhatikan — tidak ada hero yang memorable, tidak ada section yang punya character.

### Mengapa BUKAN full rebuild?

1. **Stack sudah tepat.** Next.js 15 App Router + TypeScript + Tailwind adalah pilihan yang benar untuk 2026.

2. **Architecture sudah bersih.** Routing, component structure, data layer, i18n — semua sudah well-organized.

3. **Security baseline sudah ada.** Middleware dengan security headers, SSG, CSP — semua sudah terpasang.

4. **CI/CD sudah siap.** 4 GitHub Actions workflows yang sudah berfungsi.

5. **SEO infrastructure ada.** sitemap.ts, robots.ts, generateMetadata per halaman — tinggal di-enhance.

6. **Rebuild penuh akan membuang 36 commits kerja yang valid** tanpa keuntungan teknis yang signifikan.

### Mengapa BUKAN rebuild frontend?

Rebuild frontend (ganti framework/stack) tidak justified karena:
- Next.js 15 adalah pilihan terbaik saat ini
- TypeScript + Tailwind sudah proven
- Tidak ada performance issue fundamental
- Team familiarity sudah ada

---

## Scope Rebuild Presentation Layer

### Yang DIBANGUN ULANG (visual only)

| Area | Scope |
|---|---|
| Design tokens | Ekstrak dari Tailwind config ke usage yang konsisten |
| Typography system | Type scale konsisten h1–caption di semua halaman |
| Spacing system | Hapus arbitrary spacing, gunakan Tailwind scale |
| Color usage | Ganti semua arbitrary hex dengan Tailwind tokens |
| Hero section | Rebuild dari mockup Stitch — unique, memorable |
| Navigation | Visual refresh, tidak ubah logic |
| Footer | Visual refresh, tidak ubah structure |
| Card components | Redesign surface dan hierarchy |
| Page layouts | Per-halaman layout yang punya character |
| Section compositions | Visual rhythm dan storytelling |
| Micro-interactions | Subtle, purposeful hover/focus states |
| Mobile layout | Mobile-first dari awal |

### Yang DIPERTAHANKAN (tidak diubah)

| Area | Alasan |
|---|---|
| `app/[locale]/` routing | Functional, benar |
| `src/lib/translations.ts` | i18n system yang bekerja |
| `src/data/projects.ts` | Data produk lengkap |
| `src/data/articles.ts` | Data artikel |
| `middleware.ts` | Security headers |
| `app/sitemap.ts` | SEO |
| `app/robots.ts` | SEO |
| `generateStaticParams()` | SSG requirement |
| `i18n.config.ts` | Locale configuration |
| CI/CD workflows | Infrastruktur |
| Vercel config | Deployment |

### Yang DIHAPUS (tech debt cleanup)

| Item | Alasan |
|---|---|
| `src/lib/i18n.ts` | Dead code — i18next tidak digunakan |
| `public/locales/` | Dead code — tidak diperlukan |
| `tailwind.config.js` | Duplikasi dengan `tailwind.config.ts` |
| Duplicate `skipLibCheck` di tsconfig | Syntax error minor |

### Yang DITAMBAH (enhancement)

| Item | Prioritas |
|---|---|
| OG image (static) | HIGH — social sharing |
| Canonical URL di metadata | HIGH — SEO |
| hreflang tags | HIGH — bilingual SEO |
| Organization structured data | MEDIUM |
| Skip link | MEDIUM — accessibility |
| `images.unoptimized: false` + proper remote config | MEDIUM |
| Tighten CSP (hapus unsafe-eval) | MEDIUM |

---

## Risk Assessment

| Risk | Level | Mitigation |
|---|---|---|
| Break existing routing | LOW | Tidak ubah app/ folder structure |
| Break i18n | LOW | Tidak ubah translations.ts dan i18n.config.ts |
| Break SSG | LOW | Tidak ubah generateStaticParams |
| Visual regression | MEDIUM | Screenshot QA per halaman per breakpoint |
| Performance regression | LOW | Bundle size monitoring, next/image fix |
| Accessibility regression | LOW | axe-core check setelah implementasi |

---

## Implementation Approach

### Branch Strategy
```
main (protected)
  └── redesign/stitch-v1 (working branch)
```

### Tool Pipeline
```
Google Stitch     → visual mockup per halaman
Antigravity       → kode dari mockup
Hermes            → QA, SEO, accessibility, performance
```

### Order of Implementation
1. Design tokens cleanup (tailwind.config.ts)
2. globals.css cleanup
3. Shared components (Navbar, Footer) visual refresh
4. Homepage — paling penting, sets the tone
5. Projects listing + detail
6. Articles listing + detail
7. About, Services, Contact
8. Secondary pages (FAQ, Research, Roadmap, dsb)

---

## Success Criteria

Website dianggap selesai jika:
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 90
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Zero axe-core violations
- Bilingual toggle berfungsi di semua halaman
- Build pass tanpa error
- Preview deployment aktif dan visual konsisten dengan Stitch mockup
- Tidak ada fitur existing yang rusak
