'use client'

import Image from 'next/image'

/**
 * Product page – Last section: full-width image (men2.png), same treatment as Impact page last image.
 */

export default function ProductSection5() {
  return (
    <section className="relative w-full bg-white" aria-label="Product lifestyle">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pb-10 sm:pb-16 md:pb-24">
        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl max-w-[1232px] aspect-[4/3] sm:aspect-[1232/600] min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px] mx-auto">
          <Image
            src="/images/men2.png"
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
