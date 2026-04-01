'use client'

/**
 * Impact – "THE GAP" section. All content centered.
 * Exact line breaks: heading breaks after "not"; "gradual." in reddish-brown.
 */

export default function ImpactSection4() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="The gap"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-20 md:pb-24 lg:pb-28 text-center">
        {/* THE GAP – small uppercase, medium-dark grey, letter spacing */}
        <p
          className="uppercase tracking-[0.1em] mb-6 sm:mb-10 md:mb-12"
          style={{
            fontFamily: 'var(--font-inter), Inter',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '20px',
            color: '#6E6E73',
          }}
        >
          THE GAP
        </p>

        {/* Main heading – two lines: break after "not"; "gradual." in reddish-brown */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold leading-tight mb-6 sm:mb-10 md:mb-12 text-[#101828]"
          style={{
            fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
            lineHeight: '1.2',
          }}
        >
          <span className="block">Most critical incidents are not</span>
          <span className="block mt-1">
            sudden. They are <span style={{ color: '#B94A3A' }}>gradual.</span>
          </span>
        </h2>

        {/* Body: opening lines in grey, Asthesis line emphasised */}
        <div
          className="w-full mt-6 sm:mt-10 md:mt-12 text-center text-sm sm:text-base"
          style={{
            fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
            fontWeight: 400,
            lineHeight: '1.5',
          }}
        >
          <span className="block" style={{ color: '#6E6E73' }}>
            Risk often emerges before crisis.
          </span>
          <span className="block mt-1" style={{ color: '#6E6E73' }}>
            Missed routines, altered movement, prolonged inactivity and environmental changes can all be early indicators that a person may need review or support.
          </span>
          <span className="block font-semibold mt-1" style={{ color: '#1D1D1F' }}>
            Asthesis is designed to help close this gap through continuous, non intrusive monitoring.
          </span>
        </div>
      </div>
    </section>
  )
}
