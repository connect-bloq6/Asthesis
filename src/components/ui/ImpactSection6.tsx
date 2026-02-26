'use client'

/**
 * Impact – Quote section. Two-line quote with "able" and "to ask" in reddish-brown.
 * Attribution: "— The principle behind Asthesis." (lighter grey, italic, right-aligned).
 */

export default function ImpactSection6() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Principle behind Asthesis"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-5 sm:pt-10 md:pt-12 lg:pt-16 pb-10 sm:pb-16 md:pb-20 lg:pb-24 text-center">
        {/* Quote – two lines; "able" and "to ask" in reddish-brown */}
        <blockquote
          className="font-medium text-[#424242] mb-5 sm:mb-8 text-left sm:text-center"
          style={{
            fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
            fontSize: 'clamp(1.25rem, 4vw, 2rem)',
            lineHeight: '1.35',
          }}
        >
          <span className="block">
            Care should not depend on someone being{' '}
            <span style={{ color: '#B94A3A' }}>able</span>
          </span>
          <span className="block mt-1">
            <span style={{ color: '#B94A3A' }}>to ask</span> for help.
          </span>
        </blockquote>
        {/* Attribution – lighter grey, italic; center on mobile, right on desktop */}
        <p
          className="text-center sm:text-right italic font-normal text-sm sm:text-base"
          style={{
            fontFamily: 'Inter, var(--font-inter), system-ui, sans-serif',
            color: '#888888',
          }}
        >
          — The principle behind Asthesis.
        </p>
      </div>
    </section>
  )
}
