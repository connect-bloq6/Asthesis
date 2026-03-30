import { getSupabasePublicEnv } from '@asthesis/shared'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cfg = getSupabasePublicEnv()
  if (!cfg) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL and a public Supabase key (publishable or anon).'
    )
  }
  const cookieStore = cookies()

  return createServerClient(
    cfg.url,
    cfg.key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — session refresh happens in middleware
          }
        },
      },
    }
  )
}
