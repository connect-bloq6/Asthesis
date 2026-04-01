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
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-0 lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center overflow-visible">
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
            <div className="w-full max-w-[min(100%,680px)] lg:max-w-[min(100%,720px)]">
              <p
                className="text-lg sm:text-xl font-bold text-[#1D1D1F] mb-3 sm:mb-4"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  lineHeight: '1.3',
                }}
              >
                An AI powered, home based technology enabled care platform for proactive wellbeing monitoring
              </p>
              <p
                className="text-base sm:text-lg leading-relaxed mb-5 sm:mb-6"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  color: '#6B6F76',
                }}
              >
                Asthesis is an intelligent in-home solution designed to support early identification of risk, safer independent living and more informed decision-making across care pathways.
              </p>
              {/* <p
                className="text-sm sm:text-base font-semibold text-[#1D1D1F] mb-2 sm:mb-2.5"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  lineHeight: '1.35',
                }}
              >
                Supporting line
              </p> */}
              <p
                className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  color: '#6B6F76',
                }}
              >
                By combining ambient monitoring, on device AI and privacy preserving sensing, Asthesis helps detect changes in routine, movement and wellbeing without requiring the user to wear or manage additional equipment.
              </p>
            </div>
            {/* <Link
              href="#explore"
              className="inline-flex items-center gap-3 w-fit px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#F6EFE0] border border-[#E5D9C8] hover:bg-[#EBDCC8] transition-colors text-[#1D1D1F] text-[15px] font-medium"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
            >
              Explore the Device
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link> */}
          </div>

          {/* Right column – device: smaller, off-frame right, rotated (reference) */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end lg:items-center overflow-visible min-h-[280px] sm:min-h-[320px] lg:min-h-0">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none lg:w-[420px] xl:w-[480px] aspect-[3/4] shrink-0 overflow-visible lg:origin-center lg:rotate-[10deg] lg:translate-x-[60px] lg:translate-y-[20px] lg:scale-[1.02]">
              <Image
                src="/images/rectangle_product.png"
                alt="Asthesis device"
                fill
                className="object-contain object-center"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 480px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
