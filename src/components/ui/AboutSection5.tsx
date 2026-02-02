'use client'

/**
 * About page – Section 5: "Built on ethical foundations"
 * Centered heading + four principles in a row (value + label each).
 */

const mainHeadingStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 500,
  fontSize: 'clamp(26px, 3.5vw, 40px)',
  lineHeight: '1.25',
  letterSpacing: '-0.02em',
  color: '#101828',
} as const

const valueStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 600,
  fontSize: 'clamp(28px, 4vw, 36px)',
  lineHeight: '1.2',
  letterSpacing: '-0.02em',
  color: '#101828',
} as const

/** Sub-labels: thin weight for a clean, light look per Figma */
const labelStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 300,
  fontSize: '15px',
  lineHeight: '1.5',
  letterSpacing: '0.01em',
  color: '#6B7280',
} as const

const principles = [
  { value: '100%', label: 'Privacy-first design' },
  { value: 'Zero', label: 'Data sold to third parties' },
  { value: 'Full', label: 'User consent and control' },
  { value: '24/7', label: 'Ethical commitment' },
]

export default function AboutSection5() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Built on ethical foundations"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-20 lg:py-24">
        <div>
          {/* Centered heading */}
          <h2
            className="text-center mb-8 sm:mb-10 md:mb-14"
            style={mainHeadingStyle}
          >
            Built on ethical foundations.
          </h2>

          {/* Four principles: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 lg:gap-6">
            {principles.map((item) => (
              <div
                key={item.label}
                className="text-center"
              >
                <p className="mb-2" style={valueStyle}>
                  {item.value}
                </p>
                <p style={labelStyle}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
