# BirruLabs Official Website

Production-ready company profile for BirruLabs — AI product lab building autonomous agent systems, social media automation, affiliate automation, and creative content pipelines.

## Project Overview

**Domain:** birrulabs.biz.id  
**Stack:** Next.js 15, TypeScript, Tailwind CSS, PostgreSQL/Supabase  
**Languages:** Indonesian (primary), English (secondary)  
**Purpose:** Official web presence, startup program applications, partnership showcase, content hub

## What is BirruLabs?

BirruLabs is a studio building practical AI systems that work beyond the demo:

- **Autonomous AI Agents:** Multi-agent orchestration with CEO, research, creative, QC, and publishing agents
- **Social Media Automation:** Research, content planning, writing, approval, engagement, publishing
- **Affiliate Systems:** Product-content workflow automation (Affiloom, BirruAffHub)
- **Creative Factory:** Image, video, voice-over generation with QC pipeline
- **Local-First Software:** Business tools that work offline (BirruHealthOS)
- **Experimental Products:** OVC (Offline Viral Clipper), ClipPilot AI, browser-based computer-use workflows

## Project Status

**Phase:** Discovery → Build  
**Agents:** 12 specialist agents working in parallel  
**Architecture:** Multi-agent orchestrated by Hermes CEO

### Agent Progress
- ✓ Product Strategist (spawned)
- ✓ Information Architect (spawned)
- ✓ UX/UI Designer (spawned)
- ✓ Technical Writer (spawned)
- ✓ Automation Engineer (spawned)
- ✓ DevOps Engineer (spawned)
- ✓ SEO Specialist (spawned)
- ✓ Security Engineer (spawned)
- ✓ Content Writer (spawned)
- ✓ Frontend Engineer (spawned)
- ✓ Backend Engineer (spawned)
- ✓ QA Engineer (spawned)

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Test
npm test

# Lint
npm run lint
```

## Environment Setup

```bash
cp .env.example .env.local
# Configure:
# - DATABASE_URL
# - NEXT_PUBLIC_SITE_URL
# - API keys as needed
```

## Project Structure

```
birrulabs-website/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/             # Utilities, DB client
├── public/          # Static assets
├── content/         # Content source (ID/EN)
├── docs/            # Architecture, strategy, security
├── automation/      # Content pipeline
├── migrations/      # Database migrations
└── tests/           # Test suites
```

## Features

### Core Pages
- Home: Hero, projects, capabilities, latest articles
- About: Company story, mission, team
- Products/Projects: Portfolio with project details
- Blog/Insights: Articles, case studies, build updates
- Startup Profile: Accelerator-ready company profile
- Contact: Inquiry form with spam protection

### Technical Features
- Mobile-first responsive design
- Dark/light adaptive theme
- Bilingual content (ID/EN)
- SEO optimized (meta, schema, sitemap)
- Content management with approval workflow
- Security hardened (CSP, rate limiting, CSRF)
- Lighthouse performance 90+
- Accessibility WCAG AA

## Content Automation

Automated article pipeline with:
- Research & topic selection
- Draft generation with fact-check
- Duplicate detection
- SEO optimization
- Human approval queue
- Scheduled publishing

**Default:** `auto_publish=false`, `approval_required=true`

## Security

- HTTPS only with HSTS
- Content Security Policy enforced
- Rate limiting on forms
- Input validation server-side
- CSRF protection
- Dependency scanning
- No secrets in repository
- Admin authentication required

See: [docs/security/](docs/security/)

## SEO Strategy

- Unique meta per page
- Schema.org markup (Organization, Article, BreadcrumbList)
- Sitemap XML with article feed
- Open Graph + Twitter Card
- Canonical URLs + hreflang
- Semantic HTML structure

See: [docs/seo/](docs/seo/)

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Self-Hosted
```bash
docker-compose up -d
```

See: [docs/deployment/](docs/deployment/)

## Quality Targets

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- Mobile viewport: Perfect

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Brand Principles

- Modern, intelligent, experimental
- Human-centered, trusted, practical
- Founder-led, AI-native
- Concrete over jargon
- Evidence over claims

## Contact

- Website: https://birrulabs.biz.id
- GitHub: [@tantenton](https://github.com/tantenton)

## License

Proprietary — BirruLabs © 2026

---

**Built with:** 12 parallel AI agents orchestrated by Hermes  
**Started:** 2026-08-04  
**Status:** Active Development
