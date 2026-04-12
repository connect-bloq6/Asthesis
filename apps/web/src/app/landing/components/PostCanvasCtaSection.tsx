'use client'

import { useKnowMoreModal } from './KnowMoreModal'

export function PostCanvasCtaSection() {
  const { openKnowMore, portal } = useKnowMoreModal()

  return (
    <>
      <section
        className="relative w-full bg-white px-4 py-16 sm:py-20 md:py-24"
        aria-labelledby="post-canvas-cta-heading"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8 text-center">
          <h2
            id="post-canvas-cta-heading"
            className="font-bold tracking-tight text-[#1D1D1F]"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
              lineHeight: 1.2,
            }}
          >
            Proactive, person centred care at home
          </h2>
          <button
            type="button"
            onClick={openKnowMore}
            className="rounded-full px-8 py-3.5 text-base font-bold text-[#1D1D1F] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/25 focus-visible:ring-offset-2"
            style={{
              fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
              backgroundColor: '#F5E6D3',
            }}
          >
            Know more
          </button>
        </div>
      </section>
      {portal}
    </>
  )
}
