'use client'

// Decorative X icon component
function CrossIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="14" 
      height="14" 
      viewBox="0 0 14 14" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M1 1L13 13M13 1L1 13" 
        stroke="#1D1D1F" 
        strokeWidth="1" 
        strokeLinecap="round"
      />
    </svg>
  )
}

const features = [
  'Wellness & behavior insights',
  'Safety & risk monitoring',
  'Mobility & environmental awareness',
  'Intelligent response & alerts',
]

export default function SystemSection() {
  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden bg-background">
      {/* Decorative Cross Icons */}
      <CrossIcon className="absolute top-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-32 right-8 md:right-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute bottom-24 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Label */}
            <span className="text-sm md:text-base font-medium text-foreground/40 uppercase tracking-wider">
              System
            </span>

            {/* Heading */}
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase leading-tight">
              A Complete Welfare Intelligence System
            </h2>

            {/* Description */}
            <p className="mt-6 text-sm md:text-base text-foreground/60 leading-relaxed">
              Asthesis goes beyond emergency response.
              <br />
              It continuously learns, adapts, and responds to subtle changes in daily life —
              <br />
              helping protect people before situations escalate.
            </p>

            {/* Feature List */}
            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-3 text-sm md:text-base text-foreground/70"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Product Image Area with Diamond */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Diamond Shape */}
            <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <path 
                  d="M50 5 L95 50 L50 95 L5 50 Z" 
                  fill="none" 
                  stroke="#D1D1D3" 
                  strokeWidth="0.3"
                />
              </svg>
              
              {/* Cross icons on diamond corners */}
              <CrossIcon className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <CrossIcon className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-40" />
              <CrossIcon className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <CrossIcon className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 opacity-40" />
            </div>

            {/* Product Placeholder - Will be replaced with 3D model later */}
            <div className="relative z-10 w-[250px] h-[300px] sm:w-[300px] sm:h-[380px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px] flex items-center justify-center">
              {/* Placeholder box representing the product */}
              <div className="w-full h-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 rounded-3xl flex items-center justify-center border border-accent-gold/10">
                <span className="text-foreground/30 text-sm">3D Product</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

