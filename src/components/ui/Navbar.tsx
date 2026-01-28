'use client'

import { useState } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Homepage', href: '/' },
  { label: 'Technology', href: '/technology' },
  { label: 'About Us', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 md:px-12 lg:px-16 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-semibold text-foreground" onClick={closeMenu}>
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

          {/* Hamburger/Plus Button */}
          <button 
            className="w-12 h-12 rounded-lg bg-[#E5E5E5] flex items-center justify-center hover:bg-[#D1D1D1] transition-colors md:hidden"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}
            >
              {isMenuOpen ? (
                // X icon when menu is open
                <>
                  <path 
                    d="M4 4L12 12M12 4L4 12" 
                    stroke="#1D1D1F" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </>
              ) : (
                // Plus icon when menu is closed
                <>
                  <path 
                    d="M8 1V15M1 8H15" 
                    stroke="#1D1D1F" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>

          {/* Plus Button for Desktop - Hidden on mobile */}
          <button 
            className="w-12 h-12 rounded-lg bg-[#E5E5E5] flex items-center justify-center hover:bg-[#D1D1D1] transition-colors hidden md:flex"
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-[280px] bg-background shadow-xl transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col pt-24 px-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-4 px-4 text-base font-medium text-foreground hover:bg-[#E5E5E5] rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

