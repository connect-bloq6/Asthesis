'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { JobPostingPublic } from '@asthesis/shared'
import { BODY_MUTED, HEADING_TEXT, INPUT_BORDER, LABEL_TEXT } from '@asthesis/shared'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const
const SECTION_BG = '#F4F4F5'

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#6B7280]">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
        fill="currentColor"
      />
      <path d="M15.446 15.446 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#6B7280]">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ImpactCareersSection() {
  const [jobs, setJobs] = useState<JobPostingPublic[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [teamFilter, setTeamFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/careers/jobs', { cache: 'no-store' })
        const data = (await res.json().catch(() => ({}))) as { jobs?: JobPostingPublic[]; error?: string }
        if (cancelled) return
        if (!res.ok) {
          setLoadError(data.error ?? 'Could not load openings.')
          return
        }
        setJobs(data.jobs ?? [])
      } catch {
        if (!cancelled) setLoadError('Network error loading openings.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const teams = useMemo(() => {
    const s = new Set<string>()
    for (const j of jobs) {
      const t = j.team?.trim()
      if (t) s.add(t)
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [jobs])

  const locations = useMemo(() => {
    const s = new Set<string>()
    for (const j of jobs) {
      const t = j.location?.trim()
      if (t) s.add(t)
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [jobs])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return jobs.filter((j) => {
      if (teamFilter && j.team !== teamFilter) return false
      if (locationFilter && j.location !== locationFilter) return false
      if (!q) return true
      return (
        j.title.toLowerCase().includes(q) ||
        j.team.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      )
    })
  }, [jobs, search, teamFilter, locationFilter])

  return (
    <section
      id="careers"
      className="relative w-full border-t border-[#E5E7EB] scroll-mt-24"
      style={{ backgroundColor: SECTION_BG }}
      aria-labelledby="impact-careers-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-16 sm:py-20 md:py-24">
        <h2
          id="impact-careers-heading"
          className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug tracking-tight max-w-[720px] mb-8 sm:mb-10"
          style={{ ...inter, color: HEADING_TEXT }}
        >
          We&apos;re looking for passionate, self-motivated and daring individuals to join our team.
        </h2>

        <div className="relative mb-8 sm:mb-10">
          <label htmlFor="careers-search" className="sr-only">
            Search job title
          </label>
          <input
            id="careers-search"
            type="search"
            placeholder="Search desired job title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border bg-white py-3.5 pl-5 pr-12 text-sm sm:text-base shadow-sm outline-none focus:ring-2 focus:ring-[#101828]/15"
            style={{ ...inter, borderColor: INPUT_BORDER, color: HEADING_TEXT }}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </span>
        </div>

        {loadError ? (
          <p className="text-sm text-red-700 mb-6" style={inter} role="alert">
            {loadError}
          </p>
        ) : null}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <aside className="w-full lg:w-[220px] shrink-0 space-y-4">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ ...inter, color: LABEL_TEXT }}
            >
              Filters
            </p>
            <div className="space-y-3">
              <div className="relative">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border bg-white py-3 pl-4 pr-10 text-xs font-semibold uppercase tracking-wide text-[#101828] shadow-sm outline-none focus:ring-2 focus:ring-[#101828]/10"
                  style={{ ...inter, borderColor: INPUT_BORDER }}
                  aria-label="Filter by location"
                >
                  <option value="">Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <ChevronDown />
                </span>
              </div>
              <div className="relative">
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full appearance-none rounded-xl border bg-white py-3 pl-4 pr-10 text-xs font-semibold uppercase tracking-wide text-[#101828] shadow-sm outline-none focus:ring-2 focus:ring-[#101828]/10"
                  style={{ ...inter, borderColor: INPUT_BORDER }}
                  aria-label="Filter by team"
                >
                  <option value="">Teams</option>
                  {teams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <ChevronDown />
                </span>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <p className="text-right text-sm mb-3" style={{ ...inter, color: BODY_MUTED }}>
              {filtered.length} {filtered.length === 1 ? 'Job' : 'Jobs'} found
            </p>

            <div
              className="rounded-2xl border bg-white shadow-sm overflow-hidden"
              style={{ borderColor: INPUT_BORDER }}
            >
              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.75fr)] gap-2 px-4 py-3 border-b text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]"
                style={{ ...inter, borderColor: INPUT_BORDER }}
              >
                <span>Job title</span>
                <span className="hidden sm:block">Team</span>
                <span className="text-right sm:text-left">Location</span>
              </div>

              <div
                className="max-h-[min(420px,55vh)] overflow-y-auto overscroll-contain [scrollbar-width:thin] [scrollbar-color:#2563EB_#F1F5F9]"
                style={inter}
              >
                {filtered.length === 0 && !loadError ? (
                  <div className="px-4 py-10 text-sm text-center space-y-2 max-w-lg mx-auto" style={{ color: BODY_MUTED }}>
                    {jobs.length === 0 ? (
                      <>
                        <p>No open roles are listed yet.</p>
                        {process.env.NODE_ENV === 'development' ? (
                          <p className="text-xs leading-relaxed">
                            If the role exists in Supabase: turn on{' '}
                            <strong className="font-medium text-[#374151]">Published</strong> in admin, add{' '}
                            <code className="text-[11px] bg-[#F3F4F6] px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> to{' '}
                            <code className="text-[11px] bg-[#F3F4F6] px-1 rounded">apps/web/.env.local</code> (or the repo root{' '}
                            <code className="text-[11px] bg-[#F3F4F6] px-1 rounded">.env</code>), restart the dev server, and use the same{' '}
                            <code className="text-[11px] bg-[#F3F4F6] px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> as in admin.
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <p>No roles match your filters. Try clearing location or team filters.</p>
                    )}
                  </div>
                ) : null}
                {filtered.map((job) => (
                  <Link
                    key={job.id}
                    href={`/careers/${encodeURIComponent(job.slug)}`}
                    className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.75fr)] gap-2 px-4 py-3.5 border-b border-[#F3F4F6] items-center hover:bg-[#FAFAFA] transition-colors group"
                  >
                    <span className="text-sm font-medium text-[#101828] flex items-center gap-1 min-w-0">
                      <span className="truncate">{job.title}</span>
                      <span className="text-[#9CA3AF] group-hover:text-[#101828] shrink-0" aria-hidden>
                        →
                      </span>
                    </span>
                    <span className="hidden sm:flex">
                      <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4B5563] max-w-full truncate">
                        {job.team || '—'}
                      </span>
                    </span>
                    <span className="text-sm text-[#4B5563] sm:text-left text-right sm:order-none order-first sm:order-none">
                      {job.location || '—'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
