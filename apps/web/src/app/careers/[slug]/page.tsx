import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { JobPostingRow } from '@asthesis/shared'
import { HEADING_TEXT } from '@asthesis/shared'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { getPublishedJobBySlug } from '@/lib/careers-queries'
import { CareerApplyForm } from './CareerApplyForm'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

type PageProps = {
  params: { slug: string }
}

export default async function CareerDetailPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug ?? '').trim()
  if (!slug) notFound()

  const { job, error } = await getPublishedJobBySlug(slug)
  if (error || !job) notFound()

  const jobRow = job as JobPostingRow

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar solid />
      <article className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 pt-24 sm:pt-28 pb-16">
        <Link
          href="/impact#careers"
          className="text-sm text-[#4B5563] hover:text-[#101828] mb-8 inline-block"
          style={inter}
        >
          ← Back to careers
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6B7280] mb-2" style={inter}>
          {jobRow.team || 'Team'} · {jobRow.location || 'Location'}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6" style={{ ...inter, color: HEADING_TEXT }}>
          {jobRow.title}
        </h1>

        <div
          className="max-w-none text-[#4A5565] text-sm sm:text-base leading-relaxed whitespace-pre-wrap mb-12"
          style={inter}
        >
          {jobRow.description?.trim() ? jobRow.description : 'Role details will be posted here shortly.'}
        </div>

        <CareerApplyForm jobId={jobRow.id} jobTitle={jobRow.title} />
      </article>
      <Footer />
    </main>
  )
}
