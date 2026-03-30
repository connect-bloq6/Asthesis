'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ContactSubmissionRow } from '@asthesis/shared'
import { BODY_MUTED, CARD_BG, HEADING_TEXT, LABEL_TEXT } from '@asthesis/shared'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

const PREVIEW_MAX = 72

function previewMessage(text: string) {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= PREVIEW_MAX) return t || '—'
  return `${t.slice(0, PREVIEW_MAX).trimEnd()}…`
}

type EnquiriesBoardProps = {
  rows: ContactSubmissionRow[]
}

export function EnquiriesBoard({ rows }: EnquiriesBoardProps) {
  const [selected, setSelected] = useState<ContactSubmissionRow | null>(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, close])

  useEffect(() => {
    if (selected && !rows.some((r) => r.id === selected.id)) {
      setSelected(null)
    }
  }, [rows, selected])

  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [selected])

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: CARD_BG }}>
        <table className="min-w-full text-left text-sm" style={inter}>
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Received
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Name
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Email
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Organisation
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Phone
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Topic
              </th>
              <th className="px-4 py-3 font-medium max-w-[14rem]" style={{ color: LABEL_TEXT }}>
                Preview
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isActive = selected?.id === row.id
              return (
                <tr
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  aria-label={`Open enquiry from ${row.full_name}`}
                  onClick={() => setSelected(row)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(row)
                    }
                  }}
                  className={`border-b border-[#E5E7EB] last:border-0 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101828]/25 ${
                    isActive ? 'bg-[#F0F1F3]' : 'hover:bg-[#FAFAFA]'
                  }`}
                >
                  <td className="px-4 py-3 text-[#101828] whitespace-nowrap align-middle">
                    {new Date(row.created_at).toLocaleString('en-GB', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="px-4 py-3 text-[#101828] align-middle max-w-[10rem] truncate">{row.full_name}</td>
                  <td className="px-4 py-3 text-[#101828] whitespace-nowrap align-middle">
                    <a
                      href={`mailto:${row.email}`}
                      className="underline hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[#101828] max-w-[10rem] truncate align-middle">
                    {row.organisation || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#101828] max-w-[8rem] truncate align-middle">{row.phone || '—'}</td>
                  <td className="px-4 py-3 text-[#101828] max-w-[9rem] truncate align-middle">{row.discuss_topic}</td>
                  <td className="px-4 py-3 text-[#6B7280] max-w-[14rem] align-middle">
                    <span className="line-clamp-2 break-words">{previewMessage(row.message)}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-4 py-2 text-xs border-t border-[#E5E7EB] bg-[#FAFAFA]" style={{ color: BODY_MUTED }}>
          Click a row to read the full message. Country ISO is stored in Supabase with the phone value.
        </div>
      </div>

      {/* Backdrop */}
      {selected ? (
        <button
          type="button"
          aria-label="Close details"
          className="fixed inset-0 z-20 bg-[#101828]/25 backdrop-blur-[1px] sm:bg-[#101828]/20"
          onClick={close}
        />
      ) : null}

      {/* Side panel */}
      <aside
        className={`fixed top-0 right-0 z-30 h-full w-full max-w-md border-l border-[#E5E7EB] shadow-2xl transition-transform duration-200 ease-out flex flex-col ${
          selected ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        style={{ backgroundColor: CARD_BG }}
        aria-hidden={!selected}
      >
        {selected ? (
          <>
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-[#E5E7EB] shrink-0">
              <div className="min-w-0">
                <h2 className="text-base font-semibold truncate" style={{ ...inter, color: HEADING_TEXT }}>
                  {selected.full_name}
                </h2>
                <p className="text-xs mt-0.5" style={{ ...inter, color: BODY_MUTED }}>
                  {new Date(selected.created_at).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center text-[#374151] hover:bg-[#F3F4F6] text-lg leading-none"
                style={inter}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5" style={inter}>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: LABEL_TEXT }}>
                    Email
                  </dt>
                  <dd>
                    <a href={`mailto:${selected.email}`} className="text-[#101828] underline hover:opacity-80 break-all">
                      {selected.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: LABEL_TEXT }}>
                    Organisation
                  </dt>
                  <dd className="text-[#101828]">{selected.organisation || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: LABEL_TEXT }}>
                    Phone
                  </dt>
                  <dd className="text-[#101828] whitespace-pre-wrap break-words">{selected.phone || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: LABEL_TEXT }}>
                    Country
                  </dt>
                  <dd className="text-[#101828]">{selected.country_iso || '—'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: LABEL_TEXT }}>
                    Topic
                  </dt>
                  <dd className="text-[#101828]">{selected.discuss_topic}</dd>
                </div>
              </dl>

              <div>
                <h3
                  className="text-xs font-medium uppercase tracking-wide mb-2"
                  style={{ color: LABEL_TEXT }}
                >
                  Message
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed whitespace-pre-wrap break-words">
                  {selected.message}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  )
}
