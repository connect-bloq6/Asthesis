import { getSupabasePublicEnv } from '@asthesis/shared'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Server-only client with service role (Auth admin API, bypasses RLS). */
export function createServiceClient(): SupabaseClient | null {
  const cfg = getSupabasePublicEnv()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!cfg || !key) return null
  return createClient(cfg.url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
