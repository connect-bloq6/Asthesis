import { NextResponse, type NextRequest } from 'next/server'
import type { JobPostingRow } from '@asthesis/shared'
import { getPublishedJobBySlug } from '@/lib/careers-queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, ctx: { params: { slug: string } }) {
  const slug = ctx.params.slug?.trim()
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const { job, error } = await getPublishedJobBySlug(slug)

  if (error) {
    console.error('[careers/jobs/slug]', error)
    const isConfig = error.toLowerCase().includes('missing')
    return NextResponse.json(
      {
        error: isConfig ? 'Careers are temporarily unavailable.' : 'Could not load job.',
        detail: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: isConfig ? 503 : 502 }
    )
  }

  if (!job) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ job: job as JobPostingRow })
}
