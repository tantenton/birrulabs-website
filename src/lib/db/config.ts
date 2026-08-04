/**
 * Database configuration for BirruLabs CMS
 * Supabase connection setup
 */

import { env } from '$env/dynamic/private';
import { env as envPublic } from '$env/dynamic/public';

export interface DbConfig {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
}

export const dbConfig: DbConfig = {
  url: env.DATABASE_URL || envPublic.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: env.ANON_KEY || envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  serviceRoleKey: env.SERVICE_ROLE_KEY || ''
};

// Validate required config
if (!dbConfig.url || !dbConfig.anonKey) {
  console.warn('warning: Missing Supabase config. Some features will not work.');
  console.warn('Required: DATABASE_URL, ANON_KEY');
}

export const SupabaseClient = await import('@supabase/supabase-js');
export const supabase = SupabaseClient.createClient(dbConfig.url, dbConfig.anonKey);

export default dbConfig;
