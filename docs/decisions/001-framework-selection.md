---
title: "ADR-001: Framework Selection - Next.js 15"
date: 2026-08-04
status: accepted
---

# ADR-001: Framework Selection

## Context
BirruLabs needs a production-ready framework for content-heavy company profile with:
- Strong SEO capabilities
- Fast page loads
- Bilingual content (ID/EN)
- Content management
- Static + dynamic pages
- Easy deployment

## Decision
Use **Next.js 15** with App Router, TypeScript, and Tailwind CSS.

## Rationale

### Strengths
- **SEO:** Built-in metadata, sitemap generation, static generation
- **Performance:** Server components, streaming, automatic code splitting
- **Developer Experience:** TypeScript first-class, great tooling
- **Content:** MDX support, flexible data fetching
- **Deployment:** Vercel native, also works on VPS/Docker
- **Ecosystem:** Mature, well-documented, large community
- **i18n:** Multiple patterns available (middleware, sub-paths)

### Alternatives Considered

**Astro:**
- Pro: Even faster static builds, content-first
- Con: Less flexible for dynamic features, smaller ecosystem

**Nuxt:**
- Pro: Vue ecosystem, good i18n
- Con: Team more familiar with React

**Remix:**
- Pro: Great data loading, progressive enhancement
- Con: Smaller ecosystem, less content tooling

## Consequences

### Positive
- Fast initial build
- Hermes can generate components effectively
- Clear separation: Server vs Client components
- Great Lighthouse scores achievable
- Vercel deployment simple

### Negative
- React Server Components learning curve
- Bundle size larger than Astro for static pages
- Some Next.js specific patterns to learn

### Mitigations
- Use Server Components by default
- Lazy load client components
- Optimize images with next/image
- Monitor bundle size

## Implementation Notes
- App Router (not Pages Router)
- TypeScript strict mode
- Tailwind for styling
- next-intl or custom i18n solution
- Supabase for backend

## References
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Performance Targets](../qa/acceptance-criteria.md)
