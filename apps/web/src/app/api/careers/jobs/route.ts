import { NextResponse } from 'next/server'
import { listPublishedJobs } from '@/lib/careers-queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const { jobs, error } = await listPublishedJobs()

  if (error) {
    console.error('[careers/jobs]', error)
    const isConfig = error.toLowerCase().includes('missing')
    return NextResponse.json(
      {
        error: isConfig ? 'Careers listings are temporarily unavailable.' : 'Could not load jobs.',
        detail: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: isConfig ? 503 : 502 }
    )
  }

  return NextResponse.json({ jobs: jobs ?? [] })
}
