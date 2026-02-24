'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Product hero – Matches Figma reference: 2-column, large H1 (200px scale), oversized device off-frame right.
 */

export default function ProductSection1() {
  return (
    <section
      className="relative w-full overflow-visible min-h-[calc(100vh-80px)] flex flex-col justify-center"
      aria-label="Product hero"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-0 lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:items-center overflow-visible">
          {/* Left column – text (reference: H1 200px, Inter 600, -1.6px spacing, #0A0A0A) */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <h1
              className="text-[clamp(48px,10vw,200px)] font-semibold leading-[0.88] mb-6 sm:mb-8"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                letterSpacing: '-1.6px',
                color: '#0A0A0A',
              }}
            >
              Asthesis
            </h1>
            <div className="max-w-[440px]">
              <p
                className="text-lg sm:text-xl font-bold text-[#1D1D1F] mb-3 sm:mb-4"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  lineHeight: '1.3',
                }}
              >
                A vigilant wellness hub for safe, connected aging
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  color: '#6B6F76',
                }}
              >
                Asthesis is a proactive, intelligent home device designed to quietly monitor wellbeing, detect risk early, and support independence — without feeling intrusive or clinical.
              </p>
            </div>
            <Link
              href="#explore"
              className="inline-flex items-center gap-3 w-fit px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#F6EFE0] border border-[#E5D9C8] hover:bg-[#EBDCC8] transition-colors text-[#1D1D1F] text-[15px] font-medium"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
            >
              Explore the Device
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right column – device: oversized, off-frame right, rotated (reference) */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end lg:items-center overflow-visible min-h-[280px] sm:min-h-[360px] lg:min-h-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none lg:w-[680px] xl:w-[760px] aspect-[3/4] shrink-0 overflow-visible lg:origin-center lg:rotate-[10deg] lg:translate-x-[80px] lg:translate-y-[20px] lg:scale-[1.02]">
              <Image
                src="/images/rectangle_product.png"
                alt="Asthesis device"
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 760px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
