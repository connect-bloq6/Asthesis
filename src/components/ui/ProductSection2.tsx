'use client'

import Image from 'next/image'

/**
 * Product page – Section 2: "Designed for Homes, Not Hospitals".
 * Black background. Left: heading, paragraph, 3 features (numbers clean/clear).
 * Right: device2.png straight, vertical, bottom-aligned with section.
 */

const FEATURES = [
  {
    value: '24/7',
    label: 'Passive Monitoring',
  },
  {
    value: '72h',
    label: 'Battery Life',
  },
  {
    value: null,
    label: 'On-Device AI Processing',
    icon: true,
  },
]

export default function ProductSection2() {
  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      aria-label="Designed for homes, not hospitals"
    >
      <div className="max-w-[1200px] mx-auto w-full pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8 xl:pl-4 xl:pr-8 pt-16 sm:pt-20 lg:pt-24 xl:pt-28 pb-12 sm:pb-16 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(780px,1.2fr)_minmax(280px,0.8fr)] lg:gap-10 xl:gap-12 lg:items-start overflow-visible min-h-[420px]">
          {/* Left column – min 780px so description stays in 2 lines at full width; shift ~2% left */}
          <div className="order-2 lg:order-1 flex flex-col lg:min-h-[420px] lg:min-w-0 lg:-ml-[2%]">
            {/* Heading – one line */}
            <h2
              className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] xl:text-[3.25rem] font-bold text-white leading-tight tracking-tight pt-0 lg:whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                lineHeight: '1.2',
              }}
            >
              Designed for Homes, Not Hospitals
            </h2>
            {/* Description – two lines: wider block so text wraps to 2 lines */}
            <p
              className="text-white/90 text-base sm:text-lg leading-snug mt-6 sm:mt-8 w-full min-w-0"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                overflowWrap: 'normal',
              }}
            >
              Asthesis blends seamlessly into everyday spaces. It looks like a calm home object — not a medical instrument — while quietly delivering powerful safety insight for preventative and anticipatory care in the background.
            </p>
            {/* Three feature blocks – vertically in the middle of the space, not at bottom */}
            <div className="flex flex-wrap gap-x-10 gap-y-8 sm:gap-x-14 sm:gap-y-10 pt-10 sm:pt-12 lg:pt-0 lg:flex-1 lg:flex lg:items-center">
              {FEATURES.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.icon ? (
                    <div className="mb-2 flex items-center justify-center w-11 h-11 rounded-lg bg-white/10">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden>
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M9 9h6v6H9zM12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  ) : (
                    <span
                      className="text-[2rem] sm:text-[2.5rem] font-semibold leading-none mb-2 tracking-tight text-white"
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                  <span
                    className="text-sm sm:text-[15px] text-white/80 max-w-[140px] sm:max-w-[160px] leading-snug block"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      overflowWrap: 'normal',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – device2.png straight, vertical, bottom-aligned with section */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end lg:items-end min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[380px] xl:max-w-[420px] aspect-[3/4] shrink-0">
              <Image
                src="/images/device2.png"
                alt="Asthesis device – designed for homes"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
