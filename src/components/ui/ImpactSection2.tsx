'use client'

import Image from 'next/image'

/**
 * Impact hero image - "TOO LATE" and paragraph overlaid on image.
 */

export default function ImpactSection2() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="When care comes too late"
    >
      <div className="w-full min-w-0 pb-12 sm:pb-16 md:pb-24">
        <div
          className="relative w-full min-w-0 aspect-[4/3] sm:aspect-[1232/600] min-h-[200px] sm:min-h-[280px] max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] overflow-hidden"
        >
            <Image
              src="/images/tolate.png"
              alt="Living space"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 28%, transparent 55%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col justify-start pt-5 sm:pt-8 md:pt-10 lg:pt-12 pb-4 overflow-visible">
              <div className="w-full h-full min-w-0 px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-start max-w-[1440px] mx-auto box-border">
                <div className="max-w-[640px] w-[calc(100%-2rem)] sm:w-auto ml-[1%] pr-4 sm:pr-6 md:pr-8">
                  <h2
                    className="leading-[1.05] tracking-tight uppercase mb-3 sm:mb-5 md:mb-6"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(32px, 8vw, 80px)',
                      letterSpacing: '-0.02em',
                      color: '#F7E6CA',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    Too late
                  </h2>
                  <p
                    className="max-w-[640px] text-white text-sm sm:text-base md:text-lg lg:text-[18px] leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 400,
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    Across homes worldwide, preventable incidents go unnoticed — not from neglect, but from silence.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
