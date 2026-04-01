'use client'

import Image from 'next/image'

/**
 * Impact – feature blocks + impact_l image + closing section (label, heading, paragraph).
 */

const FEATURES = [
  {
    icon: '/images/msg.png',
    title: 'Preventing avoidable harm',
    description:
      'By detecting subtle changes in daily patterns, Asthesis can help highlight concerns earlier and support proportionate intervention before a crisis develops.',
  },
  {
    icon: '/images/like.png',
    title: 'Supporting carers and families',
    description:
      'Asthesis provides reassurance without requiring constant check-ins or intrusive monitoring, helping build confidence around home based care.',
  },
  {
    icon: '/images/heart.png',
    title: 'Strengthening care system responsiveness',
    description:
      'Asthesis can support services to move from reactive response to more proactive support, with better visibility of emerging need and more informed prioritisation.',
  },
]

export default function ImpactSection9() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Impact features and closing"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-10 sm:pb-14 md:pb-16">
        <div className="space-y-8 sm:space-y-12 md:space-y-14">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 sm:gap-6 md:gap-8 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 object-contain"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-[#101828] mb-1.5 sm:mb-3"
                  style={{
                    fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                    lineHeight: '1.3',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#4A5565] text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* impact_l.png – responsive; full width in container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-10 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl max-w-[1232px] aspect-[4/3] sm:aspect-[1232/600] min-h-[200px] sm:min-h-[280px] max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] mx-auto">
          <Image
            src="/images/impact_l.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1232px"
          />
        </div>
        <div
          className="max-w-[900px] mx-auto pt-10 sm:pt-14 md:pt-16 lg:pt-20 text-center"
          aria-labelledby="impact-section9-closing-heading"
        >
          {/* <p
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
            CLOSING SECTION
          </p> */}
          <h2
            id="impact-section9-closing-heading"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 text-[#101828]"
            style={{
              fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
              lineHeight: '1.25',
            }}
          >
            A more preventative future for care at home
          </h2>
          <p
            className="text-[#4A5565] text-sm sm:text-base md:text-lg leading-relaxed max-w-[768px] mx-auto"
            style={{
              fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
              fontWeight: 400,
              lineHeight: '1.6',
            }}
          >
            We believe technology enabled care should help systems act earlier, support independence for longer, and improve the experience of care for individuals, families and services alike.
          </p>
        </div>
      </div>
    </section>
  )
}
