'use client'

import Image from 'next/image'

/**
 * Impact – "OUR VISION" section. Same white bg as other sections. Left = device.png in gray card, right = text.
 * Heading: "coexist" #B94A3A. Vision paragraph below.
 */

export default function ImpactSection8() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Our vision"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-3 xl:gap-4 lg:items-start">
          {/* Left column – device card: image and card bottom aligned (no gap) */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start w-full">
            <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] rounded-xl sm:rounded-2xl bg-[#F3F4F6] flex flex-col justify-end pt-4 sm:pt-6 px-4 sm:px-6 pb-0 min-h-[200px] sm:min-h-[240px] lg:min-h-[260px]">
              <div className="relative w-full aspect-[4/3] max-h-[180px] sm:max-h-[200px] lg:max-h-[220px] -mb-px">
                <Image
                  src="/images/device.png"
                  alt="Asthesis device"
                  fill
                  className="object-contain"
                  style={{ objectPosition: 'bottom center' }}
                  sizes="(max-width: 1024px) 80vw, 340px"
                />
              </div>
            </div>
          </div>

          {/* Right column – OUR VISION, heading, description; closer to image, shifted left */}
          <div className="order-1 lg:order-2 min-w-0 lg:-ml-[3%] xl:-ml-[4%] lg:pl-0">
            <p
              className="uppercase tracking-[0.08em] mb-2 sm:mb-4"
              style={{
                fontFamily: 'var(--font-inter), Inter',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '20px',
                letterSpacing: '0.1em',
                color: '#6E6E73',
              }}
            >
              OUR VISION
            </p>
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.25rem] font-semibold leading-tight tracking-tight mb-4 sm:mb-6 text-[#101828]"
              style={{
                fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                lineHeight: '1.25',
              }}
            >
              <span className="block">
                A future where independence and safety <span style={{ color: '#B94A3A' }}>coexist</span>.
              </span>
            </h2>
            <div
              className="w-full max-w-full lg:min-w-[420px] text-[#4A5565] text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                fontWeight: 400,
                lineHeight: '1.5',
              }}
            >
              <p className="m-0">
                We imagine communities where people can live at home for longer, with confidence rather than fear, and where health and social care teams can act earlier, calmly and ethically, so support feels more human, not more intrusive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
