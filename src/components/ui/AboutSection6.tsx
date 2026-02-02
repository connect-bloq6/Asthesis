'use client'

import Image from 'next/image'

/**
 * About page – Section 6: "Our Team"
 */

export default function AboutSection6() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Our team"
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
              Our team
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
              Engineers, caregivers, and healthcare experts—together.
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
                Asthesis is built by a multidisciplinary team that includes software engineers, AI researchers, geriatric care specialists, ethicists, and family caregivers.
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
                We don&apos;t just understand technology—we understand what it&apos;s like to care for someone you love. That lived experience shapes every line of code, every feature, and every decision we make.
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
                We collaborate closely with families, care organisations, and healthcare providers to ensure our solutions truly serve the people who need them most.
              </p>
            </div>
          </div>
          <div className="relative w-full max-w-[620px] overflow-hidden rounded-xl sm:rounded-2xl lg:mx-0 mx-auto aspect-[592/500] min-h-[260px] sm:min-h-[300px] lg:min-h-[400px]">
            <Image
              src="/images/team.png"
              alt="Asthesis team collaborating"
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
