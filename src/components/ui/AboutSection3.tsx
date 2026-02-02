'use client'

import Image from 'next/image'

/**
 * About page – Section 3: "Our Story"
 */

export default function AboutSection3() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Our story"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 sm:gap-10 lg:gap-14 items-center">
          <div className="min-w-0">
            <p
              className="uppercase tracking-wide mb-4"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.05em',
                color: '#6B7280',
              }}
            >
              Our story
            </p>
            <h2
              className="max-w-[552px] mb-6"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: '1.2',
                letterSpacing: '-1px',
                color: '#101828',
              }}
            >
              It started with a phone call no family should have to receive.
            </h2>
            <div className="space-y-5 max-w-[587px]">
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '27.2px',
                  letterSpacing: '0px',
                  color: '#4A5565',
                }}
              >
                Our founder&apos;s grandmother had fallen at home. She lay there for hours before anyone knew. By the time help arrived, what could have been a minor incident had become a medical emergency.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '27.2px',
                  letterSpacing: '0px',
                  color: '#4A5565',
                }}
              >
                That moment changed everything. Not because of the injury, but because of what it revealed: the gap between wanting to live independently and having the safety net to do so with confidence.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '27.2px',
                  letterSpacing: '0px',
                  color: '#4A5565',
                }}
              >
                We founded Asthesis to close that gap—with technology that respects privacy, preserves autonomy, and provides families with the reassurance they desperately need.
              </p>
            </div>
          </div>
          <div className="relative w-full max-w-[620px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-2xl lg:mx-0 mx-auto aspect-[592/500] min-h-[260px] sm:min-h-[300px] lg:min-h-[400px]">
            <Image
              src="/images/Container.png"
              alt="Our story – care and independence"
              fill
              className="object-cover rounded-xl sm:rounded-2xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 620px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
