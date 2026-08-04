# BirruLabs — SEO Strategy

**Domain:** birrulabs.biz.id  
**Last Updated:** 2026-08-04  
**Phase:** Discovery → Implementation (Week 3-4 of roadmap)

---

## 1. Goals & KPIs

| Goal | Target | Timeline | Measurement |
|------|--------|----------|-------------|
| Organic traffic | 500+ visits/month | Month 3 | Google Analytics |
| Keyword rankings | Top 10 for 15+ keywords | Month 2-3 | Google Search Console |
| Backlinks | 10+ quality domains | Month 4-6 | Ahrefs/Moz |
| Bounce rate | <55% | Month 2 | Google Analytics |
| Time on page | >1:30 min | Month 2 | Google Analytics |
| Conversions | 5+ leads/month | Month 3 | GA4 goals |

---

## 2. Technical SEO

### A. Crawl & Index

**Status:** Basic implementation needed  
**Priority:** HIGH

| Task | Status | Owner | Timeline |
|------|--------|-------|----------|
| robots.txt | Created | DevOps | Week 3 |
| sitemap.xml | Created | DevOps | Week 3 |
| Canonical URLs | Implemented | Frontend | Week 3 |
|hreflang tags | Implemented | Frontend | Week 3 |
| SSL certificate | Active | DevOps | Already done |
| Mobile-first design | Complete | Design | Already done |
| Core Web Vitals | LCP < 2.5s | Frontend | Week 3 |

### B. Site Structure

```
birrulabs.biz.id/
├── /en/ (English)
│   ├── / (home)
│   ├── /about
│   ├── /services
│   ├── /projects
│   ├── /blog
│   ├── /contact
│   └── /startup
└── /id/ (Indonesian)
    ├── / (home)
    ├── /tentang
    ├── /layanan
    ├── /projek
    ├── /blog
    ├── /kontak
    └── /startup
```

**URL Best Practices:**
- Hyphen-separated: `/ai-content-generation`
- Avoid stop words: `/ai-services` not `/ai-services-for-business`
- Consistent casing: lowercase only
- No session IDs or tracking params

---

## 3. Content Strategy

### A. On-Page Optimization

| Element | Optimization Rule | Example |
|---------|-------------------|---------|
| `<title>` | 50-60 chars, keyword first | "AI Technical Services | BirruLabs" |
| `<meta description>` | 140-160 chars, CTA | "Custom AI development and integration for businesses. AI credits applications support." |
| `<h1>` | Single per page, keyword | "AI Technical Services" |
| `<h2>` | Subheadings, related keywords | "Custom AI Solutions", "AI Integration Services" |
| `<h3-h6>` | Nested structure | "AI for Affiliate Marketing", "AI Content Generation" |
| Alt text | Descriptive, include keywords | "AI content generation dashboard interface" |

### B. Content Calendar (Months 1-3)

| Month | Week | Theme | Target Keywords | Format |
|-------|------|-------|-----------------|--------|
| **Month 1** | W1 | AI Strategy | "ai consulting", "ai solution development" | Guide |
| | W2 | Implementation | "ai integration services", "how to integrate ai" | Tutorial |
| | W3 | Affiliate AI | "affiliate marketing ai", "ai content generator" | Case study |
| | W4 | Technical Deep dive | "multi agent ai system", "next.js ai application" | Technical post |
| **Month 2** | W1 | AI Credits | "ai credits application", "ai accelerator program" | Guide |
| | W2 | Startup Journey | "startup ai services", "ai startup indonesia" | Story |
| | W3 | B2B Use Cases | "b2b ai services indonesia", "ai for business" | Case study |
| | W4 | Technology Stack | "openai api integration", "supabase ai database" | Tutorial |
| **Month 3** | W1 | Performance | "ai implementation cost", "roi ai implementation" | Guide |
| | W2 | Industry Trends | "ai trends 2026", "future of ai services" | Opinion |
| | W3 | Client Stories | "ai agency for startups", "b2b ai services" | Testimonial |
| | W4 | Q&A | "ai consulting questions", "ai development cost" | FAQ |

---

## 4. Link Strategy

### A. Internal Linking

**Pattern:**
- Hub-and-spoke around core topics
- 3-5 internal links per post
- Anchor text includes primary keyword

**Example:**
```
Article: "AI Content Generation for Affiliate Sites"
→ Links to:
   - /projects/creative-factory (primary)
   - /services/ai-content-generation (secondary)
   - /blog/ai-implementation-cost (contextual)
```

### B. External Linking

**Target Domains:**
- Google Search Central (schema docs)
- Next.js documentation (technical credibility)
- OpenAI API docs (if referencing)
- Supabase docs (if referencing)

**Avoid:**
- Low-authority directories
- SaaS tool directories (unless relevant)
- Article syndication farms

### C. Backlink Building

| Method | Timeline | Expected Results |
|--------|----------|------------------|
| Guest posts on tech blogs | Month 2-4 | 5-10 links |
| AI accelerator partnerships | Month 3-6 | 3-5 links |
| GitHub contributions | Ongoing | 10+ links |
| Stack Overflow answers | Ongoing | Quality links |

---

## 5. Bilingual SEO

### A. hreflang Implementation

**Format:**
```html
<link rel="alternate" hreflang="en" href="https://birrulabs.biz.id/en/services" />
<link rel="alternate" hreflang="id" href="https://birrulabs.biz.id/id/layanan" />
<link rel="alternate" hreflang="x-default" href="https://birrulabs.biz.id/en/services" />
```

**Rules:**
- All pages with translations must have hreflang
- Self-referencing canonical + hreflang
- Use ISO 639-1 language codes
- Not `hreflang="en-id"` — use separate `en` and `id` entries

### B. Translation Best Practices

| Do | Don't |
|----|-------|
| Localize, don't translate | Direct translations |
| Use Indonesian examples | English examples only |
| Maintain keyword research | English keywords only |
| Keep semantic clusters | Separate keyword sets |

---

## 6. Technical Implementation (Next.js)

### A. Metadata API

**Location:** `src/app/[lang]/layout.tsx`

```typescript
import type { Metadata } from 'next';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const isID = params.lang === 'id';
  
  return {
    title: {
      default: isID ? 'BirruLabs | Solusi AI Bisa di Percaya' : 'BirruLabs | Trusted AI Solutions',
      template: `%s | BirruLabs`,
    },
    description: isID
      ? 'Kami membangun sistem AI yang benar-benar bekerja untuk bisnis dan masyarakat. Layanan teknis, konsultasi, dan implementasi.'
      : 'We build AI systems that truly work for businesses and society. Technical services, consulting, and implementation.',
    keywords: isID
      ? ['AI teknis', 'solusi AI', 'konsultasi AI', 'integrasi AI', 'startup AI']
      : ['AI technical services', 'AI solutions', 'AI consulting', 'AI integration', 'AI startup'],
    alternates: {
      canonical: `https://birrulabs.biz.id/${params.lang}`,
      languages: {
        'en': 'https://birrulabs.biz.id/en',
        'id': 'https://birrulabs.biz.id/id',
      },
    },
  };
}
```

### B. Schema Component

**Location:** `src/app/(seo)/schema-provider.tsx`

```typescript
'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

export function SchemaProvider() {
  const pathname = usePathname();
  const isID = pathname.startsWith('/id/');

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isID ? 'BirruLabs' : 'BirruLabs',
    url: 'https://birrulabs.biz.id',
    description: isID
      ? 'Perusahaan jasa teknis AI yang membangun platform otomasi pintar untuk pemasaran affiliasi digital.'
      : 'AI-native technical services company building intelligent automation platforms for digital affiliate marketing.',
    foundingDate: '2023',
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
```

### C. Sitemap.xml Generation

**Location:** `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const langPages = ['en', 'id'];
  const routes = ['/', '/about', '/services', '/projects', '/blog', '/contact', '/startup'];

  return routes.flatMap((route) =>
    langPages.map((lang) => ({
      url: `https://birrulabs.biz.id/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1.0 : route === '/services' ? 0.9 : 0.8,
    }))
  );
}
```

### D. robots.txt

**Location:** `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://birrulabs.biz.id/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/auth/
Disallow: /api/private/

# Allow crawlers for rich results
Allow: /blog/
Allow: /projects/
Allow: /services/

# Crawl delay (optional)
Crawl-delay: 0
```

---

## 7. Monitoring & Reporting

### A. Google Search Console Setup

**Properties to add:**
- `birrulabs.biz.id` (primary)
- `https://birrulabs.biz.id/` (HTTPS version)

**Reports to monitor weekly:**
- Performance → Clicks, Impressions, CTR, Position
- URL Inspection → Indexing status
- Coverage → Errors/warnings
- Links → External linking
- Security Issues → Hacked content

### B. Google Analytics 4

**Events to track:**
- `search` (site search)
- `scroll_depth` (>25%, >50%, >75%)
- `download` (case studies, whitepapers)
- `form_submit` (contact form)
- `click_to_call` (phone clicks)
- `outbound_link` (external links)

### C. Rank Tracking

**Keywords to track:**
- Primary: 15 keywords (Month 1)
- Extended: 50+ keywords (Month 3)
- Competitors: 5 competitor domains

**Tools:**
- Free: Google Search Console
- Pro: Ahrefs or Semrush (Month 2+)

---

## 8. Technical Debt & Future Improvements

### Phase 1 (Current)
- [x] Keyword map
- [x] Schema plan
- [ ] robots.txt
- [ ] sitemap.xml
- [ ] hreflang implementation
- [ ] Schema markup
- [ ] Title/meta description optimization

### Phase 2 (Month 1-2)
- [ ] Internal linking audit
- [ ] Core Web Vitals optimization
- [ ] Blog content calendar
- [ ] Initial backlink outreach

### Phase 3 (Month 3+)
- [ ] Advanced analytics
- [ ] Competitor gap analysis
- [ ] Voice search optimization
- [ ] Local SEO (if physical office)
- [ ] Video schema for product demos

---

## 9. Quick Wins (Week 3)

1. **Fix duplicate meta descriptions** across pages
2. **Add schema.org markup** to all pages
3. **Create robots.txt** and sitemap.xml
4. **Implement hreflang** for ID/EN pages
5. **Optimize images** (WebP + lazy loading)
6. **Fix 404 errors** (check Search Console)
7. **Add alt text** to all project images
8. **Update title tags** with keywords

---

**Next Steps:**
1. Frontend engineer implements metadata API
2. DevOps deploys robots.txt and sitemap.xml
3. SEO specialist validates with Google Search Console
4. Content writer begins Month 1 blog series
5. Weekly review: Track keyword rankings, traffic
