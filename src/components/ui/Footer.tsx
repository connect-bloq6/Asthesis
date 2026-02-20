'use client'

import Link from 'next/link'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.4-8M20 4l-6.4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const footerLinks = {
  product: {
    title: 'PRODUCT',
    links: [
      { label: 'Overview', href: '#' },
      { label: 'Technology', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Design', href: '#' },
      { label: 'Materials & Components', href: '#' },
    ],
  },
  system: {
    title: 'SYSTEM',
    links: [
      { label: 'Intelligence', href: '#' },
      { label: 'Awareness & Sensors', href: '#' },
      { label: 'Communication', href: '#' },
      { label: 'Privacy & Ethics', href: '#' },
      { label: 'Security Architecture', href: '#' },
    ],
  },
  about: {
    title: 'ABOUT',
    links: [
      { label: 'About Asthesis', href: '#' },
      { label: 'Philosophy', href: '#' },
      { label: 'Research & Development', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  resources: {
    title: 'RESOURCES',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Setup Guide', href: '#' },
      { label: 'Contact Support', href: '#' },
    ],
  },
  legal: {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Consent & Data Use', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Cookie Settings', href: '#' },
      { label: 'Regulatory Information', href: '#' },
    ],
  },
}

const SOCIAL_ICON_SIZE = 24

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '/images/linkdin.png' },
  { label: 'Twitter', href: 'https://x.com', icon: '/images/twitter.png' },
  { label: 'YouTube', href: 'https://youtube.com', icon: '/images/youtube.png' },
]

/** Footer: white background, dark gray text, centered copyright, dark bar at bottom */
const FOOTER_BG = '#FFFFFF'
const FOOTER_TEXT = '#374151'
const FOOTER_TEXT_MUTED = '#4B5563'
const FOOTER_DIVIDER = '#E5E7EB'
const FOOTER_BAR = '#101828'

const columnTitleClass = 'text-[10px] font-medium uppercase tracking-wider mb-3'
const linkClass = 'text-[11px] font-normal transition-colors hover:opacity-80'
const listSpacing = 'space-y-2'

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-12 md:pt-16 pb-8" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
      <div className="mx-auto px-4 sm:px-8 md:px-12 lg:px-24 max-w-[1600px]">
        {/* Six columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12 md:mb-14">
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              {footerLinks.product.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.product.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              {footerLinks.system.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.system.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              {footerLinks.about.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.about.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              {footerLinks.resources.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              {footerLinks.legal.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider mb-4">
              CONTACT
            </h3>
            <ul className={listSpacing}>
              <li>
                <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                  Partnerships
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-xs text-[#1D1D1F]/60 block">Support Email</span>
                <a href="mailto:support@asthesis.com" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                  support@asthesis.com
                </a>
              </li>
              <li>
                <span className="text-xs text-[#1D1D1F]/60 block">Business Email</span>
                <a href="mailto:contact@asthesis.com" className="text-sm text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors">
                  contact@asthesis.com
                </a>
              </li>
            </ul>
            <Link
              href="/contact#demo"
              className="inline-flex items-center justify-center mt-3 rounded-full font-medium text-[11px] uppercase tracking-wide hover:opacity-90 transition-opacity min-w-[120px] h-[44px] px-5"
              style={{ borderWidth: 1.07, borderColor: FOOTER_TEXT, color: FOOTER_TEXT, backgroundColor: FOOTER_BG }}
            >
              REQUEST A DEMO
            </Link>
          </div>
        </div>

        {/* Social + CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-[#1D1D1F]/10">
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors" aria-label="X">
              <XIcon className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors" aria-label="YouTube">
              <YouTubeIcon className="w-5 h-5" />
            </a>
          </div>
          <Link
            href="#"
            className="px-6 py-2.5 bg-white border border-[#1D1D1F] rounded-full text-sm font-medium text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white transition-colors uppercase tracking-wide"
          >
            Request a Demo
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#1D1D1F]/10 text-center space-y-1">
          <p className="text-sm text-[#1D1D1F]/80">© 2026 Asthesis</p>
          <p className="text-sm text-[#1D1D1F]/70">Designed for dignity. Built for trust.</p>
        </div>
      </div>
      {/* Dark gray bar at very bottom */}
      <div className="w-full h-3 md:h-4" style={{ backgroundColor: FOOTER_BAR }} aria-hidden />
    </footer>
  )
}
