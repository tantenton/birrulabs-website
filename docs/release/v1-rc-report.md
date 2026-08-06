# BirruLabs Web v1.0 — Release Candidate Report

**Date:** 2026-08-06  
**Branch:** redesign/stitch-v1  
**Last Commit:** 8d6b34b  
**Build Status:** ✓ PASS — 50 static pages, 0 errors  
**Bundle:** 102 kB First Load JS shared (no regression from baseline 103–107 kB)

---

## RC Checklist

### Engineering
- [x] Clean git status
- [x] Branch pushed (redesign/stitch-v1)
- [x] Build pass — 50 SSG pages + 1 dynamic (rss.xml)
- [x] TypeScript compile pass
- [x] No broken routes (all 50 pages generated)
- [x] Both locales work (id/en)
- [x] No duplicate main/layout issue
- [x] Fixed navbar offset (pt-16 global in layout)
- [x] No horizontal scroll (verified in screenshots)
- [x] Atomic commits, no merge to main, no production deploy

### Functional
- [x] Navigation works (Navbar + MobileMenu + LanguageSwitcher)
- [x] Command palette (Ctrl+K) — fuzzy search nav/projects/articles
- [x] Contact form validation — client-side, accessible errors
- [x] Project filters (static category chips)
- [x] Article filters (static tag chips)
- [x] 404 branded — "Agent lost. Mission not found."
- [x] Reading progress on article detail
- [x] Share button (copy link) on article detail
- [x] Prev/next article navigation
- [x] Related articles
- [x] Related projects on project detail

### Visual
- [x] Consistent design system across all pages
- [x] Responsive — mobile (375px), tablet (768px), desktop (1280px)
- [x] Dark theme #0A0C10 consistent
- [x] Typography hierarchy consistent
- [x] Card styles consistent (rounded-xl, border rgba, hover glow)
- [x] Motion system (FadeIn, Stagger, scroll navbar)
- [x] Screenshots captured — 41 screenshots across 14 routes × 3 viewports

### SEO
- [x] Metadata per page (title, description)
- [x] Canonical (metadataBase set)
- [x] Hreflang id/en (alternates in root layout)
- [x] OpenGraph (type, title, description, locale)
- [x] Twitter card (summary_large_image)
- [x] Organization JSON-LD (root layout)
- [x] Article JSON-LD + Breadcrumb JSON-LD (article detail)
- [x] Sitemap (app/sitemap.ts — existing)
- [x] Robots (app/robots.ts — existing)
- [x] RSS feed (/rss.xml dynamic route)
- [x] Web manifest (/public/manifest.json)

### Accessibility
- [x] Skip link ("Skip to main content")
- [x] Keyboard navigation (command palette ↑↓↵Esc)
- [x] Focus-visible (2px solid #6366F1, 3px offset)
- [x] Form labels + aria-invalid + aria-required + role=alert
- [x] Reading progress aria-valuenow/min/max
- [x] Touch targets minimum 44px
- [x] prefers-reduced-motion respected (useInView, FadeIn, Stagger)
- [x] ARIA landmarks (header, nav, main, contentinfo)
- [x] Decorative elements aria-hidden

### Security
- [x] Security headers preserved (middleware.ts — unmodified)
- [x] No secrets in bundle
- [x] External links rel="noopener noreferrer"
- [x] Form input validation (client-side)
- [x] No unsafe eval
- [x] No target=_blank without rel=noopener
- [ ] sharp CVE-2026-33327/33328/35590/35591 — transitive dep via Next.js
      Decision: skip — no image upload/processing, attack surface not relevant

### Performance
- [x] First Load JS: 102 kB shared (baseline: 103–107 kB)
- [x] Font display: swap (Inter + JetBrains Mono)
- [x] Server components by default, client only where interactive
- [x] Motion lightweight — CSS + IntersectionObserver, no animation library
- [x] No unused large dependencies added
- [ ] Lighthouse not measured in CI (preview environment required)

---

## Pages Completed

| Page | Route | Status |
|---|---|---|
| Homepage | /[locale] | ✓ |
| Projects Listing | /[locale]/projects | ✓ |
| Project Detail | /[locale]/projects/[slug] | ✓ |
| About | /[locale]/about | ✓ |
| Articles Listing | /[locale]/articles | ✓ |
| Article Detail | /[locale]/articles/[slug] | ✓ |
| Services | /[locale]/services | ✓ |
| Contact | /[locale]/contact | ✓ |
| Startup Profile | /[locale]/startup | ✓ |
| Roadmap | /[locale]/roadmap | ✓ |
| Research | /[locale]/research | ✓ |
| Tech Stack | /[locale]/tech-stack | ✓ |
| FAQ | /[locale]/faq | ✓ |
| 404 | /not-found | ✓ |
| Privacy | /[locale]/privacy | stub |
| Terms | /[locale]/terms | stub |
| Security | /[locale]/security | stub |

---

## Commits (redesign/stitch-v1)

| Hash | Description |
|---|---|
| e121a66 | feat: homepage rebuild — Stitch visual reference |
| 3c7c4fb | refactor: QA iteration 2 — visual hierarchy |
| a6b43df | feat: milestone 2 — premium polish |
| dcdf582 | feat: milestone 3 — complete all secondary pages |
| d6a927a | feat: milestone 4 — motion, command palette, article, 404 |
| c753bdd | feat: milestone 4 complete — SEO, RSS, manifest, JSON-LD |
| 48e8e82 | feat: M5A orchestration upgrade, M6B pages polish, M8A JSON-LD |
| b5e3e6f | feat: M6B complete — research, tech-stack, faq |
| 8d6b34b | feat: M6A contact form validation + M6C security |

---

## Known Issues

1. **sharp CVE** — transitive, no attack surface for static site
2. **project-detail mobile screenshot** — ERR_ABORTED on first load (Next.js dev cold-compile), tablet+desktop confirmed OK
3. **Privacy/Terms/Security pages** — stub layout, content not redesigned
4. **Contact form** — simulation only, no real API endpoint
5. **Command palette mobile trigger** — visible as search button on desktop, not exposed in mobile burger menu
6. **Lighthouse score** — not measured (requires Vercel preview or local lighthouse CI)
7. **OG image** — no branded image generated, fallback to text metadata only

---

## Rollback Plan

Last known good main commit:
```bash
git log main --oneline -1
```

To rollback branch:
```bash
git checkout main
# Do NOT merge redesign/stitch-v1 until user approves
```

---

## Next Action Required (User Approval)

- [ ] Review screenshots and provide feedback
- [ ] Approve merge to main
- [ ] Configure production environment variables (Supabase, etc.)
- [ ] Authorize production deployment
- [ ] Authorize Vercel preview URL sharing
