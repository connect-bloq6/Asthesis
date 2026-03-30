import Image from 'next/image'
import type { ContactSubmissionRow } from '@asthesis/shared'
import { BODY_MUTED, CARD_BG, HEADING_TEXT } from '@asthesis/shared'
import { createClient } from '@/lib/supabase/server'
import { EnquiriesBoard } from './EnquiriesBoard'
import { SignOutButton } from './SignOutButton'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let rows: ContactSubmissionRow[] = []
  let fetchError: string | null = null

  if (user) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      fetchError = error.message
    } else {
      rows = (data ?? []) as ContactSubmissionRow[]
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/Ast_logo_icon.png" alt="" width={40} height={40} className="object-contain" />
            <div>
              <h1 className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
                Contact enquiries
              </h1>
              <p className="text-xs" style={{ ...inter, color: BODY_MUTED }}>
                {user?.email ?? ''}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {fetchError ? (
          <p
            className="text-sm rounded-lg px-4 py-3 border border-red-200 bg-red-50 text-red-800 mb-6"
            style={inter}
            role="alert"
          >
            {fetchError}
          </p>
        ) : null}

        {!fetchError && rows.length === 0 ? (
          <div
            className="rounded-2xl p-8 border border-[#E5E7EB] shadow-sm"
            style={{ backgroundColor: CARD_BG }}
          >
            <p className="text-sm leading-relaxed" style={{ ...inter, color: BODY_MUTED }}>
              No enquiries to show yet, or your account is not in the{' '}
              <code className="text-xs bg-[#F3F4F6] px-1 py-0.5 rounded">admin_users</code> allowlist. Ask a
              database admin to run:{' '}
              <code className="text-xs bg-[#F3F4F6] px-1 py-0.5 rounded block mt-2 whitespace-pre-wrap">
                insert into public.admin_users (user_id) values (&apos;&lt;your auth user id&gt;&apos;);
              </code>
            </p>
          </div>
        ) : null}

        {rows.length > 0 ? <EnquiriesBoard rows={rows} /> : null}
      </div>
    </main>
  )
}
