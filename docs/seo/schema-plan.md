# BirruLabs — Schema Markup Plan

**Domain:** birrulabs.biz.id  
**Implementation:** JSON-LD (embedded in `<head>`)  
**Target:** Google Search, Bing, accelerators, AI credits portals  
**Last Updated:** 2026-08-04

---

## 1. Core Schemas

### Organization (Global)

**Purpose:** Establish company identity for Knowledge Graph, rich snippets, search results  
**Page:** All pages  
**Priority:** HIGH

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BirruLabs",
  "url": "https://birrulabs.biz.id",
  "logo": "https://birrulabs.biz.id/logo.png",
  "description": "AI-native technical services company building intelligent automation platforms for digital affiliate marketing.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ID"
  },
  "email": "ops@birrulabs.biz.id",
  "sameAs": [
    "https://github.com/tantonton/birrulabs-website",
    "https://linkedin.com/company/birrulabs",
    "https://twitter.com/birrulabs"
  ]
}
```

---

### WebSite (Global)

**Purpose:** Search box in Google results, site attribution  
**Page:** All pages  
**Priority:** HIGH

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "BirruLabs",
  "url": "https://birrulabs.biz.id",
  "description": "Official website of BirruLabs — AI technical services and startup solutions.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://birrulabs.biz.id/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## 2. Page-Specific Schemas

### Article (Blog Posts)

**Purpose:** Rich snippets with author, date, image, reading time  
**Page:** `/blog/*`  
**Priority:** HIGH

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Article Title}",
  "description": "{Meta description}",
  "image": "{Featured image URL}",
  "datePublished": "{ISO 8601 date}",
  "dateModified": "{ISO 8601 date}",
  "author": {
    "@type": "Person",
    "name": "{Author Name}",
    "url": "{Author profile URL}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BirruLabs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://birrulabs.biz.id/logo.png"
    }
  },
  "articleSection": "{Category}",
  "articleBody": "{Content body (first 2000 words)}"
}
```

---

### BreadcrumbList (All Pages)

**Purpose:** Rich snippet breadcrumbs in search results  
**Page:** All pages except home  
**Priority:** HIGH

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://birrulabs.biz.id"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://birrulabs.biz.id/services"
    }
  ]
}
```

---

### Product (Projects / Services)

**Purpose:** Service detail rich results  
**Page:** `/projects/*`, `/services`  
**Priority:** MEDIUM

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Content Generation",
  "description": "Automated content creation for affiliate sites using AI, with human review workflow.",
  "provider": {
    "@type": "Organization",
    "name": "BirruLabs"
  },
  "areaServed": "APAC",
  "serviceType": "Technical Services",
  "Offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "2999",
    "url": "https://birrulabs.biz.id/services"
  }
}
```

---

### CreativeWork (Case Studies)

**Purpose:** Highlight research and documentation work  
**Page:** `/startup`, `/blog/case-studies/*`  
**Priority:** MEDIUM

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "BirruLabs Filliate Architecture",
  "description": "Technical architecture documentation for multi-network affiliate marketing automation platform.",
  "author": {
    "@type": "Organization",
    "name": "BirruLabs"
  },
  "dateCreated": "2026-08-04",
  "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "url": "https://github.com/tantonton/birrulabs-website/blob/main/birrulabs-filliate-architecture.md"
}
```

---

### LocalBusiness (Optional)

**Purpose:** Local SEO for Indonesia presence  
**Page:** `/contact`  
**Priority:** LOW (if physical office exists)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BirruLabs",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jakarta",
    "addressRegion": "Jakarta",
    "postalCode": "12345",
    "addressCountry": "ID"
  },
  "telephone": "+62-812-3456-7890",
  "email": "ops@birrulabs.biz.id",
  "url": "https://birrulabs.biz.id"
}
```

---

### FAQPage (Services / Contact)

**Purpose:** FAQ rich snippets (expandable answers in SERP)  
**Page:** `/services`, `/contact`  
**Priority:** MEDIUM

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What AI services does BirruLabs offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "BirruLabs provides custom AI development, integration services, content generation, and multi-agent automation systems for businesses."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help with AI credits applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we specialize in AI credits and accelerator program applications, with full documentation and technical evidence packages."
      }
    }
  ]
}
```

---

### HowTo (Content Assets)

**Purpose:** Step-by-step rich results  
**Page:** `/blog/how-to-articles/*`  
**Priority:** LOW (if tutorials created)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Integrate AI in Your Business",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Assess Current Workflow",
      "itemListElement": {
        "@type": "HowToDirection",
        "text": "Identify manual processes that consume >20% of your team's time."
      }
    },
    {
      "@type": "HowToStep",
      "name": "Define Success Metrics",
      "itemListElement": {
        "@type": "HowToDirection",
        "text": "Establish KPIs: time saved, error reduction, revenue increase."
      }
    }
  ]
}
```

---

## 3. Bilingual Schema Implementation

### English Pages (`/en/*`)

- `inLanguage`: "en"
- `alternateName`: English keywords in schema text
- English service descriptions

### Indonesian Pages (`/id/*`)

- `inLanguage`: "id"
- `alternateName`: Indonesian keywords in schema text
- Indonesian service descriptions

### hreflang + Schema Combo

```json
<link rel="alternate" hreflang="en" href="https://birrulabs.biz.id/en/services" />
<link rel="alternate" hreflang="id" href="https://birrulabs.biz.id/id/services" />
<link rel="alternate" hreflang="x-default" href="https://birrulabs.biz.id/en/services" />
```

---

## 4. Implementation Checklist

### Manual (Initial Launch)
- [ ] Add Organization schema to all pages
- [ ] Add WebSite schema to all pages
- [ ] Add BreadcrumbList to all non-home pages
- [ ] Add Article schema to blog posts
- [ ] Add FAQ schema to Services page

### Automated (Next.js Implementation)
- [ ] Create `src/app/(seo)/schema/Organization.tsx`
- [ ] Create `src/app/(seo)/schema/WebSite.tsx`
- [ ] Create `src/app/(seo)/schema/Breadcrumb.tsx`
- [ ] Create `src/app/(seo)/schema/Article.tsx`
- [ ] Integrate with i18n (ID/EN language detection)
- [ ] Server-side rendering for dynamic content

### Testing
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate with [Schema Markup Validator](https://validator.schema.org)
- [ ] Test hreflang with [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider)

---

## 5. Dynamic Content Considerations

### Blog Articles
- Publish date: Server-rendered from MDX frontmatter
- Modified date: Update on content changes
- Author: Linked to team page (if available)

### Projects
- Service type: "AI Technical Services"
- Area served: "APAC" (Indonesia, Thailand, Malaysia)
- Price: Range (e.g., "$2999+")

### Startup Profile
- CreativeWork schema with documentation files
- Author: "BirruLabs Team" (or "Hermes Agent CEO Orchestrator")
- License: CC BY-NC-SA 4.0

---

## 6. Future-Proofing

### Add When Relevant
- `Event` schema for webinars/workshops
- `Course` schema for AI training programs
- `SoftwareApplication` for BirruLabs Filliate product
- `Review` schema for client testimonials (if structured)

### Monitoring
- Track rich result impressions in Google Search Console
- Monitor schema-related errors weekly
- Update deprecated schemas quarterly

---

**Implementation Owner:** SEO Specialist Agent  
**Dependencies:** Frontend Engineer (Next.js integration)  
**Timeline:** Week 3-4 of roadmap
