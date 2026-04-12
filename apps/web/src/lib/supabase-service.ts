import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabasePublicEnv } from '@asthesis/shared'

const ENV_KEYS_TO_HYDRATE = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY',
] as const

function allSupabaseEnvPresent(): boolean {
  return Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim())
  )
}

let attemptedDiskEnvHydration = false

function parseDotEnv(contents: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of contents.split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

/**
 * Merge Supabase vars from disk when they are missing from `process.env`.
 * Covers monorepo layouts where only `apps/admin/.env.local` or repo root `.env` was configured.
 */
function hydrateSupabaseEnvFromDisk(): void {
  if (allSupabaseEnvPresent()) return
  if (attemptedDiskEnvHydration) return
  attemptedDiskEnvHydration = true

  const cwd = process.cwd()
  const paths = [
    join(cwd, '.env.local'),
    join(cwd, '.env'),
    join(cwd, '..', '.env.local'),
    join(cwd, '..', '.env'),
    join(cwd, '..', '..', '.env.local'),
    join(cwd, '..', '..', '.env'),
    join(cwd, '..', 'admin', '.env.local'),
    join(cwd, '..', 'admin', '.env'),
    join(cwd, '..', '..', 'apps', 'admin', '.env.local'),
    join(cwd, '..', '..', 'apps', 'admin', '.env'),
    join(cwd, 'apps', 'admin', '.env.local'),
    join(cwd, 'apps', 'admin', '.env'),
  ]

  for (const filePath of paths) {
    try {
      if (!existsSync(filePath)) continue
      const parsed = parseDotEnv(readFileSync(filePath, 'utf8'))
      for (const key of ENV_KEYS_TO_HYDRATE) {
        const v = parsed[key]?.trim()
        if (v && !process.env[key]?.trim()) {
          process.env[key] = v
        }
      }
    } catch {
      /* ignore unreadable paths */
    }
  }
}

/** Server-only Supabase client with service role (bypasses RLS). */
export function createServiceClient(): SupabaseClient | null {
  hydrateSupabaseEnvFromDisk()

  const cfg = getSupabasePublicEnv()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!cfg || !key) return null
  return createClient(cfg.url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
