'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type LoginFormProps = {
  inter: { fontFamily: string }
  labelColor: string
  inputBg: string
  inputBorder: string
  buttonBg: string
}

export function LoginForm({
  inter,
  labelColor,
  inputBg,
  inputBorder,
  buttonBg,
}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()
    const { error: signError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (signError) {
      setError(signError.message)
      return
    }
    // Full navigation so the next request always sends fresh Supabase cookies and the dashboard
    // layout is not served from a stale RSC cache tied to the previous session.
    window.location.assign('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error ? (
        <p
          className="text-sm rounded-lg px-4 py-3 border border-red-200 bg-red-50 text-red-800"
          style={inter}
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: labelColor }}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
          style={{ backgroundColor: inputBg, borderColor: inputBorder, ...inter }}
          placeholder="you@organisation.org"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: labelColor }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
          style={{ backgroundColor: inputBg, borderColor: inputBorder, ...inter }}
        />
      </div>
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-block px-6 py-2.5 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: buttonBg, ...inter }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
    </form>
  )
}
