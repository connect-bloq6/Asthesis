import type { JobPostingRow } from '@asthesis/shared'
import { BODY_MUTED, HEADING_TEXT } from '@asthesis/shared'
import { createClient } from '@/lib/supabase/server'
import { JobPostingsManager } from './JobPostingsManager'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export default async function CareersAdminPage() {
  const supabase = createClient()
  const { data, error } = await supabase.from('job_postings').select('*').order('created_at', { ascending: false })

  const rows = (data ?? []) as JobPostingRow[]

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <h1 className="text-xl font-semibold mb-2" style={{ ...inter, color: HEADING_TEXT }}>
          Job postings
        </h1>
        <p className="text-sm mb-8" style={{ ...inter, color: BODY_MUTED }}>
          Create and manage roles shown on the Impact page careers section and on public job detail URLs.
        </p>

        {error ? (
          <p className="text-sm text-red-700 mb-6" role="alert">
            {error.message}
          </p>
        ) : null}

        <JobPostingsManager initialRows={rows} />
      </div>
    </main>
  )
}
