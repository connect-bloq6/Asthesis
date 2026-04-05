'use client'

import Image from 'next/image'

/**
 * Impact – Section below THE GAP: impact_group.png with caption.
 * Caption: "EVERYDAY HOMES. REAL LIVES. SILENT RISKS." (light grey, centered).
 */

export default function ImpactSection5() {
  return (
    <section
      className="relative w-full bg-white -mt-[3vh] sm:-mt-[4vh]"
      aria-label="Everyday homes, real lives"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-0 pb-10 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl max-w-[1232px] aspect-[1232/520] min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[260px] mx-auto">
          <Image
            src="/images/impact1.png"
            alt="People together in a living room, comfort and connection"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1232px"
          />
        </div>
        {/* Caption below image – keep this one (bottom heading) */}
        <p
          className="text-center mt-4 sm:mt-8 md:mt-10 uppercase tracking-[0.08em] text-xs sm:text-sm"
          style={{
            fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
            fontWeight: 500,
            lineHeight: '1.35',
            color: '#374151',
          }}
        >
          Everyday homes. Real lives. Silent risks.
        </p>
      </div>
    </section>
  )
}
