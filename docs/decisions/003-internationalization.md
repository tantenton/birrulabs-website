---
title: "ADR-003: Internationalization Strategy"
date: 2026-08-04
status: accepted
---

# ADR-003: Internationalization (i18n) Strategy

## Context
BirruLabs website must support:
- **Indonesian** (primary) — target local startups, businesses
- **English** (secondary) — target international partners, accelerators, AI credits

Requirements:
- Language switcher in header
- URL structure for SEO (e.g., `/id/tentang`, `/en/about`)
- Content in both languages
- Proper hreflang tags
- Default language detection

## Decision
Use **next-intl** with sub-path routing (`/id/*`, `/en/*`).

## URL Structure

```
/                    → Redirect to /id (Indonesian default)
/id                  → Indonesian home
/id/tentang          → About (ID)
/id/proyek           → Projects (ID)
/en                  → English home
/en/about            → About (EN)
/en/projects         → Projects (EN)
```

## Implementation

### Directory Structure
```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   └── ...
├── layout.tsx       # Root layout
└── page.tsx         # Root redirect
```

### Configuration
```typescript
// i18n.config.ts
export const locales = ['id', 'en'] as const;
export const defaultLocale = 'id';

export const localeNames = {
  id: 'Bahasa Indonesia',
  en: 'English'
};
```

### Translation Files
```
messages/
├── id.json
└── en.json
```

### Example Translation
```json
// messages/id.json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang",
    "projects": "Proyek",
    "articles": "Artikel",
    "contact": "Kontak"
  },
  "home": {
    "hero": {
      "title": "Membangun sistem AI yang benar-benar bekerja",
      "subtitle": "BirruLabs adalah studio teknologi yang fokus pada otomasi AI praktis"
    }
  }
}

// messages/en.json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "articles": "Articles",
    "contact": "Contact"
  },
  "home": {
    "hero": {
      "title": "Building AI systems that actually work",
      "subtitle": "BirruLabs is a technology studio focused on practical AI automation"
    }
  }
}
```

## SEO Considerations

### Hreflang Tags
```html
<link rel="alternate" hreflang="id" href="https://birrulabs.biz.id/id/proyek" />
<link rel="alternate" hreflang="en" href="https://birrulabs.biz.id/en/projects" />
<link rel="alternate" hreflang="x-default" href="https://birrulabs.biz.id/id/proyek" />
```

### Sitemap
Generate separate sitemaps:
- `/sitemap-id.xml`
- `/sitemap-en.xml`
- `/sitemap-index.xml`

### Open Graph
```html
<meta property="og:locale" content="id_ID" />
<meta property="og:locale:alternate" content="en_US" />
```

## Content Translation

### Static Pages (About, Services)
- Human-written translations
- Stored in MDX files: `content/id/about.mdx`, `content/en/about.mdx`
- Not literal translations, localized for each audience

### Dynamic Content (Articles, Projects)
- Database columns: `title_id`, `title_en`, `content_id`, `content_en`
- AI-assisted translation with human review
- Query by locale field

### UI Strings
- All UI text in translation files
- No hardcoded strings in components
- useTranslations() hook

## Language Detection

1. URL path (`/id/*` or `/en/*`)
2. Cookie preference (user selected)
3. Accept-Language header
4. Default to Indonesian

## Consequences

### Positive
- Clean URLs for SEO
- Clear language separation
- Easy to add new languages
- Professional localization

### Negative
- All routes must handle locale parameter
- More complex routing
- Translation maintenance

### Mitigations
- TypeScript ensures type-safe translations
- Translation keys auto-complete in IDE
- CI checks for missing translations
- Keep UI strings minimal and simple

## Alternatives Considered

**Single domain with query param (`?lang=en`):**
- Con: Worse SEO, no clean URLs

**Subdomain (`en.birrulabs.biz.id`):**
- Con: More complex DNS, certificate management

**Separate domains:**
- Con: Much more expensive, harder to maintain

## Implementation Checklist
- [ ] Install next-intl
- [ ] Setup locale routing
- [ ] Create translation files
- [ ] Implement language switcher
- [ ] Generate hreflang tags
- [ ] Create localized sitemaps
- [ ] Add locale detection middleware
- [ ] Translate UI strings
- [ ] Translate content (human review)

## References
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Google i18n Best Practices](https://developers.google.com/search/docs/specialty/international)
