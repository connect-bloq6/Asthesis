'use client'

import { getSupabasePublicEnv } from '@asthesis/shared'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const cfg = getSupabasePublicEnv()
  if (!cfg) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL and a public Supabase key (publishable or anon).'
    )
  }
  return createBrowserClient(cfg.url, cfg.key)
}
