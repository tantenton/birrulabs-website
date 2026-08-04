-- BirruLabs Backend - Sample Data
-- PostgreSQL seeding migration
-- Creates initial users, sample content, and relationships

-- ============================================================
-- SEED: USERS (with hashed passwords - for demonstration)
-- In production, use Supabase Auth for password management
-- ============================================================

-- Insert test users (passwords should be set via Supabase Auth dashboard)
-- Role mapping: admin, editor, author, viewer
insert into auth.users (id, email, role, full_name, is_active)
values 
    -- Admin (full access)
    ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'admin@birrulabs.biz.id', 'admin', 'System Admin', true),
    -- Editor (can publish)
    ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'editor@birrulabs.biz.id', 'editor', 'Content Editor', true),
    -- Author (can createDraft)
    ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'author@birrulabs.biz.id', 'author', 'Staff Writer', true),
    -- Viewer (read only)
    ('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 'viewer@birrulabs.biz.id', 'viewer', 'Partner Portal', true)
on conflict (email) do nothing;

comment on table auth.users is 'Sample test users for development';

-- ============================================================
-- SEED: CONTENT BASE - Projects
-- ============================================================

-- Project 1: Multi-Network Affiliate Platform (Featured)
insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('project', 'multi-network-affiliate-platform', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '1 day', true, 1,
     'Platform Multi-Network Affiliate - BirruLabs', 
     ' Integrasi unifikasi 10+ network affiliate dengan AI content generation', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3')
returning id into贴'project_id_1';

-- Project 1 English translation
insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('project', 'multi-network-affiliate-platform', 'published', 'en', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '1 day', true, 1,
     'Multi-Network Affiliate Platform - BirruLabs', 
     'Unified integration of 10+ affiliate networks with AI content generation', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3')
returning id into贴'project_id_1_en';

-- Project 2: Multi-Agent Orchestration System
insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('project', 'multi-agent-orchestration-system', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '2 days', false, 2,
     'Sistem Orkestrasi Multi-Agent - BirruLabs', 
     'Koordinasi 4+ agent AI untuk automation social media dan content creation', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3');

-- Project 3: AI Creative Factory
insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('project', 'ai-creative-factory', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '3 days', false, 3,
     'Pabrik Kreatif AI - BirruLabs', 
     'Generate gambar, video, voice-over dengan QC pipeline otomatis', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3');

-- ============================================================
-- SEED: PROJECTS TABLE DATA
-- ============================================================

insert into content.projects (content_base_id, category, client_name, is_confidential, 
    project_date, duration, summary, challenges, solutions, results, 
    hero_image_url, team_size, technical_stack, financially_structured)
values 
    -- Project 1 ID
    (
        (select id from content.content_base where slug = 'multi-network-affiliate-platform' and language = 'id'),
        'automation',
        'Startup Fintech Indonesia',
        false,
        '2025-12-01',
        '3 bulan',
        's=[{"type":"paragraph","children":[{"text":"Platform unified untuk mengelola affiliate marketing di 10+ network sekaligus."}]}]',
        '[{"type":"paragraph","children":[{"text":"Affiliate marketer mengelola 5-15 network terpisah dengan API yang berbeda."}]}]',
        '[{"type":"paragraph","children":[{"text":"Adapter pattern untuk setiap network + dashboard unifikasi."}]}]',
        '[{"type":"paragraph","children":[{"text":"Waktu management turun 70%, revenue per user naik 2.3x."}]}]',
        '/images/projects/affiliate-platform-hero.jpg',
        3,
        '["Next.js 15", "Node.js", "Supabase", "Redis", "BullMQ"]',
        true
    ),
    -- Project 1 EN
    (
        (select id from content.content_base where slug = 'multi-network-affiliate-platform' and language = 'en'),
        'automation',
        'Fintech Startup Indonesia',
        false,
        '2025-12-01',
        '3 months',
        's=[{"type":"paragraph","children":[{"text":"Unified platform for managing affiliate marketing across 10+ networks."}]}]',
        '[{"type":"paragraph","children":[{"text":"Affiliate marketers managing 5-15 separate networks with different APIs."}]}]',
        '[{"type":"paragraph","children":[{"text":"Adapter pattern for each network + unified dashboard."}]}]',
        '[{"type":"paragraph","children":[{"text":"70% reduction in management time, 2.3x revenue per user."}]}]',
        '/images/projects/affiliate-platform-hero.jpg',
        3,
        '["Next.js 15", "Node.js", "Supabase", "Redis", "BullMQ"]',
        true
    );

-- ============================================================
-- SEED: CONTENT BASE - Articles
-- ============================================================

insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('article', 'ai-content-generation-guide', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '4 days', true, 1,
     'Panduan AI Content Generation untuk Affiliate Marketing', 
     'Cara menggunakan GPT-4 untuk generate ulasan produk SEO otomatis', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3'),
    
    ('article', 'multi-agent-architecture', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '5 days', false, 2,
     'Arsitektur Multi-Agent System untuk Automation', 
     'Desain pattern untuk koordinasi CEO, Research, Creative, QC agents', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3'),
    
    ('article', 'mobile-first-affiliate-ui', 'published', 'en', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '6 days', true, 3,
     'Mobile-First Affiliate UI Design', 
     'Best practices for mobile affiliate marketing experience', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3');

-- ============================================================
-- SEED: ARTICLES TABLE DATA
-- ============================================================

insert into content.articles (content_base_id, type, category, author_id, author_name,
    published_at, read_time_minutes, keywords, excerpt, content)
values 
    (
        (select id from content.content_base where slug = 'ai-content-generation-guide' and language = 'id'),
        'tutorial',
        'content',
        'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
        'Hermes Agent',
        now() - interval '4 days',
        8,
        '["AI content", "affiliate marketing", "SEO", "GPT-4"]',
        'Panduan lengkap implementasi AI content generation untuk affiliate marketers dengan OpenAI API.',
        's=[{"type":"paragraph","children":[{"text":"1. Setup OpenAI API key di Supabase Edge Function."}]}]'
    ),
    (
        (select id from content.content_base where slug = 'multi-agent-architecture' and language = 'id'),
        'blog',
        'architecture',
        'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
        'Hermes Agent',
        now() - interval '5 days',
        12,
        '["multi-agent", "orchestration", "AI system design"]',
        'Deep dive arsitektur multi-agent dengan CEO orchestrator untuk automation workflow.',
        's=[{"type":"paragraph","children":[{"text":"Sistem AI modern membutuhkan koordinasi antar spesialis."}]}]'
    ),
    (
        (select id from content.content_base where slug = 'mobile-first-affiliate-ui' and language = 'en'),
        'blog',
        'design',
        'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
        'Hermes Agent',
        now() - interval '6 days',
        6,
        '["mobile ui", "affiliate", "UX design"]',
        'Design patterns for mobile-first affiliate marketing platforms with 60%+ mobile traffic.',
        's=[{"type":"paragraph","children":[{"text":"60%+ traffic comes from mobile devices."}]}]'
    );

-- ============================================================
-- SEED: CONTENT BASE - Case Studies
-- ============================================================

insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('casestudy', 'fintech-startup-affiliate-success', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '10 days', true, 1,
     'Studi Kasus: Fintech Startup Affiliate Success', 
     'Platform affiliate dengan 10 network integration meningkatkan revenue 2.3x', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3');

-- ============================================================
-- SEED: CASE STUDIES TABLE DATA
-- ============================================================

insert into content.casestudies (content_base_id, industry, focus, 
    client_logo_url, client_anonymized, 
    executive_summary, problem_statement, solution_approach, implementation, outcomes,
    metrics)
values 
    (
        (select id from content.content_base where slug = 'fintech-startup-affiliate-success' and language = 'id'),
        'Fintech',
        'automation',
        '/images/casestudies/fintech-logo.svg',
        false,
        '{"type":"paragraph","children":[{"text":"Fintech startup Indonesia membutuhkan sistem affiliate yang dapat menskalakan revenue tanpa menambah tim content."}]}',
        '{"type":"paragraph","children":[{"text":"Affiliate marketer mengelola 15 network terpisah dengan API każdy yang berbeda, menghabiskan 80% waktu untuk admin bukan content creation."}]}',
        '{"type":"paragraph","children":[{"text":"Build unified platform dengan adapter pattern untuk setiap network + gpt-4o-mini untuk auto content generation."}]}',
        '{"type":"paragraph","children":[{"text":"Implementasi dalam 3 bulan: 10 adapter networks, content pipeline, SEO optimizer, dashboard analytics."}]}',
        '[{"type":"paragraph","children":[{"text":"Revenue increases 2.3x within 3 months"}]}]',
        '[{"label":"Revenue increase","value":"130","unit":"percent","timeframe":"3 months"},{"label":"Time saved","value":"70","unit":"percent","timeframe":"monthly"},{"label":"Products indexed","value":"500","unit":"number","timeframe":"ongoing"}]'
    );

-- ============================================================
-- SEED: CONTENT BASE - Startup Profiles
-- ============================================================

insert into content.content_base (content_type, slug, status, language, localization_status, 
    requires_approval, approved_by, approved_at, is_featured, nav_order, 
    seo_title, seo_description, created_by)
values 
    ('startupprofile', 'birrulabs', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '7 days', true, 1,
     'Profil Startup: BirruLabs', 
     'AI-native technical services company untuk affiliate automation dan social media', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3'),
    
    ('startupprofile', 'birrulabs-club-member-1', 'published', 'id', 'published',
     true, 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', now() - interval '8 days', false, 2,
     'Profil Startup: BirruLabs Club', 
     'Member program accelerator untuk early-stage AI startups', 
     'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3');

-- ============================================================
-- SEED: STARTUP PROFILES TABLE DATA
-- ============================================================

insert into content.startup_profiles (content_base_id, program, cohort, status,
    company_name, tagline, description, website, linkedin_url,
    industry, stage, geolocation,
    founders, tech_stack, funding_raised, key_milestones)
values 
    -- BirruLabs
    (
        (select id from content.content_base where slug = 'birrulabs' and language = 'id'),
        'birrulabs-club',
        '2025-Q4',
        'active',
        'BirruLabs',
        '{"type":"paragraph","children":[{"text":"AI-native technical services untuk automation, agent systems, dan creative factory"}]}',
        '{"type":"paragraph","children":[{"text":"BirruLabs adalah studio membangun sistem AI praktis yang bekerja beyond demo..."}]}',
        'https://birrulabs.biz.id',
        'https://linkedin.com/company/birrulabs',
        'Technical Services, AI Automation',
        'seed',
        'Indonesia',
        '[{"name":"Hermes Agent","role":"Founder & CEO Orchestrator","linkedin":"https://linkedin.com/in/tanten","photo_url":"/images/founders/hermes.jpg"}]',
        '["Next.js 15", "TypeScript", "Supabase", "OpenAI API", "BullMQ", "Tailwind CSS"]',
        'Bootstrapped - Supabase free tier',
        '[{"title":"Company founded","date":"2026-01-01","description":"Started as solo founder with multi-agent AI coordination"},{"title":"First product launched","date":"2026-04-01","description":"BirruAff Hub MVP live with ClickBank integration"}]'
    ),
    -- BirruLabs EN
    (
        (select id from content.content_base where slug = 'birrulabs' and language = 'en'),
        'birrulabs-club',
        '2025-Q4',
        'active',
        'BirruLabs',
        '{"type":"paragraph","children":[{"text":"AI-native technical services for automation, agent systems, and creative factory"}]}',
        '{"type":"paragraph","children":[{"text":"BirruLabs is a studio building practical AI systems that work beyond the demo..."}]}',
        'https://birrulabs.biz.id',
        'https://linkedin.com/company/birrulabs',
        'Technical Services, AI Automation',
        'seed',
        'Indonesia',
        '[{"name":"Hermes Agent","role":"Founder & CEO Orchestrator","linkedin":"https://linkedin.com/in/tanten","photo_url":"/images/founders/hermes.jpg"}]',
        '["Next.js 15", "TypeScript", "Supabase", "OpenAI API", "BullMQ", "Tailwind CSS"]',
        'Bootstrapped - Supabase free tier',
        '[{"title":"Company founded","date":"2026-01-01","description":"Started as solo founder with multi-agent AI coordination"},{"title":"First product launched","date":"2026-04-01","description":"BirruAff Hub MVP live with ClickBank integration"}]'
    );

-- ============================================================
-- SEED: RELATIONSHIPS
-- ============================================================

-- Project -> Case Study
insert into content.relationships (from_content_id, to_content_id, relationship_type, order_index)
values 
    (
        (select content_base_id from content.projects where content_base_id = (select content_base_id from content.content_base where slug = 'multi-network-affiliate-platform' and language = 'id')),
        (select content_base_id from content.casestudies where content_base_id = (select content_base_id from content.content_base where slug = 'fintech-startup-affiliate-success' and language = 'id')),
        'references',
        0
    );

-- Article -> Startup Profile
insert into content.relationships (from_content_id, to_content_id, relationship_type, order_index)
values 
    (
        (select content_base_id from content.articles where content_base_id = (select content_base_id from content.content_base where slug = 'ai-content-generation-guide' and language = 'id')),
        (select content_base_id from content.startup_profiles where content_base_id = (select content_base_id from content.content_base where slug = 'birrulabs' and language = 'id')),
        'cites',
        0
    );

-- ============================================================
-- SEED: APPROVAL WORKFLOW
-- ============================================================

-- Approval for newly submitted content (test data)
insert into content.approval_workflow (content_base_id, submitted_by, assigned_to, status, reviewer_notes)
values 
    (
        (select id from content.content_base where slug = 'birrulabs-club-member-1' and language = 'id'),
        'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
        'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
        'approved',
        '{"notes":"Approved for publication","color":"green"}'
    );

-- ============================================================
-- SEED: PUBLICATION SCHEDULE
-- ============================================================

-- Future scheduled posts (for demo)
insert into content.publication_schedule (content_base_id, scheduled_for, timezone, status)
values 
    (
        (select id from content.content_base where slug = 'birrulabs-club-member-1' and language = 'id'),
        now() + interval '7 days',
        'Asia/Jakarta',
        'scheduled'
    );

-- ============================================================
-- PREVIEW: Seed Complete
-- ============================================================

select 'Migration 0002_seed_data.sql executed successfully' as status;
