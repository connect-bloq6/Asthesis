'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/lib/supabase/service'
import { requireAdminSession } from '@/lib/require-admin'

const USERS_PATH = '/dashboard/users'

function minPasswordError(pw: string): string | null {
  const t = pw.trim()
  if (t.length < 8) return 'Password must be at least 8 characters.'
  return null
}

export type AdminUserListItem = {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

export async function loadAuthUsers(): Promise<{
  users: AdminUserListItem[]
  adminIds: string[]
  error?: string
}> {
  const gate = await requireAdminSession()
  if ('error' in gate) {
    return { users: [], adminIds: [], error: gate.error }
  }
  const service = createServiceClient()
  if (!service) {
    return {
      users: [],
      adminIds: [],
      error: 'Set SUPABASE_SERVICE_ROLE_KEY in apps/admin/.env.local (or the host env) to manage users.',
    }
  }

  const { data: authData, error: listErr } = await service.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (listErr) {
    return { users: [], adminIds: [], error: listErr.message }
  }

  const { data: adminRows, error: adminErr } = await service.from('admin_users').select('user_id')
  if (adminErr) {
    return { users: [], adminIds: [], error: adminErr.message }
  }

  const adminIds = (adminRows ?? []).map((r: { user_id: string }) => r.user_id)
  const users: AdminUserListItem[] = (authData.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? '',
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
  }))

  return { users, adminIds }
}

export async function createUserAction(
  email: string,
  password: string,
  grantAdmin: boolean
): Promise<{ ok?: true; error?: string }> {
  const gate = await requireAdminSession()
  if ('error' in gate) {
    return { error: gate.error }
  }
  const service = createServiceClient()
  if (!service) {
    return { error: 'Service role key is not configured.' }
  }
  const em = email.trim().toLowerCase()
  if (!em || !em.includes('@')) {
    return { error: 'Enter a valid email.' }
  }
  const pwErr = minPasswordError(password)
  if (pwErr) return { error: pwErr }

  const { data, error } = await service.auth.admin.createUser({
    email: em,
    password: password.trim(),
    email_confirm: true,
  })
  if (error || !data.user) {
    return { error: error?.message ?? 'Could not create user.' }
  }

  if (grantAdmin) {
    const { error: insErr } = await service.from('admin_users').insert({ user_id: data.user.id })
    if (insErr) {
      return {
        error: `User was created but admin access failed: ${insErr.message}. Add them in SQL: insert into public.admin_users (user_id) values ('${data.user.id}');`,
      }
    }
  }

  revalidatePath(USERS_PATH)
  return { ok: true }
}

export async function setUserPasswordAction(
  userId: string,
  newPassword: string
): Promise<{ ok?: true; error?: string }> {
  const gate = await requireAdminSession()
  if ('error' in gate) {
    return { error: gate.error }
  }
  const service = createServiceClient()
  if (!service) {
    return { error: 'Service role key is not configured.' }
  }
  const id = userId.trim()
  if (!id) return { error: 'Missing user.' }
  const pwErr = minPasswordError(newPassword)
  if (pwErr) return { error: pwErr }

  const { error } = await service.auth.admin.updateUserById(id, { password: newPassword.trim() })
  if (error) {
    return { error: error.message }
  }
  revalidatePath(USERS_PATH)
  return { ok: true }
}

export async function setUserAdminAccessAction(
  userId: string,
  grant: boolean
): Promise<{ ok?: true; error?: string }> {
  const gate = await requireAdminSession()
  if ('error' in gate) {
    return { error: gate.error }
  }
  const service = createServiceClient()
  if (!service) {
    return { error: 'Service role key is not configured.' }
  }
  const id = userId.trim()
  if (!id) return { error: 'Missing user.' }

  if (!grant && id === gate.user.id) {
    return { error: 'You cannot remove your own admin access from this screen.' }
  }

  const { data: admins, error: listErr } = await service.from('admin_users').select('user_id')
  if (listErr) {
    return { error: listErr.message }
  }
  const ids = (admins ?? []).map((r: { user_id: string }) => r.user_id)

  if (!grant && ids.length <= 1) {
    return { error: 'At least one admin account must remain.' }
  }

  if (grant) {
    if (ids.includes(id)) {
      revalidatePath(USERS_PATH)
      return { ok: true }
    }
    const { error } = await service.from('admin_users').insert({ user_id: id })
    if (error) return { error: error.message }
  } else {
    const { error } = await service.from('admin_users').delete().eq('user_id', id)
    if (error) return { error: error.message }
  }

  revalidatePath(USERS_PATH)
  return { ok: true }
}
