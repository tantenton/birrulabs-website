import { createClient } from '@supabase/supabase-js';
import { DATABASE_URL, ANON_KEY } from '$env/static/private';

// Supabase client
export const supabase = createClient(DATABASE_URL, ANON_KEY);

// ============================================================
// TYPES
// ============================================================

export type ContentType = 'project' | 'article' | 'casestudy' | 'startupprofile' | 'page';
export type ContentStatus = 'draft' | 'in_review' | 'published' | 'deprecated' | 'archived';
export type LocalizationStatus = 'draft' | 'in-progress' | 'review' | 'published';
export type Role = 'admin' | 'editor' | 'author' | 'viewer';

// User
export interface User {
  id: string;
  email: string;
  role: Role;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  last_login_at: string | null;
}

// Base content
export interface ContentBase {
  id: string;
  content_type: ContentType;
  slug: string;
  status: ContentStatus;
  language: 'id' | 'en';
  localization_status: LocalizationStatus;
  requires_approval: boolean;
  approved_by: string | null;
  approved_at: string | null;
  published_at: string | null;
  deprecated_at: string | null;
  archived_at: string | null;
  is_featured: boolean;
  nav_order: number | null;
  show_in_navigation: boolean;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  metadata: Record<string, unknown>;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

// Portfolio
export interface Project {
  content_base_id: string;
  category: 'ai' | 'automation' | 'agents' | 'custom';
  client_name: string | null;
  is_confidential: boolean;
  project_date: string | null;
  duration: string | null;
  summary: any[]; // PortableText
  challenges: any[]; // Array<PortableText>
  solutions: any[]; // Array<PortableText>
  results: any[]; // Array<PortableText>
  hero_image_url: string | null;
  hero_image_alt: string | null;
  team_size: number | null;
  technical_stack: string[];
  financially_structured: boolean;
}

// Blog
export interface Article {
  content_base_id: string;
  type: 'blog' | 'tutorial' | 'casestudy' | 'news';
  category: string;
  author_id: string | null;
  author_name: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  keywords: string[];
  excerpt: string | null;
  content: any[]; // PortableText
}

// Case Studies
export interface CaseStudy {
  content_base_id: string;
  industry: string;
  focus: 'automation' | 'ai' | 'integration';
  client_logo_url: string | null;
  client_logo_alt: string | null;
  client_anonymized: boolean;
  executive_summary: any[]; // PortableText
  problem_statement: any[]; // PortableText
  solution_approach: any[]; // PortableText
  implementation: any[]; // PortableText
  outcomes: any[]; // PortableText
  metrics: Array<{
    label: string;
    value: string;
    unit?: 'percent' | 'currency' | 'number';
    timeframe: string;
  }>;
}

// Startup Profles
export interface StartupProfile {
  content_base_id: string;
  program: 'akcelera-id' | 'birrulabs-club' | 'helostech';
  cohort: string;
  status: 'active' | 'graduated' | 'shutdown';
  company_name: string;
  tagline: any[]; // PortableText
  description: any[]; // PortableText
  website: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  industry: string;
  stage: 'ideation' | 'seed' | 'series_a' | 'series_b';
  geolocation: string;
  founders: Array<{
    name: string;
    role: string;
    linkedin: string | null;
    photo_url: string | null;
  }>;
  tech_stack: string[];
  funding_raised: string | null;
  key_milestones: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

// Pages
export interface Page {
  content_base_id: string;
  page_type: 'about' | 'contact' | 'terms' | 'privacy' | 'careers' | 'faq';
  body: any[]; // PortableText
  cta_section: any[] | null; // PortableText
}

// Media Assets
export interface MediaAsset {
  id: string;
  content_base_id: string | null;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number | null;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  caption: string | null;
  created_by: string;
  created_at: string;
  usage_count: number;
}

// Approval Workflow
export interface ApprovalWorkflow {
  id: string;
  content_base_id: string;
  submitted_by: string;
  assigned_to: string | null;
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'needs_changes';
  reviewer_notes: Record<string, unknown>;
  approved_at: string | null;
  feedback: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================
// API CLIENT
// ============================================================

export const db = {
  // Content management
  contentBase: {
    /**
     * Get by ID
     */
     getById: async (id: string) => {
       const { data, error } = await supabase
         .from('content.content_base')
         .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as ContentBase;
    },

    /**
     * Get all published content
     */
    getPublished: async (lang: 'id' | 'en' = 'id', type?: ContentType) => {
      const query = supabase
        .from('content.content_base')
        .select('*')
        .eq('status', 'published')
        .eq('language', lang)
        .order('published_at', { ascending: false });

      const { data, error } = type ? query.eq('content_type', type) : query;

      if (error) throw error;
      return data as ContentBase[];
    },

    /**
     * Create content
     */
    create: async (data: Partial<ContentBase>) => {
      const { data: result, error } = await supabase
        .from('content.content_base')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },

    /**
     * Update content
     */
    update: async (id: string, data: Partial<ContentBase>) => {
      const { data: result, error } = await supabase
        .from('content.content_base')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },

    /**
     * Delete content
     */
    delete: async (id: string) => {
      const { error } = await supabase
        .from('content.content_base')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  // Projects
  projects: {
    getBySlug: async (slug: string, lang: 'id' | 'en') => {
      const { data, error } = await supabase
        .from('content.v_published_projects')
        .select('*')
        .eq('slug', slug)
        .eq('language', lang)
        .single();

      if (error) throw error;
      return data as Project;
    },

    getByCategory: async (category: string, lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_projects')
        .select('*')
        .eq('category', category)
        .eq('language', lang)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },

    getFeatured: async (lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_projects')
        .select('*')
        .eq('language', lang)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Project[];
    },
  },

  // Articles
  articles: {
    getBySlug: async (slug: string, lang: 'id' | 'en') => {
      const { data, error } = await supabase
        .from('content.v_published_articles')
        .select('*')
        .eq('slug', slug)
        .eq('language', lang)
        .single();

      if (error) throw error;
      return data as Article;
    },

    getCategory: async (category: string, lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_articles')
        .select('*')
        .eq('category', category)
        .eq('language', lang)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },

    getLatest: async (lang: 'id' | 'en' = 'id', limit: number = 5) => {
      const { data, error } = await supabase
        .from('content.v_published_articles')
        .select('*')
        .eq('language', lang)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },

    getByTag: async (tag: string, lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_articles')
        .select('*')
        .eq('language', lang)
        .contains('keywords', [tag])
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  },

  // Case Studies
  casestudies: {
    getBySlug: async (slug: string, lang: 'id' | 'en') => {
      const { data, error } = await supabase
        .from('content.v_published_casestudies')
        .select('*')
        .eq('slug', slug)
        .eq('language', lang)
        .single();

      if (error) throw error;
      return data as CaseStudy;
    },

    getByIndustry: async (industry: string, lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_casestudies')
        .select('*')
        .eq('industry', industry)
        .eq('language', lang)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as CaseStudy[];
    },
  },

  // Startup Profiles
  startupProfiles: {
    getBySlug: async (slug: string, lang: 'id' | 'en') => {
      const { data, error } = await supabase
        .from('content.v_published_startup_profiles')
        .select('*')
        .eq('slug', slug)
        .eq('language', lang)
        .single();

      if (error) throw error;
      return data as StartupProfile;
    },

    getByProgram: async (program: string, lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_startup_profiles')
        .select('*')
        .eq('program', program)
        .eq('language', lang)
        .eq('status', 'active')
        .order('cohort', { ascending: false });

      if (error) throw error;
      return data as StartupProfile[];
    },

    getActive: async (lang: 'id' | 'en' = 'id') => {
      const { data, error } = await supabase
        .from('content.v_published_startup_profiles')
        .select('*')
        .eq('language', lang)
        .eq('status', 'active')
        .order('cohort', { ascending: false });

      if (error) throw error;
      return data as StartupProfile[];
    },
  },

  // Pages
  pages: {
    getByType: async (pageType: string, lang: 'id' | 'en') => {
      const { data, error } = await supabase
        .from('content.pages')
        .select(`
          content_base_id,
          page_type,
          body,
          cta_section,
          content_base:first_content_base!(
            slug,
            status,
            language,
            seo_title,
            seo_description,
            published_at
          )
        `)
        .eq('page_type', pageType)
        .eq('content_base.language', lang)
        .eq('content_base.status', 'published')
        .single();

      if (error) throw error;
      return data as Page;
    },
  },

  // Media
  media: {
    upload: async (url: string, fileName: string, type: string, userId: string) => {
      const { data, error } = await supabase
        .from('content.media_assets')
        .insert({
          file_url: url,
          file_name: fileName,
          file_type: type,
          created_by: userId
        })
        .select()
        .single();

      if (error) throw error;
      return data as MediaAsset;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('content.media_assets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as MediaAsset;
    },

    incrementUsage: async (id: string) => {
      const { data, error } = await supabase
        .from('content.media_assets')
        .increment('usage_count', { by: 1 })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as MediaAsset;
    },
  },

  // Approval workflow
  approval: {
    getPending: async (userId: string) => {
      const { data, error } = await supabase
        .from('content.approval_workflow')
        .select(`
          *,
          content_base:content_base_id(*)
        `)
        .eq('assigned_to', userId)
        .eq('status', 'in_review')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Array<ApprovalWorkflow & { content_base: ContentBase }>;
    },

    approve: async (workflowId: string, userId: string, notes?: string) => {
      const { data, error } = await supabase
        .rpc('approve_content', {
          workflow_id: workflowId,
          approver_id: userId,
          approval_notes: notes || null
        });

      if (error) throw error;
      return data;
    },

    reject: async (workflowId: string, userId: string, feedback: Record<string, unknown>) => {
      const { data, error } = await supabase
        .rpc('reject_content', {
          workflow_id: workflowId,
          approver_id: userId,
          rejection_feedback: feedback
        });

      if (error) throw error;
      return data;
    }
  }
};

// Helper functions for content types
export const isPublished = (status: ContentStatus) => status === 'published';
export const isDraft = (status: ContentStatus) => status === 'draft';
export const canEdit = (status: ContentStatus, role: Role) => 
  role === 'admin' || role === 'editor' || status === 'draft';

// ============================================================
// EXPORTS
// ============================================================

export default db;
export { supabase };
