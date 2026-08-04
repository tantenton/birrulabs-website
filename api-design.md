# BirruLabs API Design Document

**Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**Target Stack:** Next.js 15 (App Router) + TypeScript + Supabase PostgreSQL

---

## Overview

This document describes the RESTful API architecture for BirruLabs Content Management System, including endpoints for content CRUD, approval workflows, media management, and admin operations.

---

## Base Configuration

```
Base URL: /api/v1
Content-Type: application/json
Auth: Bearer token (Supabase JWT)
Language Header: Accept-Language: id|en (optional)
```

---

## Authentication

### Request Header
```
Authorization: Bearer <supabase_jwt_token>
```

### Role-Based Access Control

| Role |Access Level |
|------|-------------|
| `admin` | Full CRUD + admin operations |
| `editor` | CRUD + publish + approve |
| `author` | Create own content + edit own drafts |
| `viewer` | Read published content only |

### Authenticated Route Protection

```typescript
// SvelteKit hook
export const handle = async ({ event, resolve }) => {
  const { session, user } = event.locals;
  
  if (!session) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Check role permissions for protected routes
  if (requiresAuth(event.url.pathname) && !isAllowed(user.role, event.url.pathname)) {
    return json({ error: 'Forbidden' }, { status: 403 });
  }
  
  return resolve(event);
};
```

---

## Content API

### Base Endpoint: `/api/content`

#### GET - List Content

**Public access:** Published content only  
**Protected:** All content (admin/editor)

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `type` | string | Content type | `project`, `article`, `casestudy`, `startupprofile`, `page` |
| `lang` | string | Language | `id`, `en` |
| `status` | string | Filter by status | `draft`, `published` |
| `category` | string | Filter by category | `ai`, `automation` |
| `featured` | boolean | Filter featured | `true` |
| `page` | integer | Pagination page | `1` |
| `limit` | integer | Results per page | `20` |

**Example Request:**
```
GET /api/content?type=project&lang=id&status=published&featured=true
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "results": [
    {
      "id": "uuid",
      "content_type": "project",
      "slug": "multi-network-affiliate-platform",
      "language": "id",
      "status": "published",
      "is_featured": true,
      "published_at": "2026-08-01T10:00:00Z",
      "category": "automation",
      "client_name": "Fintech Startup Indonesia",
      "summary": [...],
      "hero_image_url": "/images/projects/affiliate-platform-hero.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "has_more": false
  }
}
```

#### POST - Create Content

**Protected:** admin, editor, author

**Request Body:**
```json
{
  "content_type": "project",
  "data": {
    "slug": "new-project",
    "status": "draft",
    "language": "id",
    "category": "ai",
    "client_name": "Client Name",
    "is_confidential": false,
    "project_date": "2025-12-01",
    "duration": "3 months",
    "summary": [{"type": "paragraph", "children": [{"text": "..."}]}],
    "challenges": [...],
    "solutions": [...],
    "results": [...],
    "technical_stack": ["Next.js", "Supabase"],
    "team_size": 3
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "contentBase": {
    "id": "uuid",
    "content_type": "project",
    "slug": "new-project",
    "status": "draft",
    "created_by": "user-id",
    "created_at": "2026-08-04T..."
  },
  "typeData": {
    "content_base_id": "uuid",
    "category": "ai",
    "client_name": "Client Name",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "error": "Missing required field: content_type"
}
```

#### GET /:id - Get Single Content

**Public:** Published content  
**Protected:** All content (for admin/editor)

**Example Request:**
```
GET /api/content/{content_base_id}
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "contentBase": {
    "id": "uuid",
    "content_type": "project",
    "slug": "multi-network-affiliate-platform",
    "language": "id",
    "status": "published",
    "published_at": "2026-08-01T10:00:00Z",
    ...
  }
}
```

#### PUT /:id - Update Content

**Protected:** admin, editor, author (own content only)

**Request Body:**
```json
{
  "data": {
    "status": "draft",
    "is_featured": true,
    ".metadata": {"priority": "high"}
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "updated": {
    "id": "uuid",
    "status": "draft",
    "is_featured": true,
    ...
  }
}
```

#### DELETE /:id - Delete Content

**Protected:** admin only

**Example Request:**
```
DELETE /api/content/{content_base_id}
Authorization: Bearer <admin_token>
```

**Success Response (204):**
```
No content
```

---

## Content-Specific Endpoints

### Projects Endpoint: `/api/projects`

#### GET /projects - List Projects

**Query Parameters:**
- `category` (string): `ai`, `automation`, `agents`, `custom`
- `client` (string): Filter by client name
- `featured` (boolean): Only featured projects

**Example:**
```
GET /api/projects?category=automation&lang=id
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "content_base_id": "uuid",
      "slug": "project-slug",
      "language": "id",
      "status": "published",
      "category": "automation",
      "client_name": "Client Name",
      "project_date": "2025-12-01",
      "duration": "3 months",
      "technical_stack": ["Next.js", "Supabase"],
      "summary": [...]
    }
  ]
}
```

#### GET /projects/:slug - Get Project by Slug

**Example:**
```
GET /api/projects/multi-network-affiliate-platform
```

**Success Response (200):**
```json
{
  "success": true,
  "project": {
    "content_base_id": "uuid",
    "slug": "multi-network-affiliate-platform",
    "language": "id",
    "status": "published",
    "category": "automation",
    "client_name": "Fintech Startup Indonesia",
    "is_confidential": false,
    "project_date": "2025-12-01",
    "duration": "3 months",
    "summary": [{"type": "paragraph", "children": [{"text": "..."}]}],
    "challenges": [...],
    "solutions": [...],
    "results": [...],
    "hero_image_url": "/images/projects/hero.jpg",
    "team_size": 3,
    "technical_stack": ["Next.js 15", "Node.js", "Supabase", "Redis", "BullMQ"],
    "financially_structured": true
  }
}
```

---

### Articles Endpoint: `/api/articles`

#### GET /articles - List Articles

**Query Parameters:**
- `category` (string): Article category
- `tag` (string): Filter by keyword
- `type` (string): `blog`, `tutorial`, `casestudy`, `news`

**Example:**
```
GET /api/articles?category=architecture&tag=multi-agent&lang=id
```

**Success Response:**
```json
{
  "success": true,
  "results": [
    {
      "content_base_id": "uuid",
      "slug": "multi-agent-architecture",
      "language": "id",
      "status": "published",
      "type": "blog",
      "category": "architecture",
      "author_id": "uuid",
      "author_name": "Hermes Agent",
      "published_at": "2026-08-01T10:00:00Z",
      "read_time_minutes": 12,
      "keywords": ["multi-agent", "orchestration"],
      "excerpt": "Deep dive arsitektur...",
      "content": [{"type": "paragraph", "children": [...]}]
    }
  ]
}
```

#### GET /articles/:slug - Get Article by Slug

**Example:**
```
GET /api/articles/ai-content-generation-guide
```

---

### Case Studies Endpoint: `/api/casestudies`

#### GET /casestudies - List Case Studies

**Query Parameters:**
- `industry` (string): Filter by industry
- `focus` (string): `automation`, `ai`, `integration`

**Example:**
```
GET /api/casestudies?industry=Fintech&lang=id
```

**Success Response:**
```json
{
  "success": true,
  "results": [
    {
      "content_base_id": "uuid",
      "slug": "fintech-startup-affiliate-success",
      "language": "id",
      "status": "published",
      "industry": "Fintech",
      "focus": "automation",
      "client_logo_url": "/images/casestudies/logo.svg",
      "executive_summary": [...],
      "problem_statement": [...],
      "solution_approach": [...],
      "implementation": [...],
      "outcomes": [...],
      "metrics": [
        {"label": "Revenue increase", "value": "130", "unit": "percent", "timeframe": "3 months"}
      ]
    }
  ]
}
```

#### GET /casestudies/:slug - Get Case Study by Slug

**Example:**
```
GET /api/casestudies/fintech-startup-affiliate-success
```

---

### Startup Profiles Endpoint: `/api/startup-profiles`

#### GET /startup-profiles - List Startup Profiles

**Query Parameters:**
- `program` (string): `akcelera-id`, `birrulabs-club`, `helostech`
- `status` (string): `active`, `graduated`, `shutdown`

**Example:**
```
GET /api/startup-profiles?program=birrulabs-club&status=active&lang=id
```

**Success Response:**
```json
{
  "success": true,
  "results": [
    {
      "content_base_id": "uuid",
      "slug": "birrulabs",
      "language": "id",
      "status": "published",
      "program": "birrulabs-club",
      "cohort": "2025-Q4",
      "company_name": "BirruLabs",
      "tagline": [{"type": "paragraph", "children": [{"text": "AI-native..."}]}],
      "description": [{"type": "paragraph", "children": [{"text": "Studio membangun sistem AI..."}]}],
      "website": "https://birrulabs.biz.id",
      "linkedin_url": "https://linkedin.com/company/birrulabs",
      "industry": "Technical Services, AI Automation",
      "stage": "seed",
      "geolocation": "Indonesia",
      "founders": [
        {
          "name": "Hermes Agent",
          "role": "Founder & CEO Orchestrator",
          "linkedin": "https://linkedin.com/in/tanten",
          "photo_url": "/images/founders/hermes.jpg"
        }
      ],
      "tech_stack": ["Next.js 15", "TypeScript", "Supabase", "OpenAI API"],
      "funding_raised": "Bootstrapped - Supabase free tier",
      "key_milestones": [
        {"title": "Company founded", "date": "2026-01-01", "description": "..."}
      ]
    }
  ]
}
```

---

### Pages Endpoint: `/api/pages`

#### GET /pages/:type - Get Static Page

**Page Types:** `about`, `contact`, `terms`, `privacy`, `careers`, `faq`

**Example:**
```
GET /api/pages/about?lang=id
```

**Success Response:**
```json
{
  "success": true,
  "page": {
    "content_base_id": "uuid",
    "page_type": "about",
    "body": [{"type": "paragraph", "children": [{"text": "About BirruLabs..."}]}],
    "cta_section": [{"type": "paragraph", "children": [{"text": "Contact us"}]}]
  }
}
```

---

## Approval Workflow API

### Approvals Endpoint: `/api/approvals`

#### GET /approvals - Get Pending Approvals

**Protected:** editor, admin only

**Example Request:**
```
GET /api/approvals
Authorization: Bearer <editor_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "pending": [
    {
      "id": "approval-uuid",
      "content_base_id": "content-uuid",
      "content_type": "project",
      "slug": "new-project",
      "submitted_by": "author-uuid",
      "submitted_at": "2026-08-04T10:00:00Z",
      "status": "in_review",
      "reviewer_notes": {"color": "yellow", "notes": "Needs minor changes"}
    }
  ]
}
```

#### POST /approvals/approve - Approve Content

**Protected:** editor, admin only

**Request Body:**
```json
{
  "workflow_id": "approval-uuid",
  "notes": "Looks good, approved"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "result": {
    "id": "approval-uuid",
    "status": "approved",
    "approved_at": "2026-08-04T11:00:00Z",
    "approved_by": "editor-uuid"
  }
}
```

#### POST /approvals/reject - Reject Content

**Request Body:**
```json
{
  "workflow_id": "approval-uuid",
  "feedback": {
    "reason": "Needs more details in results section",
    "suggested_changes": [...]
  }
}
```

---

## Media Management API

### Upload Media: `/api/media/upload`

**Protected:** admin, editor, author

**Form Data:**
```
Content-Type: multipart/form-data

file: <binary>
content_base_id: <optional-uuid>
```

**Success Response (201):**
```json
{
  "success": true,
  "media": {
    "id": "media-uuid",
    "content_base_id": "content-uuid",
    "file_url": "/storage/v1/object/public/media/1722849600-file.jpg",
    "file_name": "hero-image.jpg",
    "file_type": "image/jpeg",
    "file_size": 1024000,
    "width": 1920,
    "height": 1080,
    "alt_text": "Project hero image",
    "usage_count": 0
  }
}
```

### Get Media: `/api/media/:id`

**Protected:** All authenticated users

**Example:**
```
GET /api/media/media-uuid
Authorization: Bearer <token>
```

**Success Response:**
```json
{
  "success": true,
  "media": {
    "id": "media-uuid",
    "file_url": "/storage/v1/object/public/media/1722849600-file.jpg",
    "file_name": "hero-image.jpg",
    "file_type": "image/jpeg",
    "alt_text": "Project hero image",
    "caption": "Team photo"
  }
}
```

---

## Utility Endpoints

### Slug Lookup: `/api/content/slug`

**Purpose:** Find content by slug (frontend routing)

**Query Parameters:**
- `slug` (string): Content slug
- `lang` (string): `id`, `en`

**Example:**
```
GET /api/content/slug?slug=multi-network-affiliate-platform&lang=id
```

**Success Response (200):**
```json
{
  "success": true,
  "content": {
    "id": "content-uuid",
    "content_type": "project",
    "slug": "multi-network-affiliate-platform",
    "language": "id",
    "status": "published",
    "published_at": "2026-08-01T10:00:00Z",
    ...
  }
}
```

### Health Check: `/api/health`

**Public endpoint**

**Success Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-08-04T12:00:00Z",
  "database": "connected",
  "storage": "connected"
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "error": "Error message",
  "code": 400,
  "details": {
    "field": "slug",
    "message": "Slug already exists"
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No content |
| 400 | Bad request (invalid input) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not found |
| 409 | Conflict (e.g., already published) |
| 422 | Unprocessable entity (validation error) |
| 500 | Internal server error |
| 503 | Service unavailable (database offline) |

### Common Errors

#### Duplicate Slug
```json
{
  "error": "Content with this slug already exists",
  "code": 409
}
```

#### Content Requires Approval
```json
{
  "error": "Content requires approval before publishing",
  "code": 400
}
```

#### Unauthorized
```json
{
  "error": "Unauthorized",
  "code": 401
}
```

---

## Content Workflow

### Draft → Review → PublishedFlow

```mermaid
sequenceDiagram
    participantAuthor
    participantAPI
    participantDB
    participantEditor
    
    Author->>API: POST /api/content (draft)
    API->>DB: Insert content_base,Insert type-specific
    DB-->>API: Return content_base_id
    API-->>Author: 201 Created
    
    Author->>API: PUT /api/content/{id} (submit for review)
    API->>DB: Update status=in_review
    DB-->>API: Return updated
    
    Author->>API: POST /api/approvals
    API->>DB: Insert approval_workflow
    DB-->>API: Return workflow_id
    API-->>Editor: Notification: New approval request
    
    Editor->>API: GET /api/approvals (pending)
    API->>DB: Query approval_workflow
    DB-->>API: Return pending workflows
    API-->>Editor: 200 OK
    
    Editor->>API: POST /api/approvals/approve
    API->>DB: Update status=published,Update content_base
    DB-->>API: Return updated
    API-->>Editor: 200 OK
    
    Author->>API: GET /api/content/{id}
    API->>DB: Query content_base
    DB-->>API: Return published content
    API-->>Author: 200 OK
```

### Content Status Transitions

```
Draft (created)
  ↓ submit_for_review
In Review (editor assigned)
  ↓ approve
Published (visible to public)
  ↓ set_unfeatured/deprecated
Deprecated (retained, not edited)
  ↓ archive
Archived (read-only, hidden)

Draft (created)
  ↓ reject
Needs Changes (author revises)
  ↓ resubmit
In Review
```

---

## Rate Limiting

### Policy

| Endpoint | Request/Min | Max Burst |
|----------|-------------|-----------|
| `/api/content/*` | 60 | 10 |
| `/api/projects/*` | 60 | 10 |
| `/api/articles/*` | 60 | 10 |
| `/api/casestudies/*` | 60 | 10 |
| `/api/startup-profiles/*` | 60 | 10 |
| `/api/media/upload` | 10 | 2 |
| `/api/approvals/*` | 30 | 5 |

### Rate Limit Response

```json
{
  "error": "Rate limit exceeded",
  "code": 429,
  "retry_after": 60
}
```

---

## Caching Strategy

### Client-Side Caching

```typescript
// SWR configuration
const useContent = (id: string) => {
  return useSWR(`/api/content/${id}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000
  });
};
```

### Server-Side Caching

| Content Type | TTL | Cache Key |
|--------------|-----|-----------|
| Published content | 1 hour | `content:{id}:{lang}` |
| Lists | 5 minutes | `content:list:{type}:{status}:{lang}` |
| Approval workflows | 0 (no cache) | - |

---

## Versioning

### Current Version: v1

### future Versions

- **v2 (Planned):** GraphQL endpoints
- **v3 (Future):** Real-time subscriptions

### Version Header

```
API-Version: 1
```

---

## Webhooks (Future)

### Content Webhook Events

| Event | Payload |
|-------|---------|
| `content.published` | Content base object |
| `content.updated` | Content base object |
| `content.approved` | Approval workflow object |
| `media.uploaded` | Media asset object |

---

## Documentation & Testing

### API Documentation

- **OpenAPI/Swagger:** Available at `/api/docs`
- **Postman Collection:** `/docs/api/reference.postman_collection.json`

### Testing

```bash
# Run API tests
npm run test:api

# Generate test coverage
npm run test:coverage
```

---

## Security Considerations

### Input Validation

```typescript
// Validate content structure
const ProjectSchema = z.object({
  content_type: z.literal('project'),
  data: z.object({
    slug: z.string().min(3).max(100),
    category: z.enum(['ai', 'automation', 'agents', 'custom']),
    client_name: z.string().nullable(),
    is_confidential: z.boolean(),
    summary: z.array(PortableTextSchema),
    challenges: z.array(z.array(PortableTextSchema)),
    solutions: z.array(z.array(PortableTextSchema)),
    results: z.array(z.array(PortableTextSchema)),
    technical_stack: z.array(z.string()).max(20)
  })
});
```

### SQL Injection Protection

```typescript
// Always use parameterized queries
const { data, error } = await supabase
  .from('content.content_base')
  .select('*')
  .eq('id', contentId)
  .single();
```

### XSS Protection

```typescript
// Sanitize user input
import DOMPurify from 'dompurify';

const sanitizeContent = (content: any[]): any[] => {
  return content.map(node => {
    if (node.children) {
      return { ...node, children: node.children.map(sanitizeText) };
    }
    return node;
  });
};

const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};
```

---

## Performance Optimizations

### Database Indexes

```sql
CREATE INDEX idx_content_base_status ON content.content_base(status);
CREATE INDEX idx_content_base_slug ON content.content_base(slug, language);
CREATE INDEX idx_content_base_type ON content.content_base(content_type, language);
CREATE INDEX idx_projects_category ON content.projects(category);
CREATE INDEX idx_articles_type ON content.articles(type);
CREATE INDEX idx_casestudies_industry ON content.casestudies(industry);
CREATE INDEX idx_startup_profiles_program ON content.startup_profiles(program);
```

### Query Optimization

- Use views for complex joins (`v_published_projects`, etc.)
- Limit result sets with pagination
- Use appropriate indexes for filter queries
- Cache frequently accessed content

---

## Migration Guide

### From v0 to v1

1. Run database migrations
2. Update API client to use v1 endpoints
3. Update content types to match new schema
4. Reconfigure authentication middleware

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**Maintained By:** Backend Engineer Team
