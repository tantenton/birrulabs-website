# Stitch Migration Plan — Homepage

**Date:** 2026-08-06  
**Source:** refined_birrulabs_homepage.html (Stitch output)  
**Target:** app/[locale]/page.tsx + related components  
**Branch:** redesign/stitch-v1  
**Approach:** Rebuild presentation layer only

---

## HTML Analysis Summary

### Design System yang Diekstrak dari Stitch

**Color Tokens:**
```
Background:        #0A0C10  (lebih gelap dari existing #0F1115)
Surface:           #111318
Surface elevated:  #161920  (card background)
Surface container: #1e2024
On-surface:        #e2e2e8  (text primary)
On-surface-variant:#c7c4d7  (text secondary)
Primary:           #c0c1ff  (Stitch palette — GANTI ke #6366F1 indigo)
Secondary:         #4edea3  (emerald)
Brand accent:      #10B981  (emerald — untuk status dan highlights)
Brand CTA:         #6366F1  (indigo — override dari Stitch primary)
Outline-variant:   #464554  (border)
Border card:       rgba(255,255,255,0.06)
```

**Typography Tokens:**
```
headline-xl:       48px / lh 1.1 / ls -0.02em / fw 700  (desktop H1)
headline-xl-mobile:36px / lh 1.1 / fw 700               (mobile H1)
headline-lg:       32px / lh 1.2 / ls -0.01em / fw 600  (section H2)
headline-sm:       24px / lh 1.3 / ls -0.01em / fw 600  (card H3)
body-lg:           18px / lh 1.6 / fw 400               (lead text)
body-md:           16px / lh 1.6 / fw 400               (body)
body-sm:           14px / lh 1.5 / fw 400               (secondary)
code-label:        12px / lh 1 / ls 0.05em / fw 500     (mono caps)
status-label:      11px / lh 1 / fw 400                 (badge text)
Font heading:      Inter
Font mono:         JetBrains Mono
```

**Spacing:**
```
gutter:           24px  (grid gap)
margin-desktop:   48px  (horizontal padding desktop)
margin-mobile:    20px  (horizontal padding mobile)
max-width:        1120px (content container)
```

**Border Radius:**
```
DEFAULT: 2px  (buttons — sharp)
lg:      4px  (cards small)
xl:      8px  (cards large)
full:    12px (pills/badges)
```

---

## Section Inventory

| # | Section ID | Description | Complexity |
|---|---|---|---|
| 1 | `TopNavBar` | Sticky nav — logo, links, lang toggle, CTA | LOW |
| 2 | `Hero` | 2-col: headline + 3D animation placeholder | MEDIUM |
| 3 | `CoreCapabilities` | 3-col cards dengan icon + image | MEDIUM |
| 4 | `FeaturedProjects` | Asymmetric grid: 1 large + 2 small cards | HIGH |
| 5 | `AgentOrchestration` | 2-col: 3D viz + text dengan feature list | MEDIUM |
| 6 | `ClosingCTA` | 2-col card dengan shader background | MEDIUM |
| 7 | `Footer` | 4-col grid — brand, Studio, Lab, Legal | LOW |

**3D Animations di Stitch (SKIP untuk implementasi):**
- `ANIMATION_6` — Three.js icosahedron di Hero
- `ANIMATION_7` — Three.js agent stack di Orchestration
- `ANIMATION_8` — WebGL shader grid di CTA background

→ Semua Three.js/WebGL **tidak diimplementasi**. Diganti dengan static visual yang equivalent: gradient, grid pattern CSS, atau abstract SVG.

---

## Component Mapping

### Komponen BARU yang perlu dibuat

| Component | Path | Source Section | Notes |
|---|---|---|---|
| `HeroSection` | `src/components/home/HeroSection.tsx` | Hero | Replace 3D dengan abstract visual |
| `CapabilityCard` | `src/components/home/CapabilityCard.tsx` | CoreCapabilities | Reusable card |
| `CoreCapabilities` | `src/components/home/CoreCapabilities.tsx` | CoreCapabilities | 3-col grid wrapper |
| `FeaturedProjectsSection` | `src/components/home/FeaturedProjectsSection.tsx` | FeaturedProjects | Async layout grid |
| `ProjectCardLarge` | `src/components/home/ProjectCardLarge.tsx` | FeaturedProjects | 8-col large card |
| `ProjectCardSmall` | `src/components/home/ProjectCardSmall.tsx` | FeaturedProjects | 4-col small card |
| `AgentOrchestration` | `src/components/home/AgentOrchestration.tsx` | AgentOrchestration | Static diagram replace 3D |
| `CTASection` | `src/components/home/CTASection.tsx` | ClosingCTA | CSS grid bg replace shader |
| `StatusBadge` | `src/components/ui/StatusBadge.tsx` | Multiple | Reusable status badge |
| `TechChip` | `src/components/ui/TechChip.tsx` | FeaturedProjects | Tech stack chip |

### Komponen EXISTING yang perlu visual update

| Component | Path | Changes |
|---|---|---|
| `Navbar` | `src/components/Navbar.tsx` | Typography update, spacing, nav item style |
| `Footer` | `src/components/Footer.tsx` | Layout restructure (Studio/Lab/Legal columns) |
| `MobileMenu` | `src/components/MobileMenu.tsx` | Minor visual update |

### Komponen TIDAK DIUBAH

| Component | Reason |
|---|---|
| `LanguageSwitcher` | Logic OK, hanya style minor |
| `Section` | Generic wrapper, keep |
| `ArticleCard` | Not in Stitch scope |
| `ContactForm` | Not in Stitch scope |

---

## File yang Akan Diubah

### Modified (visual update saja)

| File | Scope of Change |
|---|---|
| `tailwind.config.ts` | Update design tokens sesuai Stitch |
| `app/globals.css` | Update CSS vars, tambah utility classes |
| `src/components/Navbar.tsx` | Visual refresh |
| `src/components/Footer.tsx` | Restructure kolom, typography |
| `src/components/MobileMenu.tsx` | Minor style update |
| `app/[locale]/page.tsx` | Rebuild seluruh homepage sections |

### New Files (komponen baru)

| File | Purpose |
|---|---|
| `src/components/home/HeroSection.tsx` | Hero section |
| `src/components/home/CoreCapabilities.tsx` | Capabilities section |
| `src/components/home/CapabilityCard.tsx` | Single capability card |
| `src/components/home/FeaturedProjectsSection.tsx` | Projects section |
| `src/components/home/ProjectCardLarge.tsx` | Large project card (8-col) |
| `src/components/home/ProjectCardSmall.tsx` | Small project card (4-col) |
| `src/components/home/AgentOrchestration.tsx` | Orchestration section |
| `src/components/home/CTASection.tsx` | Closing CTA section |
| `src/components/ui/StatusBadge.tsx` | Reusable status badge |
| `src/components/ui/TechChip.tsx` | Tech stack chip |
| `src/components/home/index.ts` | Barrel export |
| `src/components/ui/index.ts` | Barrel export |

### NOT Touched

| File | Reason |
|---|---|
| `app/[locale]/layout.tsx` | Routing + SSG logic |
| `src/lib/translations.ts` | i18n data |
| `src/lib/i18n.ts` | Config |
| `i18n.config.ts` | Locale config |
| `src/data/projects.ts` | Business data |
| `src/data/articles.ts` | Business data |
| `middleware.ts` | Security headers |
| `app/sitemap.ts` | SEO |
| `app/robots.ts` | SEO |
| `app/layout.tsx` | Root layout |
| All page routes | Routing |
| `next.config.js` | Config |
| `.github/workflows/` | CI/CD |
| `vercel.json` | Deployment |

---

## Design Decisions

### 1. Three.js/WebGL Animations → Static Replacement

Stitch menggunakan Three.js untuk 3 animasi. Tidak diimplementasi karena:
- Bundle size impact (+60-80KB min)
- Performance di mobile
- Tidak ada fallback untuk SSG
- CLS risk

**Replacement strategy:**
- Hero: CSS animated grid dots atau gradient mesh
- Orchestration: Static SVG diagram agent nodes
- CTA: CSS grid pattern via `background-image: repeating-linear-gradient`

### 2. Material Symbols → Lucide React

Stitch pakai Google Material Symbols (CDN). Ganti ke Lucide React karena:
- Sudah terpasang di project (`lucide-react` di package.json)
- Tidak ada CDN dependency
- SSG-compatible
- Tree-shakeable

**Mapping:**
```
smart_toy     → Bot
account_tree  → GitBranch atau Network
draw          → Sparkles
search        → Search
code_blocks   → Code2
fact_check    → CheckSquare
arrow_forward → ArrowRight
build         → Wrench
```

### 3. Stitch Color Tokens → Existing Tailwind Tokens

Stitch menggunakan Material Design 3 color system. Map ke existing Birrulabs tokens:

```
on-surface           → text.primary (#F0F2F5)
on-surface-variant   → text.secondary (#A3A6AC)
surface              → surface.DEFAULT (#0F1115) [update ke #0A0C10]
surface-container    → surface.elevated (#16191F) [update ke #161920]
outline-variant/10   → border.DEFAULT with opacity
primary (Stitch)     → brand.primary (#6366F1) [OVERRIDE — keep indigo]
secondary (Stitch)   → brand.accent (#10B981) [emerald]
```

### 4. Nav Structure

Stitch nav: Projects | Studio | Lab | About  
Existing nav: Home | About | Projects | Articles | Contact

**Decision:** Pertahankan existing nav structure (tidak ubah routing), update visual style saja.

### 5. Footer Columns

Stitch: Brand | Studio | Lab | Legal  
Existing: Brand | Products | Company | Connect

**Decision:** Adopt Stitch column structure (Studio/Lab/Legal) dengan konten dari existing nav links. Tidak ubah href.

---

## Risk Register

| Risk | Level | Mitigation |
|---|---|---|
| Tailwind config update break existing pages | MEDIUM | Test build setelah setiap perubahan token |
| i18n keys hilang dari page.tsx baru | HIGH | Audit semua `t.` calls sebelum replace |
| ProjectCard di halaman /projects ikut berubah | LOW | Hanya ubah `ProjectCardLarge/Small` baru, bukan existing `ProjectCard` |
| 3D animation tidak diganti dengan baik | MEDIUM | Buat placeholder yang clean — lebih baik kosong tapi konsisten |
| Typography scale break existing pages | MEDIUM | Update tailwind.config.ts dengan backward-compatible token names |
| `any` type di ContactForm break TypeScript | LOW | Tidak diubah di sprint ini |
| Mobile layout CLS | LOW | Explicit dimensions di semua image containers |

---

## Constraints yang Tidak Boleh Dilanggar

1. Tidak ubah `app/[locale]/layout.tsx` — routing dan SSG tetap
2. Tidak ubah `src/lib/translations.ts` — semua `t.hero.*`, `t.home.*` harus tetap ada
3. Tidak ubah `generateStaticParams()` di page.tsx
4. Tidak ubah `generateMetadata()` di page.tsx — SEO tidak berubah
5. `page.tsx` tetap Server Component — tidak tambah `'use client'` ke page
6. Semua komponen home baru default Server Component kecuali butuh state/event

---

## Implementation Order

```
Step 1: tailwind.config.ts — update tokens
Step 2: globals.css — update CSS vars + utility classes
Step 3: src/components/ui/StatusBadge.tsx — atom
Step 4: src/components/ui/TechChip.tsx — atom
Step 5: src/components/home/HeroSection.tsx
Step 6: src/components/home/CapabilityCard.tsx
Step 7: src/components/home/CoreCapabilities.tsx
Step 8: src/components/home/ProjectCardLarge.tsx
Step 9: src/components/home/ProjectCardSmall.tsx
Step 10: src/components/home/FeaturedProjectsSection.tsx
Step 11: src/components/home/AgentOrchestration.tsx
Step 12: src/components/home/CTASection.tsx
Step 13: src/components/home/index.ts
Step 14: src/components/ui/index.ts
Step 15: src/components/Navbar.tsx — visual refresh
Step 16: src/components/Footer.tsx — restructure
Step 17: app/[locale]/page.tsx — compose all sections
Step 18: npm run build — verify
```

---

## Acceptance Criteria

- [ ] Build pass (0 errors)
- [ ] Homepage visual konsisten dengan Stitch mockup
- [ ] Mobile (375px) dan desktop (1280px) match
- [ ] Bilingual toggle (ID/EN) masih berfungsi
- [ ] Semua `t.hero.*` dan `t.home.*` translation keys masih dipakai
- [ ] Tidak ada hardcoded text (semua via translation atau static string yang bilingual-safe)
- [ ] Server Components — tidak ada `'use client'` yang tidak diperlukan
- [ ] 0 TypeScript errors baru
- [ ] Tidak ada 3D library baru (Three.js/WebGL tidak diinstall)
