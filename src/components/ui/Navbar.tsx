'use client'

import Link from 'next/link'

const navItems = [
  { label: 'Homepage', href: '/' },
  { label: 'Technology', href: '/technology' },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-12 lg:px-16">
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-semibold text-foreground">
          Asthesis
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Plus Button */}
        <button 
          className="w-12 h-12 rounded-full bg-accent-cream flex items-center justify-center hover:bg-accent-gold/20 transition-colors"
          aria-label="Menu"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M8 1V15M1 8H15" 
              stroke="#1D1D1F" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

