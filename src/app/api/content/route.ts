/**
 * API Routes for BirruLabs Content Management System
 * All routes require admin/editor authentication
 */

import { db } from '$lib/db';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// ============================================================
// ADMIN AUTH MIDDLEWARE
// ============================================================

export async function authAdmin({ locals }: { locals: App.Locals }) {
  const user = locals.user;
  if (!user) {
    return { error: 'Unauthorized', code: 401 };
  }
  if (user.role !== 'admin' && user.role !== 'editor') {
    return { error: 'Forbidden', code: 403 };
  }
  return { user };
}

// ============================================================
// CONTENT CREATION
// ============================================================

export const POST = (async ({ request, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  const body = await request.json();
  const { content_type, data } = body;

  if (!content_type || !data) {
    return json({ error: 'Missing content_type or data' }, { status: 400 });
  }

  try {
    // Create base content entry
    const baseData = {
      content_type,
      slug: data.slug || '',
      status: data.status || 'draft',
      language: data.language || 'id',
      localization_status: data.localization_status || 'draft',
      requires_approval: data.requires_approval !== false,
      created_by: locals.user.id
    };

    const contentBase = await db.contentBase.create(baseData);

    // Create type-specific record
    let typeData = {};
    switch (content_type) {
      case 'project':
        typeData = {
          content_base_id: contentBase.id,
          ...data
        };
        await db.supabase.from('content.projects').insert(typeData);
        break;
      case 'article':
        typeData = {
          content_base_id: contentBase.id,
          ...data
        };
        await db.supabase.from('content.articles').insert(typeData);
        break;
      case 'casestudy':
        typeData = {
          content_base_id: contentBase.id,
          ...data
        };
        await db.supabase.from('content.casestudies').insert(typeData);
        break;
      case 'startupprofile':
        typeData = {
          content_base_id: contentBase.id,
          ...data
        };
        await db.supabase.from('content.startup_profiles').insert(typeData);
        break;
      case 'page':
        typeData = {
          content_base_id: contentBase.id,
          ...data
        };
        await db.supabase.from('content.pages').insert(typeData);
        break;
      default:
        return json({ error: 'Invalid content type' }, { status: 400 });
    }

    return json({
      success: true,
      contentBase,
      typeData
    });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// CONTENT LISTING
// ============================================================

export const GET = (async ({ url, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  const type = url.searchParams.get('type');
  const lang = url.searchParams.get('lang') || 'id';
  const status = url.searchParams.get('status') || 'published';

  try {
    let results;
    switch (type) {
      case 'project':
        results = await db.projects.getByCategory('all', lang as any);
        break;
      case 'article':
        results = await db.articles.getLatest(lang as any, 50);
        break;
      case 'casestudy':
        results = await db.casestudies.getByIndustry('all', lang as any);
        break;
      case 'startupprofile':
        results = await db.startupProfiles.getActive(lang as any);
        break;
      case 'page':
        results = [];
        break;
      default:
        results = await db.contentBase.getPublished(lang as any);
    }

    return json({ success: true, results });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// INDIVIDUAL CONTENT ENDPOINTS
// ============================================================

// GET /api/content/:id
export const GET_ID = (async ({ params, locals }) => {
  const { id } = params;
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  try {
    const contentBase = await db.contentBase.getById(id, locals.user.id);
    return json({ success: true, contentBase });
  } catch (error: any) {
    return json({ error: error.message }, { status: 404 });
  }
}) satisfies RequestHandler;

// PUT /api/content/:id
export const PUT = (async ({ request, params, locals }) => {
  const { id } = params;
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  const body = await request.json();
  const { data, content_type } = body;

  try {
    const updated = await db.contentBase.update(id, {
      ...data,
      updated_by: locals.user.id
    });

    return json({ success: true, updated });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// DELETE /api/content/:id
export const DELETE = (async ({ params, locals }) => {
  const { id } = params;
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  try {
    await db.contentBase.delete(id);
    return json({ success: true });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// PUBLISH CONTENT ENDPOINT
// ============================================================

export const PUBLISH = (async ({ request, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  const body = await request.json();
  const { id, force = false } = body;

  try {
    const contentBase = await db.contentBase.getById(id, locals.user.id);

    // Check if already published
    if (contentBase.status === 'published' && !force) {
      return json({ error: 'Already published', code: 409 });
    }

    // Check approval requirement
    if (contentBase.requires_approval && !contentBase.approved_by) {
      return json({ error: 'Content requires approval' }, { status: 400 });
    }

    const updated = await db.contentBase.update(id, {
      status: 'published',
      published_at: new Date().toISOString(),
      updated_by: locals.user.id
    });

    return json({ success: true, updated });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// MEDIA UPLOAD ENDPOINT
// ============================================================

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const MEDIA_UPLOAD = (async ({ request, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  // For production, use Supabase Storage instead
  // This is a placeholder for S3-compatible storage

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const contentBaseId = formData.get('content_base_id') as string | null;

  if (!file) {
    return json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const fileBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const fileType = file.type;

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await db.supabase.storage
      .from('media')
      .upload(fileName, fileBuffer);

    if (storageError) throw storageError;

    // Save to database
    const media = await db.media.upload(
      storageData.path,
      file.name,
      fileType,
      locals.user.id
    );

    // Link to content if provided
    if (contentBaseId) {
      await db.supabase
        .from('content.media_assets')
        .update({ content_base_id: contentBaseId })
        .eq('id', media.id);
    }

    return json({ success: true, media });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// APPROVAL WORKFLOW ENDPOINTS
// ============================================================

// GET pending approvals for editor
export const PENDING_APPROVALS = (async ({ url, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  if (auth.user.role !== 'editor' && auth.user.role !== 'admin') {
    return json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const pending = await db.approval.getPending(locals.user.id);
    return json({ success: true, pending });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// POST approve content
export const APPROVE_CONTENT = (async ({ request, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  if (auth.user.role !== 'editor' && auth.user.role !== 'admin') {
    return json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { workflowId, notes } = body;

  if (!workflowId) {
    return json({ error: 'Missing workflowId' }, { status: 400 });
  }

  try {
    const result = await db.approval.approve(workflowId, locals.user.id, notes);
    return json({ success: true, result });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// SLUG LOOKUP (for frontend)
// ============================================================

export const SLUG_LOOKUP = (async ({ url, locals }) => {
  const auth = await authAdmin({ locals });
  if (auth.code) return json({ error: auth.error }, { status: auth.code });

  const slug = url.searchParams.get('slug');
  const language = url.searchParams.get('lang') || 'id';

  if (!slug) {
    return json({ error: 'Missing slug' }, { status: 400 });
  }

  try {
    const result = await db.contentBase.getPublished(language as any);
    const match = result.find(c => c.slug === slug);
    
    if (!match) {
      return json({ error: 'Content not found' }, { status: 404 });
    }

    return json({ success: true, content: match });
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
}) satisfies RequestHandler;

// ============================================================
// EXPORTS
// ============================================================

export const routes = {
  POST,
  GET,
  GET_ID,
  PUT,
  DELETE,
  PUBLISH,
  MEDIA_UPLOAD,
  PENDING_APPROVALS,
  APPROVE_CONTENT,
  SLUG_LOOKUP
};

export default routes;
```
