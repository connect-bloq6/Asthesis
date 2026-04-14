'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BUTTON_BG } from '@asthesis/shared'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export function SignOutButton() {
  const [loading, setLoading] = useState(false)

  async function signOut() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.assign('/login')
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      disabled={loading}
      className="inline-block px-5 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 border border-transparent"
      style={{ backgroundColor: BUTTON_BG, ...inter }}
    >
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
