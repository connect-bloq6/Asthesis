'use client'

import { useEffect, useState } from 'react'
import type { JobPostingRow } from '@asthesis/shared'
import {
  BODY_MUTED,
  CARD_BG,
  HEADING_TEXT,
  LABEL_TEXT,
  slugifyTitle,
} from '@asthesis/shared'
import { createClient } from '@/lib/supabase/client'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

type JobPostingsManagerProps = {
  initialRows: JobPostingRow[]
}

type FormState = {
  title: string
  team: string
  location: string
  slug: string
  description: string
  published: boolean
}

const emptyForm: FormState = {
  title: '',
  team: '',
  location: '',
  slug: '',
  description: '',
  published: true,
}

export function JobPostingsManager({ initialRows }: JobPostingsManagerProps) {
  const [supabase] = useState(() => createClient())
  const [rows, setRows] = useState<JobPostingRow[]>(initialRows)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [slugManual, setSlugManual] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<FormState>(emptyForm)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setRows(initialRows)
  }, [initialRows])

  const refresh = async () => {
    const { data, error: qErr } = await supabase.from('job_postings').select('*').order('created_at', {
      ascending: false,
    })
    if (!qErr && data) setRows(data as JobPostingRow[])
  }

  const onNewTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: slugManual ? f.slug : slugifyTitle(title),
    }))
  }

  const insertWithUniqueSlug = async (payload: {
    title: string
    team: string
    location: string
    slug: string
    description: string
    published: boolean
  }) => {
    let slugTry = payload.slug.trim() || slugifyTitle(payload.title)
    for (let i = 0; i < 8; i++) {
      const { data, error: insErr } = await supabase
        .from('job_postings')
        .insert({
          title: payload.title.trim(),
          team: payload.team.trim(),
          location: payload.location.trim(),
          slug: slugTry,
          description: payload.description.trim(),
          published: payload.published,
        })
        .select('*')
        .single()

      if (!insErr && data) return { data: data as JobPostingRow, error: null as string | null }
      if (insErr?.code !== '23505') {
        return { data: null, error: insErr?.message ?? 'Insert failed' }
      }
      slugTry = `${slugifyTitle(payload.title)}-${Math.random().toString(36).slice(2, 10)}`
    }
    return { data: null, error: 'Could not generate a unique URL slug. Try a different title or slug.' }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    setBusy(true)
    try {
      const { data, error: msg } = await insertWithUniqueSlug(form)
      if (msg || !data) {
        setError(msg ?? 'Could not create posting.')
        return
      }
      setForm(emptyForm)
      setSlugManual(false)
      setCreating(false)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  const startEdit = (row: JobPostingRow) => {
    setEditingId(row.id)
    setEditForm({
      title: row.title,
      team: row.team,
      location: row.location,
      slug: row.slug,
      description: row.description,
      published: row.published,
    })
    setError(null)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    setError(null)
    if (!editForm.title.trim()) {
      setError('Title is required.')
      return
    }
    setBusy(true)
    try {
      const baseSlug = editForm.slug.trim() || slugifyTitle(editForm.title)
      let slugTry = baseSlug
      let lastMsg: string | null = null
      for (let i = 0; i < 8; i++) {
        const { error: upErr } = await supabase
          .from('job_postings')
          .update({
            title: editForm.title.trim(),
            team: editForm.team.trim(),
            location: editForm.location.trim(),
            slug: slugTry,
            description: editForm.description.trim(),
            published: editForm.published,
          })
          .eq('id', editingId)

        if (!upErr) {
          setEditingId(null)
          await refresh()
          return
        }
        if (upErr.code !== '23505') {
          lastMsg = upErr.message
          break
        }
        slugTry = `${slugifyTitle(editForm.title)}-${Math.random().toString(36).slice(2, 10)}`
      }
      setError(lastMsg ?? 'Could not update (duplicate slug?).')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this job posting? Applications linked to it will be removed.')) return
    setBusy(true)
    setError(null)
    try {
      const { error: delErr } = await supabase.from('job_postings').delete().eq('id', id)
      if (delErr) {
        setError(delErr.message)
        return
      }
      if (editingId === id) setEditingId(null)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={inter}>
      {error ? (
        <p className="text-sm text-red-700 mb-4 rounded-lg px-4 py-3 border border-red-200 bg-red-50" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          type="button"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-[#101828] disabled:opacity-50"
          disabled={busy}
          onClick={() => {
            setCreating((c) => !c)
            setForm(emptyForm)
            setSlugManual(false)
            setError(null)
          }}
        >
          {creating ? 'Cancel' : 'New job posting'}
        </button>
      </div>

      {creating ? (
        <form
          onSubmit={handleCreate}
          className="mb-10 rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm space-y-4"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="text-lg font-semibold" style={{ color: HEADING_TEXT }}>
            Create posting
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Title
              <input
                required
                value={form.title}
                onChange={(e) => onNewTitleChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              URL slug
              <input
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true)
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
                placeholder="auto from title"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Team
              <input
                value={form.team}
                onChange={(e) => setForm((f) => ({ ...f, team: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Location
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
            Description
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={6}
              className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm resize-y"
            />
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: BODY_MUTED }}>
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published (visible on the public site)
          </label>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[#101828] disabled:opacity-50"
          >
            Save posting
          </button>
        </form>
      ) : null}

      {editingId ? (
        <form
          onSubmit={handleUpdate}
          className="mb-10 rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-sm space-y-4"
          style={{ backgroundColor: CARD_BG }}
        >
          <h2 className="text-lg font-semibold" style={{ color: HEADING_TEXT }}>
            Edit posting
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Title
              <input
                required
                value={editForm.title}
                onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              URL slug
              <input
                value={editForm.slug}
                onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Team
              <input
                value={editForm.team}
                onChange={(e) => setEditForm((f) => ({ ...f, team: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
            <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
              Location
              <input
                value={editForm.location}
                onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm"
              />
            </label>
          </div>
          <label className="block text-xs font-medium" style={{ color: LABEL_TEXT }}>
            Description
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
              rows={6}
              className="mt-1 w-full rounded-xl border border-[#E5E7EB] px-3 py-2 text-sm resize-y"
            />
          </label>
          <label className="flex items-center gap-2 text-sm" style={{ color: BODY_MUTED }}>
            <input
              type="checkbox"
              checked={editForm.published}
              onChange={(e) => setEditForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Published
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[#101828] disabled:opacity-50"
            >
              Save changes
            </button>
            <button
              type="button"
              disabled={busy}
              className="rounded-full px-6 py-2.5 text-sm font-semibold border border-[#E5E7EB] bg-white"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] shadow-sm" style={{ backgroundColor: CARD_BG }}>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Title
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Team
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Location
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Slug
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Pub.
              </th>
              <th className="px-4 py-3 font-medium whitespace-nowrap" style={{ color: LABEL_TEXT }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-[#F3F4F6] last:border-0">
                <td className="px-4 py-3 max-w-[10rem] truncate" style={{ color: HEADING_TEXT }}>
                  {row.title}
                </td>
                <td className="px-4 py-3 max-w-[8rem] truncate">{row.team}</td>
                <td className="px-4 py-3 max-w-[8rem] truncate">{row.location}</td>
                <td className="px-4 py-3 max-w-[10rem] truncate font-mono text-xs">{row.slug}</td>
                <td className="px-4 py-3">{row.published ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 whitespace-nowrap space-x-2">
                  <button
                    type="button"
                    className="text-[#2563EB] font-medium hover:underline"
                    disabled={busy}
                    onClick={() => startEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-700 font-medium hover:underline"
                    disabled={busy}
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm mt-6" style={{ color: BODY_MUTED }}>
          No job postings yet. Create one with &quot;New job posting&quot;.
        </p>
      ) : null}
    </div>
  )
}
