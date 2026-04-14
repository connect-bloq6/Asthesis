'use client'

import { useState, useTransition } from 'react'
import { BODY_MUTED, CARD_BG, HEADING_TEXT, LABEL_TEXT } from '@asthesis/shared'
import { createClient } from '@/lib/supabase/client'
import {
  createUserAction,
  loadAuthUsers,
  setUserAdminAccessAction,
  setUserPasswordAction,
  type AdminUserListItem,
} from './actions'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

type UsersManagerProps = {
  initialUsers: AdminUserListItem[]
  initialAdminIds: string[]
  initialError: string | null
  currentUserId: string
}

export function UsersManager({
  initialUsers,
  initialAdminIds,
  initialError,
  currentUserId,
}: UsersManagerProps) {
  const [users, setUsers] = useState(initialUsers)
  const [adminIds, setAdminIds] = useState(() => new Set(initialAdminIds))
  const [pageError, setPageError] = useState<string | null>(initialError)
  const [formError, setFormError] = useState<string | null>(null)
  const [busy, startTransition] = useTransition()

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [grantAdminOnCreate, setGrantAdminOnCreate] = useState(false)

  const [pwTargetId, setPwTargetId] = useState('')
  const [pwNew, setPwNew] = useState('')

  const [ownPw, setOwnPw] = useState('')
  const [ownPw2, setOwnPw2] = useState('')
  const [ownBusy, setOwnBusy] = useState(false)
  const [ownMsg, setOwnMsg] = useState<string | null>(null)

  const refresh = () => {
    startTransition(async () => {
      setFormError(null)
      const { users: next, adminIds: nextAdmin, error } = await loadAuthUsers()
      if (error) {
        setPageError(error)
        return
      }
      setPageError(null)
      setUsers(next)
      setAdminIds(new Set(nextAdmin))
    })
  }

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    startTransition(async () => {
      const res = await createUserAction(newEmail, newPassword, grantAdminOnCreate)
      if (res.error) {
        setFormError(res.error)
        return
      }
      setNewEmail('')
      setNewPassword('')
      setGrantAdminOnCreate(false)
      refresh()
    })
  }

  const onSetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    startTransition(async () => {
      const res = await setUserPasswordAction(pwTargetId, pwNew)
      if (res.error) {
        setFormError(res.error)
        return
      }
      setPwNew('')
      refresh()
    })
  }

  const toggleAdmin = (userId: string, next: boolean) => {
    setFormError(null)
    startTransition(async () => {
      const res = await setUserAdminAccessAction(userId, next)
      if (res.error) {
        setFormError(res.error)
        return
      }
      setAdminIds((prev) => {
        const n = new Set(prev)
        if (next) n.add(userId)
        else n.delete(userId)
        return n
      })
    })
  }

  const onOwnPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setOwnMsg(null)
    if (ownPw.length < 8) {
      setOwnMsg('Password must be at least 8 characters.')
      return
    }
    if (ownPw !== ownPw2) {
      setOwnMsg('Passwords do not match.')
      return
    }
    setOwnBusy(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: ownPw })
    setOwnBusy(false)
    if (error) {
      setOwnMsg(error.message)
      return
    }
    setOwnPw('')
    setOwnPw2('')
    setOwnMsg('Password updated.')
  }

  return (
    <div className="space-y-10">
      {pageError ? (
        <p
          className="text-sm rounded-lg px-4 py-3 border border-amber-200 bg-amber-50 text-amber-900"
          style={inter}
          role="status"
        >
          {pageError}
        </p>
      ) : null}

      {formError ? (
        <p
          className="text-sm rounded-lg px-4 py-3 border border-red-200 bg-red-50 text-red-800"
          style={inter}
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <section
        className="rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm space-y-4"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
          Change your password
        </h2>
        <p className="text-sm" style={{ ...inter, color: BODY_MUTED }}>
          Updates the password for the account you are signed in with.
        </p>
        <form onSubmit={onOwnPassword} className="grid gap-4 sm:grid-cols-2 max-w-xl">
          <div className="sm:col-span-2">
            <label htmlFor="own-pw" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              New password
            </label>
            <input
              id="own-pw"
              type="password"
              autoComplete="new-password"
              value={ownPw}
              onChange={(e) => setOwnPw(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828]"
              style={inter}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="own-pw2" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              Confirm new password
            </label>
            <input
              id="own-pw2"
              type="password"
              autoComplete="new-password"
              value={ownPw2}
              onChange={(e) => setOwnPw2(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828]"
              style={inter}
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={ownBusy}
              className="inline-flex px-5 py-2 rounded-full text-white text-sm font-medium bg-[#101828] hover:opacity-90 disabled:opacity-60"
              style={inter}
            >
              {ownBusy ? 'Saving…' : 'Update my password'}
            </button>
            {ownMsg ? (
              <span className="text-sm" style={{ ...inter, color: BODY_MUTED }}>
                {ownMsg}
              </span>
            ) : null}
          </div>
        </form>
      </section>

      <section
        className="rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm space-y-4"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
          Add user
        </h2>
        <p className="text-sm" style={{ ...inter, color: BODY_MUTED }}>
          Creates a Supabase Auth user with a confirmed email so they can sign in immediately. Optionally add them to the
          admin allowlist.
        </p>
        <form onSubmit={onCreate} className="grid gap-4 sm:grid-cols-2 max-w-2xl">
          <div>
            <label htmlFor="nu-email" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              Email
            </label>
            <input
              id="nu-email"
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828]"
              style={inter}
            />
          </div>
          <div>
            <label htmlFor="nu-pw" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              Initial password
            </label>
            <input
              id="nu-pw"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828]"
              style={inter}
            />
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2 cursor-pointer" style={{ ...inter, color: LABEL_TEXT }}>
            <input
              type="checkbox"
              checked={grantAdminOnCreate}
              onChange={(e) => setGrantAdminOnCreate(e.target.checked)}
              className="rounded border-[#D1D5DB]"
            />
            Grant admin access (contact enquiries, careers, user management)
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy || Boolean(pageError)}
              className="inline-flex px-5 py-2 rounded-full text-white text-sm font-medium bg-[#101828] hover:opacity-90 disabled:opacity-60"
              style={inter}
            >
              {busy ? 'Creating…' : 'Create user'}
            </button>
          </div>
        </form>
      </section>

      <section
        className="rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm space-y-4"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
          Reset another user&apos;s password
        </h2>
        <form onSubmit={onSetPassword} className="grid gap-4 sm:grid-cols-2 max-w-2xl">
          <div className="sm:col-span-2">
            <label htmlFor="rp-user" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              User
            </label>
            <select
              id="rp-user"
              required
              value={pwTargetId}
              onChange={(e) => setPwTargetId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828] bg-white"
              style={inter}
            >
              <option value="">Select…</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.email || u.id}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="rp-pw" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
              New password
            </label>
            <input
              id="rp-pw"
              type="password"
              required
              minLength={8}
              value={pwNew}
              onChange={(e) => setPwNew(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#101828]"
              style={inter}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy || Boolean(pageError)}
              className="inline-flex px-5 py-2 rounded-full text-white text-sm font-medium bg-[#101828] hover:opacity-90 disabled:opacity-60"
              style={inter}
            >
              {busy ? 'Updating…' : 'Set password'}
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold" style={{ ...inter, color: HEADING_TEXT }}>
            Users
          </h2>
          <button
            type="button"
            onClick={refresh}
            disabled={busy || Boolean(pageError)}
            className="text-sm font-medium text-[#4B5563] hover:text-[#101828] underline disabled:opacity-50"
            style={inter}
          >
            Refresh list
          </button>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: CARD_BG }}>
          <table className="min-w-full text-left text-sm" style={inter}>
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                  Email
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                  Created
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                  Last sign-in
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                  Admin
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center" style={{ color: BODY_MUTED }}>
                    {pageError ? 'Fix the configuration above to load users.' : 'No users returned.'}
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isAdmin = adminIds.has(u.id)
                  const isSelf = u.id === currentUserId
                  return (
                    <tr key={u.id} className="border-b border-[#E5E7EB] last:border-0">
                      <td className="px-4 py-3 text-[#101828] align-middle">
                        {u.email || '—'}
                        {isSelf ? (
                          <span className="ml-2 text-xs text-[#6B7280]">(you)</span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-[#101828] whitespace-nowrap align-middle">
                        {u.created_at
                          ? new Date(u.created_at).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-[#101828] whitespace-nowrap align-middle">
                        {u.last_sign_in_at
                          ? new Date(u.last_sign_in_at).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAdmin}
                            disabled={busy || Boolean(pageError)}
                            onChange={(e) => toggleAdmin(u.id, e.target.checked)}
                            className="rounded border-[#D1D5DB]"
                          />
                          <span className="text-xs text-[#6B7280]">{isAdmin ? 'Allowlisted' : 'Off'}</span>
                        </label>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs" style={{ ...inter, color: BODY_MUTED }}>
          Listing is limited to the first 200 accounts. You cannot remove your own admin access here; at least one admin
          must always remain.
        </p>
      </section>
    </div>
  )
}
