import { createClient } from '@/lib/supabase/server'

export type AdminSession = {
  user: { id: string; email?: string | null }
}

export async function requireAdminSession(): Promise<AdminSession | { error: string }> {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You need to sign in.' }
  }
  const { data } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (!data) {
    return { error: 'Your account is not in the admin allowlist.' }
  }
  return { user: { id: user.id, email: user.email } }
}
