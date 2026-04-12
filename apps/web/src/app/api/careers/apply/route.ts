import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabasePublicEnv } from '@asthesis/shared'
import { createServiceClient } from '@/lib/supabase-service'

export const runtime = 'nodejs'

const BUCKET = 'job-resumes'
const MAX_BYTES = 5 * 1024 * 1024

const ALLOWED_MIME = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function extensionFromName(name: string): string {
  const m = name.match(/\.(pdf|doc|docx)$/i)
  if (!m) return '.pdf'
  const e = m[1].toLowerCase()
  if (e === 'docx') return '.docx'
  if (e === 'doc') return '.doc'
  return '.pdf'
}

function safeFileStem(name: string): string {
  const base = name.replace(/\.[^.]+$/, '')
  const cleaned = base.replace(/[^\w.-]+/g, '_').slice(0, 64)
  return cleaned || 'resume'
}

export async function POST(req: NextRequest) {
  const service = createServiceClient()
  if (!service) {
    const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
    const hasPubKey = Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim()
    )
    const hasService = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim())
    return NextResponse.json(
      {
        error: 'Applications are temporarily unavailable. Missing server configuration.',
        hint:
          !hasService
            ? 'Set SUPABASE_SERVICE_ROLE_KEY for the web app (e.g. in apps/web/.env.local or apps/admin/.env.local), then restart the dev server.'
            : !hasUrl || !hasPubKey
              ? 'Set NEXT_PUBLIC_SUPABASE_URL and a public Supabase key in apps/web/.env.local.'
              : 'Check that Supabase URL and service role key belong to the same project.',
      },
      { status: 503 }
    )
  }

  let fd: FormData
  try {
    fd = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const job_id = fd.get('job_id')
  const full_name = fd.get('full_name')
  const email = fd.get('email')
  const phone = typeof fd.get('phone') === 'string' ? (fd.get('phone') as string).trim() : ''
  const cover_letter = fd.get('cover_letter')
  const file = fd.get('resume')

  if (!isNonEmptyString(job_id) || !isNonEmptyString(full_name) || !isNonEmptyString(email)) {
    return NextResponse.json({ error: 'Job, name, and email are required.' }, { status: 400 })
  }

  if (!isNonEmptyString(cover_letter)) {
    return NextResponse.json({ error: 'Please add a short cover letter.' }, { status: 400 })
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Please attach a resume (PDF or Word).' }, { status: 400 })
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Resume must be 5 MB or smaller.' }, { status: 400 })
  }

  const mime = file.type || 'application/octet-stream'
  if (!ALLOWED_MIME.has(mime)) {
    return NextResponse.json({ error: 'Resume must be a PDF or Word document.' }, { status: 400 })
  }

  const cfg = getSupabasePublicEnv()
  if (!cfg) {
    return NextResponse.json({ error: 'Applications are temporarily unavailable.' }, { status: 503 })
  }

  const verify = createClient(cfg.url, cfg.key)
  const { data: job, error: jobErr } = await verify
    .from('job_postings')
    .select('id')
    .eq('id', job_id.trim())
    .eq('published', true)
    .maybeSingle()

  if (jobErr || !job) {
    return NextResponse.json({ error: 'This job is not open for applications.' }, { status: 400 })
  }

  const applicationId = crypto.randomUUID()
  const ext = extensionFromName(file.name)
  const stem = safeFileStem(file.name)
  const objectPath = `applications/${applicationId}/${stem}${ext}`

  const buf = Buffer.from(await file.arrayBuffer())
  const { error: upErr } = await service.storage.from(BUCKET).upload(objectPath, buf, {
    contentType: mime,
    upsert: false,
  })

  if (upErr) {
    console.error('[careers/apply upload]', upErr.message)
    return NextResponse.json({ error: 'Could not upload resume. Please try again.' }, { status: 502 })
  }

  const { error: insErr } = await service.from('job_applications').insert({
    id: applicationId,
    job_id: job.id,
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    phone,
    cover_letter: cover_letter.trim(),
    resume_storage_path: objectPath,
  })

  if (insErr) {
    console.error('[careers/apply insert]', insErr.message)
    await service.storage.from(BUCKET).remove([objectPath])
    return NextResponse.json({ error: 'Could not save your application. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
