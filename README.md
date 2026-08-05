# BirruLabs Website

**Official website for BirruLabs** — AI product lab building autonomous agent systems, social media automation, affiliate automation, and creative content pipelines.

🌐 **Live:** [birrulabs-audit.vercel.app](https://birrulabs-audit.vercel.app/id)  
📦 **Status:** Production  
🚀 **Version:** 1.0.0

---

## Features

- ✅ **26 bilingual pages** (Indonesian primary, English secondary)
- ✅ **6 projects** with detail pages (Affiloom, BirruHealthOS, Social Media AI Manager, Creative Factory, BirruAffHub, AI Agent Orchestration)
- ✅ **2 articles** with full content (AI agent orchestration, human-in-the-loop)
- ✅ **Dark-first premium design** — mobile-first, accessible
- ✅ **Security-first** — CSP, HSTS, X-Frame-Options, rate limiting
- ✅ **Static generation** (SSG) — all pages pre-rendered at build time
- ✅ **SEO optimized** — sitemap.xml, robots.txt, metadata per page
- ✅ **No fake metrics** — factual status labels only

---

## Pages

| Path                          | Description                                    |
|-------------------------------|------------------------------------------------|
| `/id` & `/en`                 | Home (hero, projects, agent orchestration, CTA)|
| `/about`                      | Mission, values, story, principles             |
| `/projects`                   | 6 projects list + filters                      |
| `/projects/[slug]`            | Individual project detail                      |
| `/articles`                   | Articles index                                 |
| `/articles/[slug]`            | Article detail                                 |
| `/contact`                    | Contact form (UI only, no backend yet)         |
| `/startup`                    | Startup profile (accelerator-ready)            |
| `/services`                   | Services & capabilities                        |
| `/roadmap`                    | Development roadmap                            |
| `/research`                   | Research & experiments                         |
| `/tech-stack`                 | Technology stack                               |
| `/faq`                        | FAQ                                            |
| `/privacy`                    | Privacy policy                                 |
| `/terms`                      | Terms of use                                   |
| `/security`                   | Security & responsible disclosure              |
| `/not-found`                  | 404 page                                       |
| `/sitemap.xml`                | Sitemap (all routes bilingual)                 |
| `/robots.txt`                 | Robots file                                    |

---

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Runtime:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Repository:** GitHub

Full stack details: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

---

## Getting Started

### Prerequisites

- Node.js 18+ (24.x recommended)
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/tantenton/birrulabs-website.git
cd birrulabs-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/id](http://localhost:3000/id)

### Build

```bash
npm run build    # Production build
npm run start    # Serve production build locally
```

---

## Development

### Project Structure

```
birrulabs-website/
├── app/
│   ├── [locale]/              # Bilingual pages (ID/EN)
│   ├── globals.css            # CSS custom properties
│   ├── robots.ts              # robots.txt generation
│   └── sitemap.ts             # sitemap.xml generation
├── src/
│   ├── components/            # React components
│   ├── data/                  # Static data (projects, articles)
│   └── lib/                   # Utilities (translations)
├── middleware.ts              # Security headers
├── tailwind.config.ts         # Design tokens
└── docs/                      # Documentation
```

### Key Commands

```bash
npm run dev         # Dev server (hot reload)
npm run build       # Production build
npm run lint        # ESLint (if configured)
```

### Adding Content

**New project:** Edit `src/data/projects.ts`  
**New article:** Edit `src/data/articles.ts`  
**New page:** Create `app/[locale]/page-name/page.tsx`  
**Translations:** Edit `src/lib/translations.ts`

See [docs/OPERATIONS.md](./docs/OPERATIONS.md) for detailed guides.

---

## Deployment

**Automatic:** Push to `main` → Vercel auto-deploys  
**Manual:** `vercel --prod`

Deployment takes ~1-2 minutes. Vercel keeps deployment history for instant rollback.

---

## Documentation

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) — System architecture, data models, routing
- [OPERATIONS.md](./docs/OPERATIONS.md) — Content updates, deployment, troubleshooting
- [CONTENT_WORKFLOW.md](./docs/CONTENT_WORKFLOW.md) — Content approval workflows (future)

---

## Contributing

This is a private repository for BirruLabs internal use. Not accepting external contributions at this time.

For bug reports or security issues:
- **Security:** security@birrulabs.biz.id
- **General:** Open GitHub issue

---

## License

Proprietary. All rights reserved.

---

## Contact

- **Website:** [birrulabs-audit.vercel.app](https://birrulabs-audit.vercel.app/id)
- **Email:** contact@birrulabs.biz.id
- **Security:** security@birrulabs.biz.id
- **GitHub:** [tantenton/birrulabs-website](https://github.com/tantenton/birrulabs-website)

---

**Built with ❤️ by BirruLabs** — Building in public, no fake metrics.
