import { createClient } from '@supabase/supabase-js'
import type { JobPostingPublic, JobPostingRow } from '@asthesis/shared'
import { getSupabasePublicEnv } from '@asthesis/shared'
import { createServiceClient } from '@/lib/supabase-service'

const LIST_FIELDS = 'id,title,team,location,slug,created_at'

/**
 * List published jobs for the public site. Prefer service role when configured so
 * reads succeed even if RLS / API key role mismatches; otherwise use the anon/publishable key.
 */
export async function listPublishedJobs(): Promise<{
  jobs: JobPostingPublic[] | null
  error: string | null
}> {
  const svc = createServiceClient()
  if (svc) {
    const { data, error } = await svc
      .from('job_postings')
      .select(LIST_FIELDS)
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) return { jobs: null, error: error.message }
    return { jobs: (data ?? []) as JobPostingPublic[], error: null }
  }

  const cfg = getSupabasePublicEnv()
  if (!cfg) return { jobs: null, error: 'Missing Supabase URL or public key.' }

  const anon = createClient(cfg.url, cfg.key)
  const { data, error } = await anon
    .from('job_postings')
    .select(LIST_FIELDS)
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) return { jobs: null, error: error.message }
  return { jobs: (data ?? []) as JobPostingPublic[], error: null }
}

export async function getPublishedJobBySlug(slug: string): Promise<{
  job: JobPostingRow | null
  error: string | null
}> {
  const svc = createServiceClient()
  if (svc) {
    const { data, error } = await svc
      .from('job_postings')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
    if (error) return { job: null, error: error.message }
    return { job: data as JobPostingRow | null, error: null }
  }

  const cfg = getSupabasePublicEnv()
  if (!cfg) return { job: null, error: 'Missing Supabase URL or public key.' }

  const anon = createClient(cfg.url, cfg.key)
  const { data, error } = await anon
    .from('job_postings')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) return { job: null, error: error.message }
  return { job: data as JobPostingRow | null, error: null }
}
