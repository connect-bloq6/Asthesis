'use client'

import Link from 'next/link'

/**
 * About page – Section 7: CTA hero
 * Centered heading (wraps: "The future of care is calm," / "kind, and intelligent."),
 * description in two lines, two neat pill buttons with clear text size.
 */

const mainHeadingStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 500,
  fontSize: 'clamp(28px, 3.5vw, 42px)',
  lineHeight: '1.25',
  letterSpacing: '-0.02em',
  color: '#101828',
} as const

const bodyStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '17px',
  lineHeight: '1.6',
  letterSpacing: '0',
  color: '#4A5565',
} as const

export default function AboutSection7() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Call to action"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-28 text-center">
        <div className="max-w-full sm:max-w-[720px] lg:max-w-[840px] mx-auto">
          {/* Heading: line 1 "The future of care is calm," line 2 "kind, and intelligent." */}
          <h2
            className="mx-auto mb-6 sm:mb-8"
            style={mainHeadingStyle}
          >
            The future of care is calm, kind, and intelligent.
          </h2>
          {/* Description: 2 lines on desktop (br visible sm+); natural wrap on mobile */}
          <p
            className="mx-auto mb-10 sm:mb-12 max-w-[800px] w-full"
            style={bodyStyle}
          >
            We&apos;re building a world where aging doesn&apos;t mean losing independence, where families don&apos;t
            <br className="hidden sm:block" />
            live in fear, and where technology serves humanity with grace and respect.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#101828] text-white font-medium text-[14px] leading-none hover:opacity-90 transition-opacity h-[50px] px-6 w-full sm:w-auto min-w-0"
            >
              Explore the Technology
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#101828] font-medium text-[14px] leading-none hover:bg-[#101828]/5 transition-colors h-[52px] px-6 border border-[#101828] w-full sm:w-auto min-w-0"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
