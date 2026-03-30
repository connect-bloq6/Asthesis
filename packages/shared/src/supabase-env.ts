/**
 * Public Supabase config for browser and server.
 * Supports the new publishable key or the legacy JWT anon key (dashboard: Project Settings → API).
 */
export function getSupabasePublicEnv(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  )?.trim()
  if (!url || !key) return null
  return { url, key }
}
