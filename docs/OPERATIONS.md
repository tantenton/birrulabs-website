# BirruLabs Website Operations Guide

**Version:** 1.0.0  
**Last Updated:** 2026-08-05

## Table of Contents

1. [Local Development](#local-development)
2. [Content Updates](#content-updates)
3. [Deployment](#deployment)
4. [Monitoring](#monitoring)
5. [Troubleshooting](#troubleshooting)
6. [Maintenance](#maintenance)

---

## Local Development

### Prerequisites

- Node.js 18+ (24.x recommended)
- npm 9+
- Git

### Setup

```bash
# Clone repository
git clone https://github.com/tantenton/birrulabs-website.git
cd birrulabs-website

# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000/id
```

### Common Commands

```bash
npm run dev          # Development server (hot reload)
npm run build        # Production build
npm run start        # Serve production build locally
npm run lint         # ESLint check
npm run type-check   # TypeScript check (if script exists)
```

### Project Structure Quick Reference

```
app/[locale]/         → Pages (bilingual routing)
src/components/       → React components
src/data/             → Static data (projects, articles)
src/lib/              → Utilities (translations)
middleware.ts         → Security headers
tailwind.config.ts    → Design tokens
```

---

## Content Updates

### Adding a New Project

**File:** `src/data/projects.ts`

```typescript
{
  id: '7',
  slug: 'new-project',
  title: {
    id: 'Nama Proyek',
    en: 'Project Name',
  },
  summary: {
    id: 'Ringkasan singkat (1 kalimat)',
    en: 'Brief summary (1 sentence)',
  },
  description: {
    id: 'Deskripsi lengkap (2-3 paragraf)',
    en: 'Full description (2-3 paragraphs)',
  },
  status: 'In Development',  // 'Internal Alpha' | 'Prototype' | 'In Development' | 'Research'
  category: 'AI Agents',     // 'Automation' | 'Business Software' | 'AI Agents' | 'Creative AI' | 'AI Infrastructure'
  techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
  features: [
    {
      id: 'Fitur 1 dalam bahasa Indonesia',
      en: 'Feature 1 in English',
    },
    // ... more features
  ],
}
```

**Steps:**
1. Add entry to `PROJECTS` array
2. Run `npm run build` to verify
3. Commit: `git commit -m "content: add new-project"`
4. Push: `git push origin main` (auto-deploys)

### Adding a New Article

**File:** `src/data/articles.ts`

```typescript
{
  id: '3',
  slug: 'article-slug',
  title: {
    id: 'Judul Artikel',
    en: 'Article Title',
  },
  excerpt: {
    id: 'Ringkasan 1-2 kalimat',
    en: 'Summary 1-2 sentences',
  },
  content: {
    id: `# Judul Artikel\n\nKonten penuh dalam markdown.\n\n## Subjudul\n\nParagraf...`,
    en: `# Article Title\n\nFull content in markdown.\n\n## Subheading\n\nParagraph...`,
  },
  author: 'BirruLabs Team',
  category: 'AI Agents',
  tags: ['tag1', 'tag2', 'tag3'],
  publishedAt: '2026-08-05',
  readingTime: 8,  // minutes
  featured: false,
}
```

**Steps:**
1. Add entry to `ARTICLES` array
2. Update `articleSlugs` in `app/sitemap.ts`
3. Build and verify
4. Commit and push

### Updating Translations

**File:** `src/lib/translations.ts`

Add new keys to both `id` and `en` objects:

```typescript
export const translations = {
  id: {
    // ... existing keys
    new_section: {
      title: 'Judul Baru',
      subtitle: 'Subjudul',
    },
  },
  en: {
    // ... existing keys
    new_section: {
      title: 'New Title',
      subtitle: 'Subtitle',
    },
  },
};
```

### Creating a New Page

1. **Create file:** `app/[locale]/new-page/page.tsx`
2. **Use template:**

```typescript
import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title | BirruLabs',
    description: 'Page description for SEO',
  };
}

export default async function NewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      {/* Content */}
    </div>
  );
}
```

3. **Add to sitemap:** `app/sitemap.ts` → `staticRoutes` array
4. **Build and verify**
5. **Commit and push**

---

## Deployment

### Automatic Deployment (Vercel)

**Trigger:** Push to `main` branch

**Process:**
1. GitHub webhook notifies Vercel
2. Vercel runs `npm run build`
3. Build output deployed to CDN
4. Production URL: `https://birrulabs-audit.vercel.app`
5. Custom domain (if configured): `https://birrulabs.biz.id`

**Deployment time:** ~1-2 minutes

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Deployment Checklist

Before pushing to `main`:

- [ ] `npm run build` passes locally
- [ ] No TypeScript errors
- [ ] No ESLint errors (if configured)
- [ ] Test all new routes locally
- [ ] Verify bilingual content (ID + EN)
- [ ] Check mobile responsiveness
- [ ] Verify security headers (via middleware)

### Rollback

If production deployment has issues:

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select project: `birrulabs-audit`
3. Click previous successful deployment
4. Click "Promote to Production"

---

## Monitoring

### Build Status

**Vercel Dashboard:**
- Real-time build logs
- Deploy status (success/failed)
- Build time metrics

**GitHub Actions:**
- Not currently configured
- Future: Add status checks before merge

### Performance Monitoring

**Vercel Analytics:**
- Not currently enabled
- Future: Enable for Web Vitals

**Lighthouse CI:**
- Not currently configured
- Future: Add to CI/CD for automated audits

### Error Monitoring

**Current:** None  
**Future:** Sentry or Vercel Error Tracking

### Uptime Monitoring

**Current:** Vercel uptime SLA  
**Future:** Uptime Robot or Better Uptime for external checks

---

## Troubleshooting

### Build Failures

**Issue:** `Failed to compile` with TypeScript errors

**Fix:**
```bash
# Run type check locally
npm run build

# Fix reported errors
# Common: missing imports, wrong types, async/await issues
```

**Issue:** `Module not found`

**Fix:**
```bash
# Check import paths use @/ alias
# Verify file exists at specified path
# Restart dev server: Ctrl+C → npm run dev
```

### Deployment Issues

**Issue:** Build succeeds locally but fails on Vercel

**Possible causes:**
- Environment variables missing (if added)
- Case-sensitive imports (Linux vs Windows)
- Node version mismatch

**Fix:**
```bash
# Check Vercel build logs
# Match Node version in package.json "engines"
```

### Content Not Updating

**Issue:** Pushed changes but site still shows old content

**Fix:**
1. Check Vercel deployment status (should be "Ready")
2. Hard refresh browser: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
3. Clear Vercel edge cache (Vercel dashboard)

### 404 Errors

**Issue:** New page returns 404

**Possible causes:**
- Not added to `generateStaticParams()`
- Not added to sitemap
- Case mismatch in URL

**Fix:**
1. Verify file path: `app/[locale]/your-page/page.tsx`
2. Build locally: `npm run build`
3. Check build output for generated routes

---

## Maintenance

### Dependency Updates

**Monthly:**
```bash
# Check outdated packages
npm outdated

# Update non-breaking (patch & minor)
npm update

# Test
npm run build

# Commit
git commit -m "chore: update dependencies"
```

**Quarterly:**
```bash
# Check for major updates
npm outdated

# Update major versions one at a time
npm install next@latest
npm run build  # test

npm install react@latest react-dom@latest
npm run build  # test

# Commit each major update separately
```

### Security Audits

**Weekly:**
```bash
# Run npm audit
npm audit

# Fix auto-fixable issues
npm audit fix

# Review remaining issues
npm audit --json
```

### Content Audit

**Quarterly:**
- Review all projects for status accuracy
- Update roadmap milestones
- Archive or update old articles
- Check for broken internal links

### Performance Audit

**Quarterly:**
- Run Lighthouse on all pages
- Check First Load JS size (target: <150 KB)
- Review bundle size (npm run build output)
- Optimize if performance degrades

### Backup

**Automatic:**
- Git repository on GitHub (primary backup)
- Vercel deployment history (30 days)

**Manual (recommended quarterly):**
```bash
# Clone fresh copy
git clone https://github.com/tantenton/birrulabs-website.git birrulabs-backup-2026-Q3

# Archive
tar -czf birrulabs-backup-2026-Q3.tar.gz birrulabs-backup-2026-Q3/
```

---

## Contact

**Technical issues:** Open GitHub issue  
**Content questions:** contact@birrulabs.biz.id  
**Security issues:** security@birrulabs.biz.id

---

**Next:** [CONTENT_WORKFLOW.md](./CONTENT_WORKFLOW.md) for content approval workflows (future).
