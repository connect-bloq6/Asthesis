'use client'

import Link from 'next/link'

/** Footer: white background, dark gray text, centered copyright, dark bar at bottom */
const FOOTER_BG = '#FFFFFF'
const FOOTER_TEXT = '#374151'

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-12 md:pt-16 pb-8" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-24 max-w-[1600px]">
        <div className="mb-12 md:mb-14 w-full">
          <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
            CONTACT
          </h3>
          <ul className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6 sm:gap-x-6 lg:gap-x-8 items-stretch list-none p-0 m-0">
            <li className="flex min-h-full flex-col">
              <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                Contact Us
              </Link>
            </li>
            <li className="flex min-h-full flex-col">
              <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                Request a Demo
              </Link>
            </li>
            <li className="flex min-h-full flex-col">
              <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                Partnerships
              </Link>
            </li>
            <li className="flex min-h-full flex-col justify-start">
              <span className="text-xs text-[#1D1D1F]/60">Support Email</span>
              <a href="mailto:support@asthesis.com" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors break-all">
                support@asthesis.com
              </a>
            </li>
            <li className="flex min-h-full flex-col justify-start">
              <span className="text-xs text-[#1D1D1F]/60">Business Email</span>
              <a href="mailto:contact@asthesis.com" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors break-all">
                contact@asthesis.com
              </a>
            </li>
          </ul>
          <Link
            href="/contact#demo"
            className="mt-6 inline-flex items-center justify-center rounded-full font-medium text-[11px] uppercase tracking-wide hover:opacity-90 transition-opacity min-w-[120px] h-[44px] px-5 lg:mt-8"
            style={{ borderWidth: 1.07, borderColor: FOOTER_TEXT, color: FOOTER_TEXT, backgroundColor: FOOTER_BG }}
          >
            REQUEST A DEMO
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#1D1D1F]/10 text-center space-y-1">
          <p className="text-sm text-[#1D1D1F]/80">© 2026 Asthesis</p>
          <p className="text-sm text-[#1D1D1F]/70">Sensing What Matters.</p>
        </div>
      </div>
    </footer>
  )
}
