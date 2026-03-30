import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import type { ContactSubmissionInsert } from '@asthesis/shared'
import { getSupabasePublicEnv } from '@asthesis/shared'

export const runtime = 'nodejs'

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const o = body as Record<string, unknown>
  const full_name = o.full_name
  const email = o.email
  const organisation = typeof o.organisation === 'string' ? o.organisation.trim() : ''
  const country_iso = typeof o.country_iso === 'string' ? o.country_iso.trim() : ''
  const phone = typeof o.phone === 'string' ? o.phone.trim() : ''
  const discuss_topic = o.discuss_topic
  const message = o.message

  if (!isNonEmptyString(full_name) || !isNonEmptyString(email)) {
    return NextResponse.json(
      { error: 'Name and work email are required.' },
      { status: 400 }
    )
  }

  if (!isNonEmptyString(discuss_topic) || !isNonEmptyString(message)) {
    return NextResponse.json(
      { error: 'Please choose a topic and enter a message.' },
      { status: 400 }
    )
  }

  const cfg = getSupabasePublicEnv()
  if (!cfg) {
    return NextResponse.json(
      { error: 'Contact form is temporarily unavailable.' },
      { status: 503 }
    )
  }

  const row: ContactSubmissionInsert = {
    full_name: full_name.trim(),
    email: email.trim().toLowerCase(),
    organisation,
    country_iso,
    phone,
    discuss_topic: discuss_topic.trim(),
    message: message.trim(),
  }

  const supabase = createClient(cfg.url, cfg.key)
  const { error } = await supabase.from('contact_submissions').insert(row)

  if (error) {
    console.error('[contact]', error.message)
    return NextResponse.json(
      { error: 'Could not send your message. Please try again later.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
