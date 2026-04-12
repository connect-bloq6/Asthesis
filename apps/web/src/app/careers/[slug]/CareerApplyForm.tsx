'use client'

import { useState } from 'react'
import {
  BODY_MUTED,
  BUTTON_BG,
  CARD_BG,
  HEADING_TEXT,
  INPUT_BORDER,
  LABEL_TEXT,
} from '@asthesis/shared'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

type CareerApplyFormProps = {
  jobId: string
  jobTitle: string
}

export function CareerApplyForm({ jobId, jobTitle }: CareerApplyFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    if (!file) {
      setError('Please attach your resume (PDF or Word).')
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.set('job_id', jobId)
      fd.set('full_name', fullName.trim())
      fd.set('email', email.trim())
      fd.set('phone', phone.trim())
      fd.set('cover_letter', coverLetter.trim())
      fd.set('resume', file)
      const res = await fetch('/api/careers/apply', { method: 'POST', body: fd })
      const data = (await res.json().catch(() => ({}))) as { error?: string; hint?: string }
      if (!res.ok) {
        const msg = data.error ?? 'Something went wrong. Please try again.'
        setError(data.hint ? `${msg} ${data.hint}` : msg)
        return
      }
      setSuccess(true)
      setFullName('')
      setEmail('')
      setPhone('')
      setCoverLetter('')
      setFile(null)
      setFileInputKey((k) => k + 1)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 md:p-8 shadow-sm"
      style={{ backgroundColor: CARD_BG }}
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-1" style={{ ...inter, color: HEADING_TEXT }}>
        Apply for this role
      </h2>
      <p className="text-sm mb-6" style={{ ...inter, color: BODY_MUTED }}>
        {jobTitle}
      </p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
            Full name
          </label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#101828]/10"
            style={{ ...inter, borderColor: INPUT_BORDER, color: HEADING_TEXT }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
            Work email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#101828]/10"
            style={{ ...inter, borderColor: INPUT_BORDER, color: HEADING_TEXT }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
            Phone <span className="font-normal text-[#6B7280]">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#101828]/10"
            style={{ ...inter, borderColor: INPUT_BORDER, color: HEADING_TEXT }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
            Cover letter
          </label>
          <textarea
            required
            rows={5}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#101828]/10 resize-y min-h-[120px]"
            style={{ ...inter, borderColor: INPUT_BORDER, color: HEADING_TEXT }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
            Resume (PDF or Word, max 5 MB)
          </label>
          <input
            key={fileInputKey}
            required
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm text-[#374151] file:mr-3 file:rounded-lg file:border file:border-[#E5E7EB] file:bg-[#F9FAFB] file:px-3 file:py-2 file:text-xs file:font-medium"
          />
        </div>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="text-sm text-green-800" role="status">
            Thank you — your application was received. We&apos;ll be in touch if there is a fit.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto rounded-full px-8 py-3 text-sm font-semibold text-white disabled:opacity-60 transition-opacity"
          style={{ ...inter, backgroundColor: BUTTON_BG }}
        >
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
      </form>
    </div>
  )
}
