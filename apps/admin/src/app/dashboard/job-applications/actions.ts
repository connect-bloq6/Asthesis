'use server'

import { createClient } from '@/lib/supabase/server'

const BUCKET = 'job-resumes'

export async function signResumeUrl(storagePath: string): Promise<{ url?: string; error?: string }> {
  const trimmed = storagePath?.trim() ?? ''
  if (!trimmed || trimmed.includes('..') || trimmed.startsWith('/')) {
    return { error: 'Invalid file path.' }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(trimmed, 300)
  if (error) {
    return { error: error.message }
  }
  return { url: data.signedUrl }
}
