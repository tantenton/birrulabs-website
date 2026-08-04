---
title: "ADR-002: Content Management Strategy"
date: 2026-08-04
status: accepted
---

# ADR-002: Content Management Strategy

## Context
Need content management for:
- Projects (6+ portfolio items)
- Articles (blog, insights, case studies)
- Startup profile
- Static pages (About, Services, Contact)
- Bilingual content (ID + EN)
- Human approval workflow
- Version history

## Decision
**Hybrid approach:**
1. **Static content** (About, Services): MDX files in repo
2. **Dynamic content** (Articles, Projects): Supabase PostgreSQL
3. **Approval workflow:** Draft → Review → Published states
4. **Admin UI:** Custom Next.js admin routes

## Rationale

### Why Not Pure Git-Based?
- No built-in approval workflow
- Manual file editing for non-technical content
- Harder to implement scheduled publishing
- No audit trail

### Why Not Pure Headless CMS?
- Extra complexity
- Monthly costs
- Dependency on external service
- Less control over workflow

### Why Hybrid?
- Static pages rarely change → MDX in repo → versioned, simple
- Articles need workflow → database → draft/publish states
- Best of both: simplicity + power

## Schema (Supabase)

```sql
-- Projects
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_id text NOT NULL,
  title_en text NOT NULL,
  summary_id text,
  summary_en text,
  content_id text,
  content_en text,
  status text NOT NULL DEFAULT 'prototype',
  category text,
  tech_stack jsonb,
  screenshots jsonb,
  repository_url text,
  demo_url text,
  started_at date,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Articles
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_id text NOT NULL,
  title_en text NOT NULL,
  excerpt_id text,
  excerpt_en text,
  content_id text NOT NULL,
  content_en text NOT NULL,
  author text DEFAULT 'BirruLabs',
  category text,
  tags text[],
  locale text NOT NULL DEFAULT 'id',
  draft_status text NOT NULL DEFAULT 'draft',
  approval_status text DEFAULT 'pending',
  quality_score integer,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Case Studies
CREATE TABLE case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_id text NOT NULL,
  title_en text NOT NULL,
  challenge_id text,
  challenge_en text,
  approach_id text,
  approach_en text,
  result_id text,
  result_en text,
  evidence jsonb,
  status text DEFAULT 'draft',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
```

## Workflow States

### Articles
1. **draft** → AI generates, auto-saved
2. **pending** → Ready for human review
3. **approved** → Human approved, ready to publish
4. **published** → Live on site
5. **archived** → Removed from public view

### Approval Rules
- AI-generated content: `approval_required = true`
- Human-written content: Can publish directly
- Sensitive topics: Always require approval
- Default: `auto_publish = false`

## Implementation
- Supabase client in `lib/db/`
- API routes in `app/api/`
- Admin UI at `/admin` (protected)
- Public queries use RLS policies
- Draft content invisible to public

## Consequences

### Positive
- Flexible workflow
- Audit trail via Supabase
- Can add revision history later
- Admin UI matches site design
- No external CMS costs

### Negative
- More code to maintain
- Need to build admin UI
- Database migrations

### Mitigations
- Keep admin UI simple
- Use Supabase Dashboard for emergency edits
- Document workflow clearly
- Add automated tests

## Future Enhancements
- Revision history table
- Content scheduling
- Multi-user collaboration
- Comments/feedback system

## References
- [Supabase Docs](https://supabase.com/docs)
- [Content Workflow](../automation/content-pipeline.md)
