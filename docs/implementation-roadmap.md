# Implementation Roadmap — BirruLabs Website Redesign

**Date:** 2026-08-06  
**Strategy:** Rebuild Presentation Layer  
**Branch:** redesign/stitch-v1  
**Target:** Preview deployment siap untuk human approval

---

## Pipeline Overview

```
Repository Audit
       ↓
  Google Stitch
  (Mockup per halaman — human creates)
       ↓
Human Design Approval
  (User review dan approve mockup)
       ↓
   Antigravity
  (Implementasi mockup ke kode)
       ↓
Hermes Frontend QA
  (Screenshot comparison, visual check)
       ↓
 Accessibility QA
  (axe-core, keyboard nav, screen reader)
       ↓
    SEO QA
  (metadata, OG, hreflang, structured data)
       ↓
 Performance QA
  (Lighthouse, Core Web Vitals, bundle)
       ↓
Preview Deployment
  (Vercel preview URL)
       ↓
Human Approval
  (User review preview)
       ↓
    Merge
  (redesign/stitch-v1 → main)
```

---

## Phase 0 — Pre-Design (DONE)

| Task | Status | Output |
|---|---|---|
| Repository audit | ✓ Done | `docs/redesign-audit.md` |
| Redesign strategy | ✓ Done | `docs/redesign-strategy.md` |
| Stitch design brief | ✓ Done | `docs/stitch-design-brief.md` |
| Implementation roadmap | ✓ Done | `docs/implementation-roadmap.md` |
| Branch `redesign/stitch-v1` | ✓ Done | — |

---

## Phase 1 — Google Stitch (Human Task)

**Owner:** User  
**Tool:** Google Stitch  
**Reference:** `docs/stitch-design-brief.md`

### Deliverables yang dibutuhkan dari Stitch

**Priority 1 (wajib sebelum implementasi dimulai):**
- [ ] Homepage — mobile (375px) + desktop (1280px)
- [ ] Projects listing — mobile + desktop
- [ ] Project detail — mobile + desktop
- [ ] About — mobile + desktop
- [ ] Contact — mobile + desktop

**Priority 2 (bisa paralel dengan implementasi P1):**
- [ ] Articles listing — mobile + desktop
- [ ] Article detail — mobile + desktop
- [ ] Services — mobile + desktop

**Priority 3 (opsional untuk v1):**
- [ ] Startup, Research, Roadmap, Tech Stack, FAQ

### Design Tokens yang harus diekstrak dari Stitch
- Exact hex values untuk semua warna yang digunakan
- Font sizes yang digunakan per elemen
- Spacing values
- Border radius values
- Shadow definitions
- Component states (hover, focus, active, disabled)

### Approval Gate
Hermes tidak akan memulai implementasi sampai user memberikan:
1. Screenshot/export mockup dari Stitch, ATAU
2. Konfirmasi bahwa mockup sudah sesuai brief dan siap diimplementasi

---

## Phase 2 — Antigravity Implementation

**Owner:** Hermes (via Antigravity)  
**Branch:** `redesign/stitch-v1`  
**Prerequisite:** Mockup P1 approved

### Pre-implementation checklist
- [ ] Baca mockup per halaman
- [ ] Ekstrak design tokens dari mockup
- [ ] Update `tailwind.config.ts` dengan tokens baru
- [ ] Update `app/globals.css`
- [ ] Hapus dead code (`src/lib/i18n.ts`, `public/locales/`, `tailwind.config.js`)

### Implementation order

#### Sprint 1 — Foundation (1 session)
```
1. tailwind.config.ts — update design tokens
2. globals.css — cleanup dan update CSS vars
3. app/layout.tsx — root layout (html, body setup)
4. app/[locale]/layout.tsx — Navbar + Footer shell
```

#### Sprint 2 — Shared Components (1 session)
```
5. src/components/Navbar.tsx — visual refresh
6. src/components/Footer.tsx — visual refresh
7. src/components/MobileMenu.tsx — visual refresh
8. src/components/LanguageSwitcher.tsx — visual refresh
```

#### Sprint 3 — Homepage (1 session)
```
9. app/[locale]/page.tsx — full homepage rebuild
   - Hero section
   - What We Build section
   - Featured Projects section
   - How We Work section
   - Agent System section
   - CTA section
```

#### Sprint 4 — Projects (1 session)
```
10. src/components/ProjectCard.tsx — redesign
11. app/[locale]/projects/page.tsx — listing
12. app/[locale]/projects/[slug]/page.tsx — detail
```

#### Sprint 5 — Articles (1 session)
```
13. src/components/ArticleCard.tsx — redesign
14. app/[locale]/articles/page.tsx — listing
15. app/[locale]/articles/[slug]/page.tsx — detail
```

#### Sprint 6 — Key Pages (1 session)
```
16. app/[locale]/about/page.tsx
17. app/[locale]/services/page.tsx
18. app/[locale]/contact/page.tsx — ContactForm redesign
```

#### Sprint 7 — Secondary Pages (1 session)
```
19. app/[locale]/faq/page.tsx
20. app/[locale]/startup/page.tsx
21. app/[locale]/roadmap/page.tsx
22. app/[locale]/research/page.tsx
23. app/[locale]/tech-stack/page.tsx
24. app/[locale]/privacy/page.tsx
25. app/[locale]/terms/page.tsx
26. app/[locale]/security/page.tsx
```

#### Sprint 8 — SEO Enhancement (1 session)
```
27. Add OG image (static, 1200×630)
28. Update generateMetadata per halaman (canonical, OG, Twitter)
29. Add hreflang tags ke layout
30. Add Organization structured data ke root layout
31. Add skip link ke layout
32. Fix images.unoptimized
33. Tighten CSP (hapus unsafe-eval jika memungkinkan)
```

---

## Phase 3 — QA Pipeline

**Owner:** Hermes  
**Branch:** `redesign/stitch-v1`

### 3A — Frontend QA

Per halaman, per breakpoint:

| Halaman | Mobile 375px | Tablet 768px | Desktop 1280px |
|---|---|---|---|
| Homepage | screenshot + compare | screenshot + compare | screenshot + compare |
| Projects listing | screenshot + compare | screenshot + compare | screenshot + compare |
| Project detail | screenshot + compare | — | screenshot + compare |
| About | screenshot + compare | — | screenshot + compare |
| Contact | screenshot + compare | — | screenshot + compare |
| Articles listing | screenshot + compare | — | screenshot + compare |

**Tools:** Playwright screenshot  
**Pass criteria:** Deviasi dari mockup < 8px spacing, layout match, colors match

### 3B — Accessibility QA

```bash
# Automated
npx @axe-core/cli http://localhost:3000/id
npx @axe-core/cli http://localhost:3000/id/projects
npx @axe-core/cli http://localhost:3000/id/contact

# Manual checks
- Tab through semua halaman
- Focus indicator visible di semua interactive elements
- Form label terhubung ke input
- Skip link berfungsi
- Color contrast pass
```

**Pass criteria:** 0 axe-core violations critical/serious

### 3C — SEO QA

Per halaman:
- [ ] `<title>` unique dan ≤ 60 chars
- [ ] `<meta description>` 150-160 chars
- [ ] `<h1>` ada dan unique per halaman
- [ ] Heading hierarchy tidak skip level
- [ ] Canonical URL terpasang
- [ ] OG tags lengkap (title, description, image, url)
- [ ] hreflang `id` dan `en` terpasang
- [ ] Sitemap include semua halaman
- [ ] Structured data valid (Google Rich Results Test)

### 3D — Performance QA

```bash
# Lighthouse
npx lighthouse http://localhost:3000/id \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json

# Bundle analysis
npm run build 2>&1 | grep "First Load JS"
```

**Pass criteria:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- SEO: ≥ 95
- Best Practices: ≥ 90
- LCP: < 2.5s
- CLS: < 0.1
- Bundle First Load JS: < 150KB

### 3E — Build QA

```bash
npm run lint      # 0 errors
npm run type-check # 0 errors
npm run build     # success, 0 errors
```

---

## Phase 4 — Preview Deployment

**Owner:** Hermes  
**Prerequisite:** Semua QA pass

```bash
# Push branch ke GitHub
git push -u origin redesign/stitch-v1

# Vercel preview auto-deploy via GitHub integration
# URL format: https://birrulabs-website-git-redesign-stitch-v1-[team].vercel.app

# Verifikasi preview
curl -I https://[preview-url]
# Expected: 200 OK
```

**Checklist sebelum laporan ke user:**
- [ ] Preview URL accessible
- [ ] Homepage tampil benar
- [ ] Bilingual toggle berfungsi (ID ↔ EN)
- [ ] Mobile layout benar
- [ ] Tidak ada halaman 404 yang tidak disengaja

---

## Phase 5 — Human Approval & Merge

**Owner:** User

User melakukan:
1. Buka preview URL
2. Review semua halaman Priority 1
3. Test di mobile (real device atau browser DevTools)
4. Test bilingual toggle
5. Berikan approval atau feedback

Jika approved:
```bash
# Merge via PR
gh pr create \
  --base main \
  --head redesign/stitch-v1 \
  --title "redesign: BirruLabs website v2 — Stitch visual rebuild" \
  --body "..."

# Setelah merge, Vercel auto-deploy ke production
```

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Mockup tidak sesuai brief | MEDIUM | HIGH | Review brief bersama sebelum Stitch |
| Antigravity break existing logic | LOW | HIGH | Only touch presentation layer, preserve logic |
| i18n rusak setelah implementasi | LOW | HIGH | Test bilingual toggle di setiap sprint |
| Build error setelah implementasi | LOW | MEDIUM | Run build setelah setiap sprint |
| Performance turun | LOW | MEDIUM | Monitor bundle size per sprint |
| Vercel preview gagal deploy | LOW | LOW | Check vercel.json dan environment vars |

---

## Definition of Done

Redesign dianggap selesai jika:
1. ✓ Build pass tanpa error
2. ✓ Lint pass tanpa error baru
3. ✓ Semua halaman P1 visual match dengan Stitch mockup
4. ✓ axe-core: 0 critical/serious violations
5. ✓ Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
6. ✓ Bilingual toggle berfungsi semua halaman
7. ✓ Mobile (375px) dan desktop (1280px) benar
8. ✓ Preview URL aktif
9. ✓ User approve
10. ✓ Merged ke main

---

## Timeline Estimasi

| Phase | Estimasi | Dependency |
|---|---|---|
| Phase 0 (Done) | — | — |
| Phase 1 (Stitch) | 1-3 hari | User |
| Phase 2 Sprint 1-2 | 1 session | Stitch P1 approved |
| Phase 2 Sprint 3 | 1 session | Sprint 1-2 done |
| Phase 2 Sprint 4-5 | 1 session | Sprint 3 done |
| Phase 2 Sprint 6-7 | 1 session | Sprint 4-5 done |
| Phase 2 Sprint 8 | 1 session | Sprint 6-7 done |
| Phase 3 QA | 1 session | Sprint 8 done |
| Phase 4 Preview | 1 session | QA pass |
| Phase 5 Merge | User decision | Preview approved |

**Total engineering sessions:** ~6 sessions setelah Stitch approved
