'use client'

import Image from 'next/image'

/**
 * Product page – Last section: full-width image (men2.png) with text overlay.
 * Uses 100% width (not 100vw) to prevent overlay text cropping on mobile.
 */

export default function ProductSection5() {
  return (
    <section className="relative w-full min-w-0 bg-white overflow-hidden" aria-label="Product lifestyle">
      <div className="w-full min-w-0 pb-10 sm:pb-16 md:pb-24">
        <div className="w-full min-w-0 sm:max-w-[1440px] sm:mx-auto sm:px-6 md:px-12 lg:px-16">
          <div className="relative w-full min-w-0 aspect-[4/3] sm:aspect-[1232/600] min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px] max-w-[1232px] mx-auto rounded-none sm:rounded-xl md:rounded-2xl overflow-hidden">
            <Image
              src="/images/men.png"
              alt="Asthesis lifestyle – connected aging"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1232px"
            />
            {/* Gradient overlay for text readability */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 28%, transparent 55%)',
              }}
            />
            {/* Text overlay – mobile responsive */}
            <div className="absolute inset-0 z-10 flex flex-col justify-start pt-3 sm:pt-5 md:pt-8 lg:pt-10 xl:pt-12 pb-3 sm:pb-4 overflow-visible">
              <div className="w-full h-full min-w-0 px-3 sm:px-6 md:px-12 lg:px-16 flex flex-col justify-start max-w-[1440px] mx-auto box-border">
                <div className="max-w-[640px] w-[calc(100%-1.5rem)] sm:w-auto ml-0 sm:ml-[1%] pr-3 sm:pr-6 md:pr-8 py-3 sm:py-5 md:py-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <h2
                    className="uppercase mb-2 sm:mb-4 md:mb-6"
                    style={{
                      fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                      fontWeight: 600,
                      fontStyle: 'normal',
                      fontSize: 'clamp(22px, 5.5vw, 40px)',
                      lineHeight: 'clamp(28px, 6.5vw, 48px)',
                      letterSpacing: '-1px',
                      color: '#0A0A0A',
                    }}
                  >
                    Proactive, Not Reactive
                  </h2>
                  <div className="space-y-2 sm:space-y-3">
                    <p
                      className="max-w-[640px] text-[#0A0A0A] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[25.6px]"
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        letterSpacing: '0px',
                      }}
                    >
                      Unlike buttons that rely on user action, Asthesis anticipates — detecting subtle changes early and supporting safety before help is needed.
                    </p>
                    <p
                      className="max-w-[640px] text-[#0A0A0A] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[25.6px]"
                      style={{
                        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        letterSpacing: '0px',
                      }}
                    >
                      Through continuous pattern learning and contextual awareness, the system understands what&apos;s normal and identifies meaningful deviations that matter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
