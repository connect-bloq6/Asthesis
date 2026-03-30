'use client'

import Image from 'next/image'

/**
 * About page – Section 2: Hero image
 * Figma: image "Peaceful home environment"
 * Layout: 1232.01px × 600px (Fill – fill width, fixed height)
 */

/** Figma layout: 1232.01 × 600px, Fill */
export default function AboutSection2() {
  return (
    <section
      className="relative w-full bg-background"
      aria-label="Peaceful home environment"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl max-w-[1232px] aspect-[1232/600] min-h-[200px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[280px] mx-auto">
          <Image
            src="/images/homeenv.png"
            alt="Peaceful home environment"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1232px"
            priority={false}
          />
        </div>
      </div>
    </section>
  )
}
