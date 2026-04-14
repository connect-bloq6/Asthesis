import Image from 'next/image'
import Link from 'next/link'
import { BODY_MUTED, HEADING_TEXT } from '@asthesis/shared'
import { createClient } from '@/lib/supabase/server'
import { SignOutButton } from './SignOutButton'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

const navLinkClass =
  'text-sm font-medium text-[#4B5563] hover:text-[#101828] border-b-2 border-transparent hover:border-[#101828] pb-0.5 transition-colors'

export async function DashboardHeader() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <Image src="/images/Ast_logo_icon.png" alt="" width={40} height={40} className="object-contain" />
            <div>
              <p className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
                Admin
              </p>
              <p className="text-xs truncate max-w-[200px] sm:max-w-xs" style={{ ...inter, color: BODY_MUTED }}>
                {user?.email ?? ''}
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Admin sections">
            <Link href="/dashboard" className={navLinkClass} style={inter}>
              Enquiries
            </Link>
            <Link href="/dashboard/careers" className={navLinkClass} style={inter}>
              Job postings
            </Link>
            <Link href="/dashboard/job-applications" className={navLinkClass} style={inter}>
              Applications
            </Link>
            <Link href="/dashboard/users" className={navLinkClass} style={inter}>
              Users
            </Link>
          </nav>
        </div>
        <SignOutButton />
      </div>
    </header>
  )
}
