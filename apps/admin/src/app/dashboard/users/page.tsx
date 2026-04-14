import { BODY_MUTED, CARD_BG, HEADING_TEXT } from '@asthesis/shared'
import { requireAdminSession } from '@/lib/require-admin'
import { loadAuthUsers } from './actions'
import { UsersManager } from './UsersManager'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export default async function UsersAdminPage() {
  const gate = await requireAdminSession()
  if ('error' in gate) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-background">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
          <h1 className="text-xl font-semibold mb-4" style={{ ...inter, color: HEADING_TEXT }}>
            Users
          </h1>
          <div className="rounded-2xl p-8 border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: CARD_BG }}>
            <p className="text-sm" style={{ ...inter, color: BODY_MUTED }}>
              {gate.error}
            </p>
          </div>
        </div>
      </main>
    )
  }

  const { users, adminIds, error } = await loadAuthUsers()

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <h1 className="text-xl font-semibold mb-2" style={{ ...inter, color: HEADING_TEXT }}>
          Users and passwords
        </h1>
        <p className="text-sm mb-8 max-w-2xl" style={{ ...inter, color: BODY_MUTED }}>
          Invite colleagues by creating accounts, control who appears in the <code className="text-xs bg-[#F3F4F6] px-1 rounded">admin_users</code> allowlist, and reset passwords when needed. Managing other users requires{' '}
          <code className="text-xs bg-[#F3F4F6] px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> in the admin app environment (never expose it in the browser).
        </p>
        <UsersManager
          initialUsers={users}
          initialAdminIds={adminIds}
          initialError={error ?? null}
          currentUserId={gate.user.id}
        />
      </div>
    </main>
  )
}
