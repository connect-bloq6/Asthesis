'use client'

/**
 * Impact – Figma: two-column "THE REALITY" section.
 * Left: label + heading (two lines); "unseen." in reddish-brown. Right: paragraph aligned.
 */

export default function ImpactSection3() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="The reality"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-2 sm:pt-5 md:pt-7 lg:pt-10 pb-10 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 lg:items-start">
          {/* Left column – THE REALITY label then two-line heading */}
          <div>
            <p
              className="uppercase tracking-[0.08em] mb-3 sm:mb-4"
              style={{
                fontFamily: 'var(--font-inter), Inter',
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '20px',
                letterSpacing: '0.1em',
                color: '#6E6E73',
              }}
            >
              THE REALITY
            </p>
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-[#101828]"
              style={{
                fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                lineHeight: '1.25',
              }}
            >
              <span className="block">Millions live independently.</span>
              <span className="block mt-1">
                Too many do so <span style={{ color: '#B94A3A' }}>unseen.</span>
              </span>
            </h2>
          </div>
          {/* Right column – paragraph aligned under same “line” as left heading */}
          <div className="lg:pt-9">
            <p
              className="text-[#4A5565] leading-relaxed max-w-[540px] text-[15px] sm:text-base"
              style={{
                fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                fontWeight: 400,
                lineHeight: '1.65',
              }}
            >
              As demand for home-based care grows and support networks become more distributed, traditional care systems struggle to keep pace. Many rely on emergency buttons, scheduled check-ins, or constant supervision — systems that act only after something has already gone wrong. In most cases, the warning signs were present long before the emergency.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
