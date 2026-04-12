import { BODY_MUTED, CARD_BG, HEADING_TEXT } from '@asthesis/shared'
import { createClient } from '@/lib/supabase/server'
import { ApplicationsBoard, type ApplicationRowView } from './ApplicationsBoard'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export default async function JobApplicationsAdminPage() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('job_applications')
    .select('*, job_postings(title, slug)')
    .order('created_at', { ascending: false })

  const rows = (data ?? []).map((row) => {
    const r = row as ApplicationRowView & { job_postings?: ApplicationRowView['job_postings'] | ApplicationRowView['job_postings'][] }
    const jp = r.job_postings
    const job_postings = Array.isArray(jp) ? jp[0] ?? null : jp ?? null
    return { ...r, job_postings } as ApplicationRowView
  })

  const marketingBase =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL.replace(/\/$/, '')}` : '')

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <h1 className="text-xl font-semibold mb-2" style={{ ...inter, color: HEADING_TEXT }}>
          Job applications
        </h1>
        <p className="text-sm mb-8" style={{ ...inter, color: BODY_MUTED }}>
          Submissions from the public careers form. Resume files open in a new tab via a short-lived signed URL.
        </p>

        {error ? (
          <p className="text-sm text-red-700 mb-6" role="alert">
            {error.message}
          </p>
        ) : null}

        {!error && rows.length === 0 ? (
          <div
            className="rounded-2xl p-8 border border-[#E5E7EB] shadow-sm"
            style={{ backgroundColor: CARD_BG }}
          >
            <p className="text-sm leading-relaxed" style={{ ...inter, color: BODY_MUTED }}>
              No applications yet, or your account is not in the{' '}
              <code className="text-xs bg-[#F3F4F6] px-1 py-0.5 rounded">admin_users</code> allowlist.
            </p>
          </div>
        ) : null}

        {rows.length > 0 ? <ApplicationsBoard rows={rows} marketingBase={marketingBase} /> : null}
      </div>
    </main>
  )
}
