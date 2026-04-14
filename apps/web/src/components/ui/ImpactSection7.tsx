'use client'

import Image from 'next/image'

/**
 * Impact – "OUR MISSION" section. Left: label, heading, paragraph, bullets.
 * Right: composite device image (Group.png + motherboard.png + screen.png per Figma).
 */

const BULLETS = [
  'Identify emerging risk earlier, before a crisis develops, strengthening technology enabled care pathways',
  'Reduce avoidable escalation and emergency presentations, supporting home first and virtual models of care',
  'Support people to remain safely and independently at home',
  'Provide reassurance without surveillance, through privacy preserving monitoring',
]

export default function ImpactSection7() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Our mission"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-10 xl:px-12 py-10 sm:py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 sm:gap-10 lg:gap-10 xl:gap-12 lg:items-center">
          {/* Left column; shift ~1% right */}
          <div className="order-2 lg:order-1 min-w-0 ml-[1%]">
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
              OUR MISSION
            </p>
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.25rem] font-semibold leading-tight tracking-tight mb-4 sm:mb-6"
              style={{
                fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                lineHeight: '1.2',
              }}
            >
              <span className="block text-[#101828]">Preventing avoidable harm</span>
              <span className="block mt-1" style={{ color: '#B94A3A' }}>
                through proactive insight
              </span>
            </h2>
            <div
              className="w-full max-w-full mb-5 sm:mb-8 text-[#4A5565] text-sm sm:text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                fontWeight: 400,
                lineHeight: '1.6',
              }}
            >
              <p className="m-0">
                Asthesis supports a more preventative, person centred and digitally enabled model of care by helping services:
              </p>
            </div>
            <ul className="space-y-2 sm:space-y-3 list-disc list-outside pl-5 sm:pl-6 marker:text-[#4A5565] text-[#4A5565] text-sm sm:text-base md:text-lg">
              {BULLETS.map((item) => (
                <li
                  key={item}
                  className="pl-1.5 sm:pl-2"
                  style={{
                    fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column – image; smaller on mobile/tablet */}
          <div className="order-1 lg:order-2 relative w-full min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[400px] xl:min-h-[420px] flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] xl:max-w-[400px] mx-auto lg:mr-0 aspect-[4/5] max-h-[320px] sm:max-h-[380px] lg:max-h-[420px]">
              <Image
                src="/images/Group.png"
                alt="Asthesis device supporting preventative, person centred care at home"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 85vw, 420px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
