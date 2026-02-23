'use client'

import Image from 'next/image'
import Link from 'next/link'

/**
 * Product page – Section 4: "FEATURES AVAILABLE".
 * Intro: heading, description, Explore the Device button, separator line.
 * Then 3 feature cards at once with left/right nav icons (Figma: 31×31 circle, arrow #636363).
 */

const FEATURES = [
  {
    image: '/images/motion.png',
    title: 'Motion',
    description: 'Understands daily movement patterns and detects anomalies',
  },
  {
    image: '/images/mapping.png',
    title: 'LiDAR Gait Mapping',
    description: 'Analyzes walking patterns to identify mobility changes and early fall risk indicators.',
  },
  {
    image: '/images/thermal.png',
    title: 'Thermal Vision',
    description: 'Recognises heat signatures and presence without using cameras or recording images.',
  },
]

/** Figma: left arrow vector, color #636363, ~6.5×11px in 31×31 circle */
function NavArrowLeft() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="flex-shrink-0" aria-hidden>
      <path d="M6 1L1 5.5L6 10" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Figma: right arrow, same specs */
function NavArrowRight() {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="flex-shrink-0" aria-hidden>
      <path d="M1 1L6 5.5L1 10" stroke="#636363" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProductSection4() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Features available"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 xl:pt-28">
        {/* Intro: heading, description, button */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-10 mb-10 sm:mb-12">
          <div className="max-w-[720px]">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] uppercase tracking-tight mb-4 sm:mb-5"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              }}
            >
              Features Available
            </h2>
            <p
              className="text-[#4A5565] text-base sm:text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
              }}
            >
              Asthesis is designed to quietly support daily life through intelligent sensing, thoughtful interaction, and dependable safety — all without demanding constant attention from the user.
            </p>
          </div>
          <div className="mt-6 lg:mt-0 lg:flex-shrink-0">
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
        </div>

        {/* Horizontal separator */}
        <div className="border-b border-[#E5E7EB] w-full mb-12 sm:mb-16" />

        {/* 3 feature cards at once, with left/right nav icons (Figma 31×31 circle, #636363 arrow) */}
        <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6 pb-16 sm:pb-20 lg:pb-24 xl:pb-28">
          {/* Left icon – Figma: 31×31 circle, dark grey arrow */}
          <button
            type="button"
            className="flex-shrink-0 w-[31px] h-[31px] sm:w-10 sm:h-10 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <NavArrowLeft />
          </button>

          {/* Three cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 flex-1 min-w-0">
            {FEATURES.map((item) => (
              <div key={item.title} className="flex flex-col">
                <div className="relative w-full aspect-[3/4] max-w-[320px] mx-auto md:max-w-none rounded-xl overflow-hidden bg-[#F9FAFB] mb-5 sm:mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 767px) 320px, (max-width: 1024px) 33vw, 380px"
                  />
                </div>
                <h3
                  className="text-lg sm:text-xl font-semibold text-[#0A0A0A] mb-2"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#4A5565] text-sm sm:text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right icon – same Figma style */}
          <button
            type="button"
            className="flex-shrink-0 w-[31px] h-[31px] sm:w-10 sm:h-10 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <NavArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}
