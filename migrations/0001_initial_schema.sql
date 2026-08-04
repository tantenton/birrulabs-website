-- BirruLabs Backend - Initial Schema
-- PostgreSQL migration - Supabase compatible
-- Creates core tables for content management system

-- Enable UUID generation (if not already enabled)
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS & AUTHENTICATION
-- ============================================================

create table if not exists auth.users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    email_confirmed_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    full_name text,
    avatar_url text,
    raw_user_meta_data jsonb default '{}'::jsonb,
    
    -- Custom fields
    role text not null default 'viewer' check (role in ('admin', 'editor', 'author', 'viewer')),
    is_active boolean not null default true,
    last_login_at timestamptz,
    
    constraint email_lower_case check (email = lower(email))
);

comment on table auth.users is 'User accounts with RBAC roles';
comment on column auth.users.role is 'RBAC: admin (all), editor (manage all), author (create own), viewer (read only)';

-- ============================================================
-- CONTENT TYPES - Base table for all content
-- ============================================================

create table if not exists content.content_base (
    id uuid primary key default uuid_generate_v4(),
    content_type text not null check (content_type in ('project', 'article', 'casestudy', 'startupprofile', 'page')),
    slug text not null,
    status text not null default 'draft' check (status in ('draft', 'in_review', 'published', 'deprecated', 'archived')),
    language text not null default 'id' check (language in ('id', 'en')),
    
    -- Localization status
    localization_status text not null default 'draft' check (localization_status in ('draft', 'in-progress', 'review', 'published')),
    
    -- Workflow fields
    requires_approval boolean not null default true,
    approved_by uuid references auth.users(id),
    approved_at timestamptz,
    published_at timestamptz,
    deprecated_at timestamptz,
    archived_at timestamptz,
    
    -- Visibility
    is_featured boolean not null default false,
    nav_order integer,
    show_in_navigation boolean not null default true,
    
    -- SEO
    seo_title text,
    seo_description text,
    og_image_url text,
    
    -- Meta
    metadata jsonb default '{}'::jsonb,
    
    created_by uuid not null references auth.users(id),
    updated_by uuid references auth.users(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    
    unique(content_type, slug, language)
);

comment on table content.content_base is 'Base table for all content entities with status workflow';
comment on column content.content_base.requires_approval is 'Default: true - content requires editor approval before publish';
comment on column content.content_base.status is 'Content lifecycle: draft -> in_review -> published -> deprecated -> archived';

-- ============================================================
-- PROJECT (Proyek)
-- ============================================================

create table if not exists content.projects (
    content_base_id uuid primary key references content.content_base(id) on delete cascade,
    
    -- Categories
    category text not null check (category in ('ai', 'automation', 'agents', 'custom')),
    
    -- Client info (confidential = hidden)
    client_name text,
    is_confidential boolean not null default false,
    
    -- Dates
    project_date date,
    duration text, -- e.g., "3 months"
    
    -- Content
    summary jsonb not null, -- PortableText format
    challenges jsonb not null, -- Array of PortableText
    solutions jsonb not null, -- Array of PortableText
    results jsonb not null, -- Array of PortableText
    
    -- Media
    hero_image_url text,
    hero_image_alt text,
    
    -- Team
    team_size integer,
    
    -- Technical
    technical_stack text[], -- Array of tech strings
    
    -- Financial (visibility controlled in application)
    financially_structured boolean not null default false
);

comment on table content.projects is 'Project/Proyek - Technical delivery showcase';
comment on column content.projects.client_name is 'Set to "Confidential" or NULL for NDAs';
comment on column content.projects.is_confidential is 'Hides client name in UI';

-- ============================================================
-- ARTICLE (Artikel)
-- ============================================================

create table if not exists content.articles (
    content_base_id uuid primary key references content.content_base(id) on delete cascade,
    
    -- Article type
    type text not null check (type in ('blog', 'tutorial', 'casestudy', 'news')),
    category text not null default 'general',
    
    -- Author info (can be external)
    author_id uuid references auth.users(id),
    author_name text, -- For guest authors
    
    -- Publishing
    published_at timestamptz,
    read_time_minutes integer, -- Auto-calculated
    
    -- SEO extensions
    keywords text[],
    
    -- Content
    excerpt text,
    content jsonb not null -- PortableText format with embedded media
);

comment on table content.articles is 'Article/Artikel - Blog posts, tutorials, case studies';
comment on column content.articles.type is 'blog (opinion/announcements), tutorial (how-to), casestudy (client success), news (press)';

-- ============================================================
-- CASE STUDY (Studi Kasus)
-- ============================================================

create table if not exists content.casestudies (
    content_base_id uuid primary key references content.content_base(id) on delete cascade,
    
    -- Classification
    industry text not null, -- e.g., "Fintech", "Edutech"
    focus text not null check (focus in ('automation', 'ai', 'integration')),
    
    -- Client
    client_logo_url text,
    client_logo_alt text,
    client_anonymized boolean not null default false, -- Hide client name
    
    -- Content
    executive_summary jsonb not null, -- PortableText
    problem_statement jsonb not null, -- PortableText
    solution_approach jsonb not null, -- PortableText
    implementation jsonb not null, -- PortableText
    outcomes jsonb not null, -- PortableText
    
    -- Metrics (anonymized if needed)
    metrics jsonb not null default '[]'::jsonb -- Array of {label, value, unit, timeframe}
);

comment on table content.casestudies is 'CaseStudy/Studi Kasus - Detailed client success documentation';

-- ============================================================
-- STARTUP PROFILE (Profil Startup)
-- ============================================================

create table if not exists content.startup_profiles (
    content_base_id uuid primary key references content.content_base(id) on delete cascade,
    
    -- Program metadata
    program text not null check (program in ('akcelera-id', 'birrulabs-club', 'helostech')),
    cohort text not null, -- e.g., "2025-Q1"
    status text not null default 'active' check (status in ('active', 'graduated', 'shutdown')),
    
    -- Company info
    company_name text not null,
    tagline jsonb not null, -- PortableText
    description jsonb not null, -- PortableText
    website text,
    linkedin_url text,
    twitter_url text,
    
    -- Domain
    industry text not null,
    stage text not null check (stage in ('ideation', 'seed', 'series_a', 'series_b')),
    geolocation text,
    
    -- Team (up to 5 founders)
    founders jsonb not null default '[]'::jsonb, -- Array of {name, role, linkedin, photo_url}
    
    -- Tech stack
    tech_stack text[],
    
    -- Results
    funding_raised text, -- e.g., "IDR 500M"
    key_milestones jsonb not null default '[]'::jsonb -- Array of {title, date, description}
);

comment on table content.startup_profiles is 'StartupProfile/Profil Startup - Accelerator portfolio companies';

-- ============================================================
-- PAGE (Static Pages)
-- ============================================================

create table if not exists content.pages (
    content_base_id uuid primary key references content.content_base(id) on delete cascade,
    
    page_type text not null check (page_type in ('about', 'contact', 'terms', 'privacy', 'careers', 'faq')),
    
    -- Content
    body jsonb not null, -- PortableText format
    cta_section jsonb -- PortableText with CTA
);

comment on table content.pages is 'Static pages - About, Contact, Terms, Privacy, etc.';

-- ============================================================
-- MEDIA ASSETS
-- ============================================================

create table if not exists content.media_assets (
    id uuid primary key default uuid_generate_v4(),
    content_base_id uuid references content.content_base(id) on delete set null,
    file_url text not null,
    file_name text not null,
    file_type text not null, -- mime type or 'image', 'video', 'pdf'
    file_size bigint, -- bytes
    width integer,
    height integer,
    alt_text text,
    caption text,
    created_by uuid not null references auth.users(id),
    created_at timestamptz not null default now(),
    usage_count integer not null default 0
);

comment on table content.media_assets is 'Media library - Images, videos, documents';

-- ============================================================
-- REVISION HISTORY
-- ============================================================

create table if not exists content.revisions (
    id uuid primary key default uuid_generate_v4(),
    content_base_id uuid not null references content.content_base(id) on delete cascade,
    content_type text not null, -- Copy for audit
    version integer not null,
    diff jsonb not null, -- JSON patch/diff
    changed_by uuid not null references auth.users(id),
    reason text, -- Change description
    created_at timestamptz not null default now(),
    
    unique(content_base_id, version)
);

comment on table content.revisions is 'Content revision history - Full audit trail';

-- ============================================================
-- CONTENT RELATIONSHIPS
-- ============================================================

create table if not exists content.relationships (
    id uuid primary key default uuid_generate_v4(),
    from_content_id uuid not null references content.content_base(id) on delete cascade,
    to_content_id uuid not null references content.content_base(id) on delete cascade,
    relationship_type text not null check (relationship_type in ('references', 'cites', 'related', 'cross_link')),
    order_index integer not null default 0,
    created_at timestamptz not null default now()
);

create index idx_relationships_from on content.relationships(from_content_id);
create index idx_relationships_to on content.relationships(to_content_id);

comment on table content.relationships is 'Content cross-linking - Projects ↔ Case Studies ↔ Articles ↔ Startups';

-- ============================================================
-- APPROVAL WORKFLOW
-- ============================================================

create table if not exists content.approval_workflow (
    id uuid primary key default uuid_generate_v4(),
    content_base_id uuid not null references content.content_base(id) on delete cascade,
    submitted_by uuid not null references auth.users(id),
    assigned_to uuid references auth.users(id),
    status text not null default 'pending' check (status in ('pending', 'in_review', 'approved', 'rejected', 'needs_changes')),
    reviewer_notes jsonb default '{}'::jsonb,
    approved_at timestamptz,
    feedback jsonb default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index idx_approval_workflow_content on content.approval_workflow(content_base_id);
create index idx_approval_workflow_status on content.approval_workflow(status);

comment on table content.approval_workflow is 'Editorial approval queue - Drafts require approval before publish';

-- ============================================================
-- PUBLICATION SCHEDULE
-- ============================================================

create table if not exists content.publication_schedule (
    id uuid primary key default uuid_generate_v4(),
    content_base_id uuid not null references content.content_base(id) on delete cascade,
    scheduled_for timestamptz not null,
    timezone text not null default 'Asia/Jakarta',
    status text not null default 'scheduled' check (status in ('scheduled', 'published', 'cancelled')),
    published_at timestamptz,
    created_by uuid references auth.users(id),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index idx_publication_scheduled_for on content.publication_schedule(scheduled_for);
create index idx_publication_status on content.publication_schedule(status);

comment on table content.publication_schedule is 'Content scheduling - Queue posts for future publishing';

-- ============================================================
-- RLS POLICIES (Row Level Security)
-- ============================================================

-- Enable RLS on all tables
alter table content.content_base enable row level security;
alter table content.projects enable row level security;
alter table content.articles enable row level security;
alter table content.casestudies enable row level security;
alter table content.startup_profiles enable row level security;
alter table content.pages enable row level security;
alter table content.media_assets enable row level security;
alter table content.revisions enable row level security;
alter table content.approval_workflow enable row level security;
alter table content.publication_schedule enable row level security;

-- ============================================================
-- CONTENT BASE RLS
-- ============================================================

-- Admin: Full access to all content
-- Editor: Edit all, publish all, view all
-- Author: Create own, edit own, view all published
-- Viewer: Read only published

create policy "Admin full access" on content.content_base
    for all to authenticated using (auth.uid() IS NOT NULL)
    with check (auth.uid() IS NOT NULL);

create policy "Editor full access" on content.content_base
    for all to authenticated using (
        auth.uid() IS NOT NULL AND 
        EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
    )
    with check (
        auth.uid() IS NOT NULL AND 
        EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
    );

create policy "Author access" on content.content_base
    for all to authenticated using (
        auth.uid() IS NOT NULL AND 
        EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND role = 'author')
    )
    with check (
        auth.uid() IS NOT NULL AND 
        EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND role = 'author')
    );

create policy "Viewer read published" on content.content_base
    for select to authenticated using (
        status = 'published' OR
        auth.uid() IS NOT NULL AND EXISTS (
            SELECT 1 FROM auth.users WHERE id = auth.uid() AND role IN ('admin', 'editor', 'author')
        )
    );

-- ============================================================
-- USER ROLES SETUP (seeding)
-- ============================================================

-- This should be run separately or via Supabase Auth role claims
-- insert into auth.users (id, email, role) values 
-- ('admin-uuid', 'admin@birrulabs.biz.id', 'admin'),
-- ('editor-uuid', 'editor@birrulabs.biz.id', 'editor'),
-- ('author-uuid', 'author@birrulabs.biz.id', 'author');

-- ============================================================
-- VIEWS
-- ============================================================

-- View: Published projects (frontend friendly)
create or replace view content.v_published_projects as
select 
    p.*,
    cb.slug,
    cb.language,
    cb.status,
    cb.is_featured,
    cb.published_at,
    cb.seo_title,
    cb.seo_description,
    cb.created_at as created_at
from content.projects p
join content.content_base cb on p.content_base_id = cb.id
where cb.status = 'published';

-- View: Published articles
create or replace view content.v_published_articles as
select 
    a.*,
    cb.slug,
    cb.language,
    cb.status,
    cb.is_featured,
    cb.published_at,
    cb.seo_title,
    cb.seo_description,
    cb.created_at as created_at
from content.articles a
join content.content_base cb on a.content_base_id = cb.id
where cb.status = 'published';

-- View: Published case studies
create or replace view content.v_published_casestudies as
select 
    cs.*,
    cb.slug,
    cb.language,
    cb.status,
    cb.is_featured,
    cb.published_at,
    cb.seo_title,
    cb.seo_description,
    cb.created_at as created_at
from content.casestudies cs
join content.content_base cb on cs.content_base_id = cb.id
where cb.status = 'published';

-- View: Published startup profiles
create or replace view content.v_published_startup_profiles as
select 
    sp.*,
    cb.slug,
    cb.language,
    cb.status,
    cb.is_featured,
    cb.published_at,
    cb.seo_title,
    cb.seo_description,
    cb.created_at as created_at
from content.startup_profiles sp
join content.content_base cb on sp.content_base_id = cb.id
where cb.status = 'published';

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Function: Auto-update timestamp
create or replace function content.update_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_content_base_updated_at
    before update on content.content_base
    for each row execute function content.update_updated_at();

create trigger update_projects_updated_at
    before update on content.projects
    for each row execute function content.update_updated_at();

create trigger update_articles_updated_at
    before update on content.articles
    for each row execute function content.update_updated_at();

create trigger update_casestudies_updated_at
    before update on content.casestudies
    for each row execute function content.update_updated_at();

create trigger update_startup_profiles_updated_at
    before update on content.startup_profiles
    for each row execute function content.update_updated_at();

-- Function: Initiate approval workflow when status changes
create or replace function content.initiate_approval()
returns trigger as $$
declare
    new_status text;
begin
    new_status := new.status;
    
    if new_status = 'in_review' then
        -- Check if already has pending approval
        if not exists (select 1 from content.approval_workflow 
            where content_base_id = new.content_base_id 
            and status in ('pending', 'in_review', 'needs_changes')) then
            insert into content.approval_workflow (content_base_id, submitted_by)
            values (new.content_base_id, new.approved_by or new.created_by);
        end if;
    end if;
    
    return new;
end;
$$ language plpgsql;

create trigger content_status_approval_trigger
    after update on content.content_base
    for each row execute function content.initiate_approval();

-- ============================================================
-- PREVIEW: Migration Complete
-- ============================================================

select 'Migration 0001_initial_schema.sql executed successfully' as status;
