'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const APP_LOGIN_URL = 'https://app.asthesis.com'

const navItems = [
  { label: 'Homepage', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Product', href: '/product' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
]

type NavbarProps = {
  /** Use white background (e.g. Careers, FAQ, About) instead of transparent */
  solid?: boolean
}

export default function Navbar({ solid = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMenu()
  }

  const shellClass = solid
    ? 'border-neutral-200/90 bg-white'
    : 'border-white/50 bg-white/90 backdrop-blur-md'

  return (
    <>
      {/* Full-width inset wrapper + floating card bar */}
      <nav
        className="fixed top-3 left-0 right-0 z-50 px-4 sm:top-4 sm:px-6 md:top-5 md:px-8 lg:px-10 xl:px-12"
        aria-label="Primary"
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center rounded-2xl border px-5 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.18)] transition-[background-color,box-shadow,border-color] duration-300 ease-out sm:px-8 sm:py-3 md:rounded-3xl md:px-10 md:py-3.5 lg:px-12 lg:py-4 ${shellClass}`}
        >
          <div className="flex w-full min-h-[44px] items-center justify-between md:grid md:min-h-[48px] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-3">
            {/* Branding — far left, icon + name tight */}
            <button
              type="button"
              className="flex shrink-0 items-center justify-start gap-1.5 text-left text-lg font-semibold tracking-tight text-foreground md:text-xl cursor-pointer border-0 bg-transparent p-0"
              onClick={scrollToTop}
              aria-label="Asthesis, scroll to top"
            >
              <span className="inline-flex shrink-0 origin-left scale-[1.3]">
                <Image
                  src="/images/log-modified.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-7 w-7 object-contain md:h-8 md:w-8"
                />
              </span>
              <span>Asthesis</span>
            </button>

            {/* Main nav — centered column, even spacing, medium-emphasis text */}
            <ul className="hidden min-w-0 md:flex md:items-center md:justify-center md:gap-6 lg:gap-8 xl:gap-10">
              {navItems.map((item) => (
                <li key={item.label} className="shrink-0">
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-sm font-medium text-neutral-600 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
              {/* Mobile menu toggle */}
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-foreground transition-colors hover:bg-neutral-200/90 md:hidden"
                aria-label="Menu"
                aria-expanded={isMenuOpen}
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
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  ) : (
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  )}
                </svg>
              </button>

              {/* Login — desktop */}
              <Link
                href={APP_LOGIN_URL}
                className="hidden items-center gap-2.5 rounded-full bg-[#F5E6D3] px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#EBD9C3] md:inline-flex lg:gap-3 lg:px-5 lg:py-3"
              >
                <span>Login</span>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path
                    d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15"
                    stroke="#1D1D1F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 17L15 12L10 7"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12H3"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
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
          <div className="flex flex-col pt-24 px-6 h-full">
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
            
            {/* Login Button */}
            <Link
              href={APP_LOGIN_URL}
              className="mt-6 mx-4 px-5 py-3 rounded-full bg-[#F5E6D3] flex items-center justify-center gap-3 hover:bg-[#EBD9C3] transition-colors"
              onClick={closeMenu}
            >
              <span className="text-sm font-medium text-foreground">Login</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" 
                  stroke="#1D1D1F" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M10 17L15 12L10 7" 
                  stroke="#9CA3AF" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M15 12H3" 
                  stroke="#9CA3AF" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

