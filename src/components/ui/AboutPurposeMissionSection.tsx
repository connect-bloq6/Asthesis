'use client'

/**
 * About page – Section 4: "Our Purpose" and "Our Mission"
 * Two equal columns; content width and font sizes tuned so line breaks
 * match the design (heading on one line, paragraph in two, bullets as specified).
 */

const subHeadingStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.05em',
  color: '#6B7280',
} as const

const mainHeadingStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 600,
  fontSize: '32px',
  lineHeight: '1.2',
  letterSpacing: '-0.02em',
  color: '#101828',
} as const

const bodyStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '1.7',
  letterSpacing: '0px',
  color: '#4A5565',
} as const

/** Off-white card background per Figma: #F9FAFB at 50% opacity */
const CARD_BG = 'rgba(249, 250, 251, 0.5)'

export default function AboutPurposeMissionSection() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Our purpose and mission"
    >
      <div className="max-w-[1232px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-12 sm:py-14 md:py-20 lg:py-24">
        {/* Gap between cards so each background is visually separate */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          <div
            className="min-w-0 flex flex-col items-start rounded-lg p-6 sm:p-7 md:p-8 lg:p-10"
            style={{ backgroundColor: CARD_BG }}
          >
            <div className="w-full max-w-[520px]">
              <p
                className="uppercase tracking-wide mb-4"
                style={subHeadingStyle}
              >
                Our purpose
              </p>
              <h2 className="mb-5" style={mainHeadingStyle}>
                Dignity-first care, always.
              </h2>
              <p className="mb-6" style={bodyStyle}>
                We exist to ensure that everyone can age with grace, independence, and safety—without sacrificing privacy or comfort.
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2.5" style={{ ...bodyStyle }}>
                <li>Enable independent living without constant supervision</li>
                <li>Provide families with peace of mind, not intrusive monitoring</li>
                <li>Respect privacy while protecting wellbeing</li>
              </ul>
            </div>
          </div>
          <div
            className="min-w-0 flex flex-col items-start rounded-lg p-6 sm:p-7 md:p-8 lg:p-10"
            style={{ backgroundColor: CARD_BG }}
          >
            <div className="w-full max-w-[520px]">
              <p
                className="uppercase tracking-wide mb-4"
                style={subHeadingStyle}
              >
                Our mission
              </p>
              <h2 className="mb-5" style={mainHeadingStyle}>
                Redefining welfare technology.
              </h2>
              <p className="mb-6" style={bodyStyle}>
                We&apos;re building intelligent systems that understand context, respect boundaries, and act with care—not just algorithms.
              </p>
              <ul className="list-disc list-outside pl-5 space-y-2.5" style={{ ...bodyStyle }}>
                <li>Develop AI that learns routines without recording lives</li>
                <li>Create technology that feels invisible and unobtrusive</li>
                <li>Set new standards for ethical care innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
