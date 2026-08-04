# BirruLabs Database Schema Documentation

**Version:** 1.0.0  
**Database:** PostgreSQL (Supabase)  
**Last Updated:** 2026-08-04  
**Author:** Backend Engineer (Agent-Backend)

---

## Overview

This document describes the database schema for BirruLabs CMS - a content management system for managing Projects, Articles, Case Studies, and Startup Profiles with bilingual (ID/EN) support, approval workflows, and revision history.

---

## Schema Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AUTHENTICATION                              │
│  auth.users (Supabase) - User accounts with RBAC roles              │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      CONTENT_BASE (Polytable)                       │
│  - Shared metadata across all content types                         │
│  - Status workflow (draft → in_review → published)                  │
│  - Localization (ID/EN)                                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
│  PROJECTS    │      │  ARTICLES    │      │  CASE STUDIES    │
│  (Projects)  │      │  (Articles)  │      │  (Case Studies)  │
└──────────────┘      └──────────────┘      └──────────────────┘
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────┐      ┌──────────────────┐
│ STARTUP_PROFILES │      │    PAGES     │      │   MEDIA_ASSETS   │
│  (Startups)      │      │  (Static)    │      │   (Assets)       │
└──────────────────┘      └──────────────┘      └──────────────────┘
                                  │                         │
                                  └───────────┬─────────────┘
                                              ▼
                                    ┌─────────────────┐
                                    │  RELATIONSHIPS  │
                                    │  (Cross-links)  │
                                    └─────────────────┘

                      ┌───────────────────────────────┐
                      │    APPROVAL_WORKFLOW          │
                      │    (Editorial queue)          │
                      └───────────────────────────────┘

                      ┌───────────────────────────────┐
                      │   PUBLICATION_SCHEDULE        │
                      │    (Scheduled posts)          │
                      └───────────────────────────────┘

                      ┌───────────────────────────────┐
                      │       REVISIONS               │
                      │    (Change history)           │
                      └───────────────────────────────┘
```

---

## Core Tables

### 1. `auth.users`

User accounts with Role-Based Access Control (RBAC).

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `email` | text | Unique email address |
| `email_confirmed_at` | timestamptz | Email verification timestamp |
| `role` | text | RBAC role: `admin`, `editor`, `author`, `viewer` |
| `is_active` | boolean | Account status |
| `full_name` | text | Display name |
| `avatar_url` | text | Gravatar/Supabase storage URL |
| `raw_user_meta_data` | jsonb | Custom metadata |
| `last_login_at` | timestamptz | Last authentication timestamp |

**RBAC Permissions:**
- `admin`: Full access to all content and settings
- `editor`: Can create, edit, and publish all content
- `author`: Can create and edit own content (draft only)
- `viewer`: Read-only access to published content

---

### 2. `content.content_base`

Base content table - polymorphic entity for all content types.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `content_type` | text | Type: `project`, `article`, `casestudy`, `startupprofile`, `page` |
| `slug` | text | URL-friendly identifier |
| `status` | text | `draft`, `in_review`, `published`, `deprecated`, `archived` |
| `language` | text | `id` (Indonesian), `en` (English) |
| `localization_status` | text | `draft`, `in-progress`, `review`, `published` |
| `requires_approval` | boolean | Default: `true` - requires editorial approval |
| `approved_by` | uuid | Editor who approved content |
| `approved_at` | timestamptz | Approval timestamp |
| `published_at` | timestamptz | Publication timestamp |
| `is_featured` | boolean | Featured content flag |
| `nav_order` | integer | Navigation ordering |
| `show_in_navigation` | boolean | Show in navigation menu |
| `seo_title` | text | SEO title override |
| `seo_description` | text | SEO meta description |
| `og_image_url` | text | Open Graph image |
| `metadata` | jsonb | Custom metadata JSON |
| `created_by` | uuid | Author user ID |
| `updated_by` | uuid | Last editor user ID |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

**Content Status Workflow:**
```
draft → in_review → published → deprecated → archived
  ↑         │           │
  └─────────┴───────────┘
```

---

## Content Type Tables

### 3. `content.projects`

Project showcase entries.

| Column | Type | Description |
|--------|------|-------------|
| `content_base_id` | uuid | Reference to content_base (PK) |
| `category` | text | `ai`, `automation`, `agents`, `custom` |
| `client_name` | text | Client name (NULL = confidential) |
| `is_confidential` | boolean | Hide client information |
| `project_date` | date | Project completion date |
| `duration` | text | Duration string (e.g., "3 months") |
| `summary` | jsonb | PortableText summary |
| `challenges` | jsonb | Array of challenges (PortableText) |
| `solutions` | jsonb | Array of solutions (PortableText) |
| `results` | jsonb | Array of results (PortableText) |
| `hero_image_url` | text | Hero image path |
| `hero_image_alt` | text | Image alt text |
| `team_size` | integer | Team size |
| `technical_stack` | text[] | Array of technologies |
| `financially_structured` | boolean | Internal financial info flag |

**Example:**
```json
{
  "category": "automation",
  "client_name": "Fintech Startup Indonesia",
  "is_confidential": false,
  "project_date": "2025-12-01",
  "duration": "3 months",
  "summary": [{"type": "paragraph", "children": [{"text": "..."}]}],
  "challenges": [...],
  "solutions": [...],
  "results": [...],
  "technical_stack": ["Next.js 15", "Node.js", "Supabase", "Redis", "BullMQ"]
}
```

---

### 4. `content.articles`

Blog posts, tutorials, news, and case studies.

| Column | Type | Description |
|--------|------|-------------|
| `content_base_id` | uuid | Reference to content_base (PK) |
| `type` | text | `blog`, `tutorial`, `casestudy`, `news` |
| `category` | text | Article category |
| `author_id` | uuid | Reference to author user |
| `author_name` | text | Guest author name |
| `published_at` | timestamptz | Publication timestamp |
| `read_time_minutes` | integer | Auto-calculated reading time |
| `keywords` | text[] | SEO keywords |
| `excerpt` | text | Short summary |
| `content` | jsonb | Main content (PortableText) |

**Content Types:**
- `blog`: Opinionated posts, announcements
- `tutorial`: Step-by-step technical guides
- `casestudy`: Client success stories
- `news`: Press releases

---

### 5. `content.casestudies`

Detailed client success documentation.

| Column | Type | Description |
|--------|------|-------------|
| `content_base_id` | uuid | Reference to content_base (PK) |
| `industry` | text | Industry (e.g., "Fintech", "Edutech") |
| `focus` | text | `automation`, `ai`, `integration` |
| `client_logo_url` | text | Client company logo |
| `client_anonymized` | boolean | Hide client identity |
| `executive_summary` | jsonb | Executive summary (PortableText) |
| `problem_statement` | jsonb | Problem description |
| `solution_approach` | jsonb | Solution strategy |
| `implementation` | jsonb | Implementation details |
| `outcomes` | jsonb | Results Summary |
| `metrics` | jsonb | Array of `{label, value, unit, timeframe}` |

**Example metrics:**
```json
[
  {"label": "Revenue increase", "value": "130", "unit": "percent", "timeframe": "3 months"},
  {"label": "Time saved", "value": "70", "unit": "percent", "timeframe": "monthly"},
  {"label": "Products indexed", "value": "500", "unit": "number", "timeframe": "ongoing"}
]
```

---

### 6. `content.startup_profiles`

Startup program portfolio entries.

| Column | Type | Description |
|--------|------|-------------|
| `content_base_id` | uuid | Reference to content_base (PK) |
| `program` | text | `akcelera-id`, `birrulabs-club`, `helostech` |
| `cohort` | text | Cohort identifier (e.g., "2025-Q1") |
| `status` | text | `active`, `graduated`, `shutdown` |
| `company_name` | text | Company legal name |
| `tagline` | jsonb | Company tagline (PortableText) |
| `description` | jsonb | Company description |
| `website` | text | Company website URL |
| `linkedin_url` | text | LinkedIn profile URL |
| `twitter_url` | text | Twitter/X profile URL |
| `industry` | text | Industry sector |
| `stage` | text | `ideation`, `seed`, `series_a`, `series_b` |
| `geolocation` | text | Location |
| `founders` | jsonb | Array of `{name, role, linkedin, photo_url}` |
| `tech_stack` | text[] | Technology stack |
| `funding_raised` | text | Funding amount |
| `key_milestones` | jsonb | Array of `{title, date, description}` |

---

### 7. `content.pages`

Static pages (About, Contact, Terms, Privacy, etc.).

| Column | Type | Description |
|--------|------|-------------|
| `content_base_id` | uuid | Reference to content_base (PK) |
| `page_type` | text | `about`, `contact`, `terms`, `privacy`, `careers`, `faq` |
| `body` | jsonb | Main content (PortableText) |
| `cta_section` | jsonb | Call-to-action section |

---

## Supporting Tables

### 8. `content.media_assets`

Asset library for images, videos, documents.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `content_base_id` | uuid | Optional reference to content |
| `file_url` | text | Storage path (Supabase/CDN) |
| `file_name` | text | Original filename |
| `file_type` | text | MIME type or category |
| `file_size` | bigint | File size in bytes |
| `width` | integer | Image width (pixels) |
| `height` | integer | Image height (pixels) |
| `alt_text` | text | Accessibility alt text |
| `caption` | text | Image caption |
| `created_by` | uuid | Upload user |
| `created_at` | timestamptz | Upload timestamp |
| `usage_count` | integer | Reference count |

---

### 9. `content.revisions`

Revision history for all content.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `content_base_id` | uuid | Reference to content |
| `content_type` | text | Copy of content type |
| `version` | integer | Revision number |
| `diff` | jsonb | JSON Patch(diff) format |
| `changed_by` | uuid | User who made change |
| `reason` | text | Change description |
| `created_at` | timestamptz | Change timestamp |

**Usage:**
```json
{
  "version": 3,
  "diff": [
    {"op": "replace", "path": "/title", "value": "New Title"},
    {"op": "add", "path": "/links/-", "value": "http://example.com"}
  ],
  "changed_by": "uuid...",
  "reason": "Updated product description"
}
```

---

### 10. `content.relationships`

Content cross-linking system.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `from_content_id` | uuid | Source content |
| `to_content_id` | uuid | Target content |
| `relationship_type` | text | `references`, `cites`, `related`, `cross_link` |
| `order_index` | integer | Display order |
| `created_at` | timestamptz | Link creation timestamp |

**Relationship Types:**
- `references`: Parent → Child relationship
- `cites`: Citation/Reference
- `related`: Related content suggestions
- `cross_link`: Bidirectional link

---

### 11. `content.approval_workflow`

Editorial approval queue.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `content_base_id` | uuid | Content requiring approval |
| `submitted_by` | uuid | Author submitting for approval |
| `assigned_to` | uuid | Editor assigned to review |
| `status` | text | `pending`, `in_review`, `approved`, `rejected`, `needs_changes` |
| `reviewer_notes` | jsonb | Review annotations |
| `approved_at` | timestamptz | Approval timestamp |
| `feedback` | jsonb | Approval/rejection feedback |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update |

**Workflow States:**
```
pending → in_review → approved
                    ↓
                 needs_changes → in_review
```

---

### 12. `content.publication_schedule`

Scheduled content publishing.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `content_base_id` | uuid | Content to publish |
| `scheduled_for` | timestamptz | Publication datetime |
| `timezone` | text | Timezone (default: "Asia/Jakarta") |
| `status` | text | `scheduled`, `published`, `cancelled` |
| `published_at` | timestamptz | Actual publication timestamp |
| `created_by` | uuid | Scheduler user |
| `created_at` | timestamptz | Schedule creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

---

## Views (Pre-computed)

### `content.v_published_projects`
Published projects with base metadata.

### `content.v_published_articles`
Published articles with base metadata.

### `content.v_published_casestudies`
Published case studies with base metadata.

### `content.v_published_startup_profiles`
Published startup profiles with base metadata.

---

## RLS Policies

### Content Base RLS

```sql
-- Admin: Full access
auth.uid() IS NOT NULL AND role = 'admin'

-- Editor: Full access  
auth.uid() IS NOT NULL AND role = 'editor'

-- Author: Create/edit own content, read all published
auth.uid() IS NOT NULL AND role = 'author'

-- Viewer: Read only published content
status = 'published'
```

### Media Assets RLS

```sql
-- All authenticated users can upload
INSERT: authenticated

-- Select: all authenticated
SELECT: authenticated

-- Update/Delete: owner only
```

---

## Content Relationships

```
┌──────────┐         ┌─────────────┐
│ Project  │──refer─→│ Case Study  │
└──────────┘         └─────────────┘
                        ▲
                        │
┌──────────┐          │
│ Article  │──────────┘
└──────────┘

┌──────────────┐      ┌──────────┐
│ Article      │──refer─→│ Project  │
└──────────────┘         └──────────┘

┌──────────────────┐
│ Startup Profile  │──refer─→│ Article │
└──────────────────┘          └─────────┘
```

---

## Example Queries

### Get Featured Projects
```sql
SELECT * FROM content.v_published_projects
WHERE is_featured = true
  AND language = 'id'
ORDER BY published_at DESC;
```

### Get Articles by Tag
```sql
SELECT * FROM content.v_published_articles
WHERE language = 'id'
  AND keywords @> ARRAY['ai'];
```

### Get Case Study by Startup
```sql
SELECT cs.*, cb.slug
FROM content.casestudies cs
JOIN content.content_base cb ON cs.content_base_id = cb.id
WHERE cb.slug = 'fintech-startup-success';
```

### Get Startup with Active Status
```sql
SELECT * FROM content.v_published_startup_profiles
WHERE status = 'active'
  AND language = 'id'
ORDER BY cohort DESC;
```

---

## Database Migrations

### Current Version: `0001_initial_schema.sql`

Applications should be run in order:
1. `0001_initial_schema.sql` - Base schema
2. `0002_seed_data.sql` - Sample data

### Adding a New Migration

```sql
-- migrations/0003_new_feature.sql
BEGIN;

-- Your changes here

COMMIT;

SELECT 'Migration 0003 executed successfully' AS status;
```

---

## Security Notes

1. **RLS Enabled:** All content tables have Row Level Security
2. **Service Role:** Use service role key only for server-side operations
3. **Auth:** Require Supabase auth for all content operations
4. **Input Validation:** Validate all PortableText content on server
5. **SQL Injection:** Use parameterized queries for all operations

---

## Backup & Recovery

```bash
# Backup
pg_dump -U supabase_admin -d supabase -t "content.*" > content_backup.sql

# Restore
psql -U supabase_admin -d supabase < content_backup.sql
```

---

##未来发展

### Phase 2 Features (Planned)
- [ ] Content templates (reusable component structures)
- [ ] A/B testing metadata
- [ ] Analytics integration (page views, clicks)
- [ ] Content versioning beyond revisions
- [ ] Multi-tenancy support

### Phase 3 Features (Future)
- [ ] GraphQL API endpoint
- [ ] Webhook subscriptions for content changes
- [ ] Content localization workflows
- [ ] Machine translation integration

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**Maintained By:** Backend Engineer Team
