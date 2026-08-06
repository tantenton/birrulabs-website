# Stitch Design Brief — BirruLabs Website

**Date:** 2026-08-06  
**For:** Google Stitch  
**Purpose:** Visual source of truth untuk redesign BirruLabs website  
**Branch target:** redesign/stitch-v1

---

## Brand Overview

**Company:** BirruLabs  
**Tagline:** Building practical AI systems that work beyond the demo  
**Domain:** birrulabs.biz.id  
**Type:** AI automation studio + startup builder

---

## Brand Personality

| Trait | Description |
|---|---|
| **Confident** | Tahu apa yang dibangun, tidak over-promise |
| **Technical** | Bicara ke developer dan decision maker yang tech-savvy |
| **Builders** | Bukan konsultan — kita build dan ship |
| **Pragmatic** | AI yang bekerja di production, bukan hanya demo |
| **Subtle premium** | Tidak glamor, tidak noisy — presisi dan craft |

**Voice:** Direct, precise, no fluff. Seperti Linear atau Vercel — tapi lebih personal.  
**Anti-pattern:** Generic AI startup vibe (rocket emojis, "revolutionize", hero dengan robot 3D). Bukan agensi digital murahan.

---

## Target Audience

### Primary
- **Startup founders** yang butuh AI automation untuk produk mereka
- **Tech leads / CTOs** yang evaluasi partnership atau vendor
- **Investor/accelerator** yang review startup profile

### Secondary
- **Developer** yang ingin tau stack dan approach BirruLabs
- **Calon klien** yang butuh custom AI automation

### User Mental Model
User datang ke site ini dengan pertanyaan: *"Siapa BirruLabs, apa yang sudah mereka build, dan bisakah mereka dipercaya?"*

---

## Sitemap

```
/ (redirect ke /id)

/id (atau /en)
  ├── / — Homepage
  ├── /about — Tentang BirruLabs
  ├── /projects — Daftar produk/proyek
  │   └── /projects/[slug] — Detail proyek
  ├── /articles — Blog / knowledge hub
  │   └── /articles/[slug] — Detail artikel
  ├── /services — Layanan
  ├── /startup — Startup profile (untuk program aplikasi)
  ├── /roadmap — Roadmap publik
  ├── /research — Research area
  ├── /tech-stack — Stack yang digunakan
  ├── /contact — Kontak / lead gen form
  ├── /faq — FAQ
  ├── /privacy — Privacy policy
  ├── /terms — Terms of service
  └── /security — Security disclosure
```

**Priority halaman untuk Stitch:** Homepage, Projects, About, Services, Contact, Articles.

---

## User Journey

### Journey 1: Startup founder evaluasi BirruLabs
```
Temukan via Google/Twitter
→ Landing di Homepage
→ Scroll: lihat produk yang sudah dibangun
→ Klik Projects → lihat detail
→ Klik About → cek tim dan pendekatan
→ Klik Contact → kirim inquiry
```

### Journey 2: Developer curious tentang stack
```
Landing di Homepage
→ Lihat tech stack di homepage atau /tech-stack
→ Baca artikel di /articles
→ Follow di GitHub/Twitter
```

### Journey 3: Investor evaluasi
```
Landing di Homepage
→ /startup → startup profile lengkap
→ /projects → portfolio produk
→ /about → tim dan visi
→ Contact untuk meeting
```

---

## Visual Direction

### Aesthetic
**Reference:** Linear.app, Vercel.com, Raycast.com — dark-first, sharp, purposeful.  
**NOT:** Glassmorphism berat, gradient acak, neon glow berlebihan, template Bootstrap.

### Dark-First Theme
- Background utama: sangat gelap, hampir hitam (bukan hitam murni — ada depth)
- Tidak ada light mode untuk v1
- Surface hierarchy: base → elevated → inset
- Kontras yang jelas antar surface level

### Accent Color System
- **Primary:** Indigo (#6366F1) — brand color, CTA, links aktif
- **Accent:** Emerald (#10B981) — status positif, highlights, "building in public" marker
- **Neutral:** Gray spectrum untuk text dan borders
- **Semantic:** Amber (warning), Red (danger)

### Visual Moments
Setiap halaman harus punya satu "wow moment" — elemen yang memorable:
- Homepage: hero yang kuat dengan visual tension
- Projects: project card yang menampilkan status dan tech stack dengan cara yang menarik
- About: timeline atau visualisasi yang personal
- Contact: form yang clean dan tidak intimidating

---

## Typography

### Font Stack
- **Heading:** Inter (weight: 700, 600) — tight tracking
- **Body:** Inter (weight: 400, 500) — relaxed line height
- **Mono:** JetBrains Mono — untuk code, tech labels, status badges

### Type Scale (apply consistently)
```
Display:  64px / line-height 1.05 / weight 700 / tracking -0.02em
H1:       48px / line-height 1.1  / weight 700 / tracking -0.015em
H2:       32px / line-height 1.2  / weight 600 / tracking -0.01em
H3:       24px / line-height 1.3  / weight 600
H4:       20px / line-height 1.4  / weight 600
Body LG:  18px / line-height 1.6  / weight 400
Body:     16px / line-height 1.6  / weight 400
Body SM:  14px / line-height 1.5  / weight 400
Caption:  12px / line-height 1.4  / weight 500 / tracking 0.02em
Mono:     14px / JetBrains Mono   / weight 400
```

---

## Colors

### Surface Palette
```
surface-base:     #0A0C10  ← slightly darker than current
surface-elevated: #0F1215
surface-inset:    #161920
surface-overlay:  #1C2028
```

### Brand Palette
```
brand-primary:       #6366F1  (indigo-500)
brand-primary-hover: #4F46E5  (indigo-600)
brand-accent:        #10B981  (emerald-500)
brand-accent-dim:    rgba(16, 185, 129, 0.15)
```

### Text Palette
```
text-primary:   #F1F3F6
text-secondary: #9BA0A8
text-tertiary:  #5C6068
text-disabled:  #363940
```

### Border Palette
```
border-subtle:  rgba(255,255,255,0.06)
border-default: rgba(255,255,255,0.10)
border-strong:  rgba(255,255,255,0.16)
border-focus:   #6366F1
```

### Status Colors (for badges)
```
status-alpha:       emerald tint
status-prototype:   amber tint
status-development: blue tint
status-research:    purple tint
status-pilot:       orange tint
```

---

## Spacing

Base unit: **4px**

```
space-1:  4px
space-2:  8px
space-3:  12px
space-4:  16px
space-5:  20px
space-6:  24px
space-8:  32px
space-10: 40px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
space-32: 128px
```

Section vertical padding: **80–96px desktop**, **48–64px mobile**

---

## Grid & Layout

### Desktop (1280px+)
- Max content width: **1120px**
- Horizontal padding: **32px**
- 12-column grid
- Sidebar layout: 8 + 4 col

### Tablet (768–1279px)
- Max content width: **100%**
- Horizontal padding: **24px**
- 8-column grid

### Mobile (375–767px)
- Single column
- Horizontal padding: **16px**
- Full-width CTAs

---

## Motion & Animation

### Principles
- Subtle dan purposeful — bukan dekoratif
- Tidak ada infinite animation kecuali untuk status indicator
- Respect `prefers-reduced-motion`

### Timing
```
fast:   150ms ease-out  (hover states, small transitions)
normal: 250ms ease-out  (component transitions)
slow:   400ms ease-out  (page-level transitions)
```

### Patterns
- Fade + slide-up untuk element masuk ke viewport
- Subtle scale (1.0 → 1.02) pada card hover
- Background color transition pada button hover
- Border glow pada input focus

---

## Interaction Design

### Hover States
- Card: subtle border brightening + background elevation
- Link: color transition ke primary
- Button primary: background darken
- Button ghost: background appear

### Focus States
- 2px solid `brand-primary` outline
- outline-offset: 2px
- Visible di dark background

### Loading States
- Skeleton loader untuk async content
- Tidak ada spinner untuk page navigation (SSG — instant)

### Empty States
- Descriptive, tidak hanya "No data"
- Include guidance dan action

---

## Components (per halaman)

### Global Components
```
Navbar
  - Logo: "Birru" + "Labs" (accent color)
  - Nav links: 5 items
  - Language switcher: ID/EN toggle
  - CTA button: "Hubungi" / "Contact Us"
  - Mobile: hamburger → fullscreen menu
  - Behavior: sticky, backdrop blur

Footer
  - Brand + tagline + social links (GitHub, Twitter)
  - Products column
  - Company column
  - Legal links
  - Copyright
```

### Homepage Sections
```
1. Hero
   - Badge: "Building in public"
   - Headline: max 2 baris, bold, large
   - Subheadline: 1-2 kalimat, secondary color
   - CTA: primary (Projects) + secondary (Contact)
   - Visual element: subtle grid/noise texture atau animated dots

2. What We Build (3 cards)
   - AI Agents, Automation, Creative AI
   - Icon + title + description
   - Subtle hover state

3. Featured Projects (3 cards)
   - Project name + status badge + summary
   - Tech stack chips
   - Link ke detail

4. How We Work (process steps)
   - 4 langkah: Research, Design, Build, Ship
   - Numbered atau timeline format

5. Agent System (visual)
   - Highlight bahwa BirruLabs menggunakan AI agents sendiri untuk build
   - Daftar agent roles

6. CTA Section
   - Headline + subheadline
   - Contact button

7. Footer
```

### Project Card
```
- Status badge (color-coded)
- Project name (bold)
- Summary (2 lines max)
- Category tag
- Tech stack chips (3-4 max, "+N more")
- "View project" link
```

### Article Card
```
- Date
- Title
- Excerpt (2 lines)
- Reading time
- Tag/category
```

---

## Sections per Halaman (Stitch Priority)

### Priority 1 (wajib di Stitch)
1. **Homepage** — full page, all sections
2. **Projects listing** — grid layout
3. **Project detail** — single project page
4. **About** — company story + values
5. **Contact** — form page

### Priority 2 (buat setelah P1 approved)
6. **Articles listing**
7. **Article detail**
8. **Services**

### Priority 3 (bisa skip untuk v1)
9. Startup, Research, Roadmap, Tech Stack, FAQ

---

## Mobile Behavior

- Navigation: hamburger → fullscreen overlay dengan links besar
- Hero: headline tetap besar (min 36px), CTA full-width
- Cards: single column, full-width
- Footer: stack semua kolom
- Touch targets: minimum 44×44px semua interactive elements
- No horizontal scroll

---

## Desktop Behavior

- Navigation: horizontal dengan CTA button
- Hero: two-column atau centered dengan visual element di kanan/background
- Cards: 3-column grid
- Footer: 4-column grid
- Hover states aktif
- Animations smooth

---

## Accessibility Requirements

- Contrast ratio: minimum 4.5:1 untuk body text, 3:1 untuk large text
- All interactive elements keyboard-accessible
- Focus indicator visible dan jelas
- Alt text untuk semua gambar (meaningful, bukan decorative filler)
- Form labels terhubung ke input
- Status badge tidak hanya warna — harus ada teks
- Heading hierarchy: H1 → H2 → H3 (tidak skip level)

---

## SEO Requirements

- Unique `<title>` format: `[Page] — BirruLabs`
- Meta description: 150-160 karakter per halaman
- OG image: 1200×630px, branded
- hreflang: `id` dan `en` di semua halaman
- Canonical URL di semua halaman
- H1 mengandung primary keyword
- Internal linking dari homepage ke semua halaman utama

---

## Notes untuk Stitch

1. **Buat mockup mobile (375px) DAN desktop (1280px)** untuk setiap halaman Priority 1.
2. **Export design tokens** yang digunakan (warna exact, font size, spacing).
3. **Annotate interactive states** — hover, focus, active untuk komponen utama.
4. **Jangan generate template AI generik** — setiap section harus punya karakter.
5. **Referensi visual:** Linear.app untuk kejelasan, Vercel.com untuk premium feel, Raycast.com untuk builder culture.
