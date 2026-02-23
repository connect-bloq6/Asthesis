'use client'

/**
 * Product page – Section 3: "Intelligence That Listens Before You Ask".
 * White background, centered. Heading on one line, then description.
 */

export default function ProductSection3() {
  return (
    <section
      className="relative w-full bg-white"
      aria-label="Intelligence that listens"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-28 flex flex-col items-center justify-center text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] font-bold text-[#0A0A0A] leading-tight tracking-tight mb-6 max-w-[900px] lg:whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          }}
        >
          Intelligence That Listens Before You Ask
        </h2>
        <p
          className="text-base sm:text-lg text-[#4A5565] leading-relaxed max-w-[640px]"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontWeight: 400,
          }}
        >
          Asthesis doesn&apos;t wait for emergencies. It understands patterns, context, and subtle change — then acts when it matters.
        </p>
      </div>
    </section>
  )
}
