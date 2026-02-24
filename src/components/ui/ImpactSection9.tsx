'use client'

import Image from 'next/image'

/**
 * Impact – Section 8: three feature blocks. Icon (msg, like, heart) + title + description.
 * Icons left-aligned; titles and paragraphs left-aligned in a column; icon vertically centered with title.
 */

const FEATURES = [
  {
    icon: '/images/msg.png',
    title: 'Preventing Silent Emergencies',
    description:
      'By detecting subtle changes in daily patterns, Asthesis identifies risks before they become crises — allowing families and caregivers to intervene early, thoughtfully, and with dignity.',
  },
  {
    icon: '/images/like.png',
    title: 'Supporting Families',
    description:
      "Distance doesn't have to mean disconnection. Asthesis gives families calm reassurance without requiring constant check-ins or invasive monitoring, strengthening relationships through respect and trust.",
  },
  {
    icon: '/images/heart.png',
    title: 'Strengthening Care Systems',
    description:
      'Healthcare and social care organisations can shift from reactive response to proactive support — allocating resources more effectively and improving outcomes while respecting individual autonomy.',
  },
]

export default function ImpactSection9() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Features"
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
      {/* men.png – responsive; full width in container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-10 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl max-w-[1232px] aspect-[4/3] sm:aspect-[1232/600] min-h-[200px] sm:min-h-[280px] max-h-[420px] sm:max-h-[480px] lg:max-h-[520px] mx-auto">
          <Image
            src="/images/men.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1232px"
          />
        </div>
      </div>
    </section>
  )
}
