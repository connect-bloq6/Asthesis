'use client'

/**
 * Product page – Section 3: "Intelligent monitoring for earlier action".
 * White background, centered. Heading and description.
 */

export default function ProductSection3() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Intelligent monitoring for earlier action"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28 flex flex-col items-center justify-center text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] font-bold text-[#0A0A0A] leading-tight tracking-tight mb-6 max-w-[900px]"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          }}
        >
          Intelligent monitoring for earlier action
        </h2>
        <p
          className="text-base sm:text-lg text-[#4A5565] leading-relaxed max-w-[min(100%,720px)]"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          Asthesis is designed to do more than detect an emergency. It helps identify subtle change over time, such as altered mobility, reduced activity, extended periods of inactivity and shifts in normal routine, enabling earlier awareness when someone may need support.
        </p>
      </div>
    </section>
  )
}
