'use client'

/**
 * Impact hero – Figma: THE ISSUE + WHEN CARE COMES only, above the image.
 * Significant white space below navbar; clear spacing between label and heading.
 */

export default function ImpactSection1() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="The issue"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-20 sm:pt-28 md:pt-32 lg:pt-36 pb-0">
        <div className="max-w-[900px] ml-[1%]">
          {/* THE ISSUE – Inter only, #6E6E73 */}
          <p
            className="uppercase tracking-[0.08em] mb-4 sm:mb-5 md:mb-6"
            style={{
              fontFamily: 'var(--font-inter), Inter',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '20px',
              letterSpacing: '0.1em',
              color: '#6E6E73',
            }}
          >
            THE ISSUE
          </p>

          {/* WHEN CARE COMES – very large, bold, black, uppercase */}
          <h1
            className="leading-[1.05] tracking-tight uppercase"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(28px, 6vw, 64px)',
              letterSpacing: '-0.02em',
              color: '#101828',
            }}
          >
            When care comes
          </h1>
        </div>
      </div>
    </section>
  )
}
