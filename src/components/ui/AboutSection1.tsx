'use client'

/**
 * About page – Section 1: "Who we are"
 * Typography and layout from Figma:
 * - Sub-heading: WHO WE ARE (smaller, lighter gray, uppercase)
 * - Main heading: Inter 500, 64px, 70.4px line-height, -1.6px letter-spacing, #101828
 * - Description: Inter 400, 20px, 32px line-height, 0 letter-spacing, #4A5565, max-width 768px
 */

export default function AboutSection1() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Who we are"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
        <div className="p-0">
          {/* Sub-heading: WHO WE ARE */}
          <p
            className="uppercase tracking-wide mb-3 sm:mb-4 md:mb-6"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.05em',
              color: '#6B7280',
            }}
          >
            Who we are
          </p>

          {/* Main heading */}
          <h1
            className="max-w-[1005px] mb-5 sm:mb-6 md:mb-8"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: '1.1',
              letterSpacing: '-1.6px',
              color: '#101828',
            }}
          >
            We&apos;re building technology that quietly looks out for people—when it matters most.
          </h1>

          {/* Description – responsive font size: mobile/iPad smaller, desktop 20px */}
          <p
            className="max-w-[768px] text-base sm:text-lg md:text-[18px] lg:text-[20px] leading-snug sm:leading-normal md:leading-8 lg:leading-[32px]"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontWeight: 400,
              letterSpacing: '0px',
              color: '#4A5565',
            }}
          >
            Asthesis exists to protect dignity, independence, and peace of mind. We believe care technology should feel invisible, respectful, and deeply human.
          </p>
        </div>
      </div>
    </section>
  )
}
