'use client'

import { useCallback, useState } from 'react'
import type { JobApplicationRow } from '@asthesis/shared'
import { BODY_MUTED, CARD_BG, HEADING_TEXT, LABEL_TEXT } from '@asthesis/shared'
import { signResumeUrl } from './actions'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export type ApplicationRowView = JobApplicationRow & {
  job_postings: { title: string; slug: string } | null
}

type ApplicationsBoardProps = {
  rows: ApplicationRowView[]
  /** Public marketing site origin, e.g. https://asthesis.com (no trailing slash). */
  marketingBase: string
}

export function ApplicationsBoard({ rows, marketingBase }: ApplicationsBoardProps) {
  const [resumeError, setResumeError] = useState<string | null>(null)

  const openResume = useCallback(async (path: string) => {
    setResumeError(null)
    const { url, error } = await signResumeUrl(path)
    if (error || !url) {
      setResumeError(error ?? 'Could not open resume.')
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className="relative">
      {resumeError ? (
        <p className="text-sm text-red-700 mb-4" role="alert">
          {resumeError}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: CARD_BG }}>
        <table className="min-w-full text-left text-sm" style={inter}>
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Received
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Job
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Name
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Email
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Phone
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Resume
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const job = r.job_postings
              return (
                <tr key={r.id} className="border-b border-[#F3F4F6] last:border-0">
                  <td className="px-4 py-3 whitespace-nowrap text-[#6B7280]">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 max-w-[12rem]">
                    {job ? (
                      marketingBase ? (
                        <a
                          href={`${marketingBase}/careers/${encodeURIComponent(job.slug)}`}
                          className="text-[#2563EB] hover:underline break-words"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {job.title}
                        </a>
                      ) : (
                        <span className="break-words" style={{ color: HEADING_TEXT }}>
                          {job.title}
                        </span>
                      )
                    ) : (
                      <span className="italic" style={{ color: BODY_MUTED }} title="Job posting was removed">
                        Posting removed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3" style={{ color: HEADING_TEXT }}>
                    {r.full_name}
                  </td>
                  <td className="px-4 py-3 break-all">{r.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.phone || '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="text-sm font-medium text-[#2563EB] hover:underline"
                      onClick={() => openResume(r.resume_storage_path)}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {rows.length > 0 ? (
        <p className="text-xs mt-3" style={{ ...inter, color: BODY_MUTED }}>
          Cover letters are stored in the database; use your Supabase dashboard or add a detail view to read full
          messages.
        </p>
      ) : null}
    </div>
  )
}
