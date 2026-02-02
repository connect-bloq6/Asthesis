'use client'

import Image from 'next/image'

/**
 * About page – Section 4: "Our Values"
 * Centered header + 2×2 grid of value blocks. Icons: Frame.png, Frame2.png, Frame3.png, Frame4.png (24×24).
 */

const ICON_SIZE = 24

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
  fontWeight: 500,
  fontSize: 'clamp(26px, 3.5vw, 40px)',
  lineHeight: '1.2',
  letterSpacing: '-1px',
  color: '#101828',
} as const

const cardTitleStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '1.3',
  color: '#101828',
} as const

const bodyStyle = {
  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '27.2px',
  letterSpacing: '0px',
  color: '#4A5565',
} as const

const values = [
  {
    icon: '/images/Frame.png',
    title: 'Dignity First',
    description:
      "Every design decision starts with one question: does this preserve the person's sense of autonomy and respect? We never compromise on dignity.",
  },
  {
    icon: '/images/Frame2.png',
    title: 'Quiet Intelligence',
    description:
      'The best technology disappears into the background. Asthesis works silently, learning patterns without demanding attention or disrupting routines.',
  },
  {
    icon: '/images/Frame3.png',
    title: 'Trust Through Transparency',
    description:
      "We earn trust by being radically clear about what we collect, how it's used, and who has access. No hidden agendas, no data exploitation.",
  },
  {
    icon: '/images/Frame4.png',
    title: 'Care Without Fear',
    description:
      "Caring shouldn't mean living in constant worry. We create calm confidence—knowing help is available if needed, without hovering or anxiety.",
  },
]

/** Section 4 only: background #F9FAFB at 50% opacity for content effect */
const SECTION4_BG = 'rgba(249, 250, 251, 0.5)'

export default function AboutSection4() {
  return (
    <section
      className="relative w-full"
      aria-label="Our values"
      style={{ backgroundColor: SECTION4_BG }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-14 md:py-20 lg:py-24">
        <div>
          {/* Centered header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-14">
            <p
              className="uppercase tracking-wide mb-4"
              style={subHeadingStyle}
            >
              Our values
            </p>
            <h2
              className="max-w-2xl mx-auto"
              style={mainHeadingStyle}
            >
              What guides everything we build
            </h2>
          </div>

          {/* 2×2 grid: 1=Frame, 2=Frame2, 3=Frame3, 4=Frame4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 lg:gap-12">
            {values.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 md:gap-5 text-left"
              >
                <div
                  className="shrink-0 w-6 h-6 relative"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  aria-hidden
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-2" style={cardTitleStyle}>
                    {item.title}
                  </h3>
                  <p style={bodyStyle}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
