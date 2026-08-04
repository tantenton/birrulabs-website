/**
 * Authentication middleware for Supabase sessions
 * Extends SvelteKit handle for user session management
 */

import { createSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';

export const authHandle = (async ({ event, resolve }) => {
  const supabase = createSupabaseClient({
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  });

  // Get session
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth error:', error);
  }

  // Make session available in locals
  event.locals.session = session;
  event.locals.user = session?.user || null;

  // Set admin flag in locals
  event.locals.isAdmin = session?.user?.app_metadata?.role === 'admin';
  event.locals.isEditor = session?.user?.app_metadata?.role === 'editor';

  // Update session if needed
  if (session) {
    event.locals.user = session.user;
    // Refresh session if expired
    const { data: { session: newSession }, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      console.error('Session refresh error:', refreshError);
    } else if (newSession) {
      event.locals.session = newSession;
      event.locals.user = newSession.user;
    }
  }

  const response = await resolve(event);

  // Sync session changes to client
  const {
    data: { session: currentSession }
  } = await supabase.auth.getSession();

  response.headers.set('Authorization', `Bearer ${currentSession?.access_token || ''}`);

  return response;
}) satisfies Handle;

export default authHandle;
```
