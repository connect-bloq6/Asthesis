'use client'

import Link from 'next/link'

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

// Social Icons
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
      { label: 'Overview', href: '/product/overview' },
      { label: 'Technology', href: '/product/technology' },
      { label: 'Features', href: '/product/features' },
      { label: 'Design', href: '/product/design' },
      { label: 'Materials & Components', href: '/product/materials' },
    ],
  },
  system: {
    title: 'SYSTEM',
    links: [
      { label: 'Intelligence', href: '/system/intelligence' },
      { label: 'Awareness & Sensors', href: '/system/sensors' },
      { label: 'Communication', href: '/system/communication' },
      { label: 'Privacy & Ethics', href: '/system/privacy' },
      { label: 'Security Architecture', href: '/system/security' },
    ],
  },
  about: {
    title: 'ABOUT',
    links: [
      { label: 'About Asthesis', href: '/about' },
      { label: 'Philosophy', href: '/about/philosophy' },
      { label: 'Research & Development', href: '/about/research' },
      { label: 'Partners', href: '/about/partners' },
      { label: 'Careers', href: '/about/careers' },
    ],
  },
  resources: {
    title: 'RESOURCES',
    links: [
      { label: 'Documentation', href: '/resources/docs' },
      { label: 'FAQs', href: '/resources/faqs' },
      { label: 'Support', href: '/resources/support' },
      { label: 'Setup Guide', href: '/resources/setup' },
      { label: 'Contact Support', href: '/resources/contact' },
    ],
  },
  legal: {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Consent & Data Use', href: '/legal/consent' },
      { label: 'Terms & Conditions', href: '/legal/terms' },
      { label: 'Cookie Settings', href: '/legal/cookies' },
      { label: 'Regulatory Information', href: '/legal/regulatory' },
    ],
  },
}

export default function Footer() {
  return (
    <footer className="relative bg-background pt-12 md:pt-20">
      {/* Decorative Cross Icons */}
      <CrossIcon className="absolute top-8 left-8 md:left-16 opacity-60" />
      <CrossIcon className="absolute top-8 right-8 md:right-16 opacity-60" />

      <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Video Banner (Minimized) */}
        <div className="relative w-full aspect-[3/1] md:aspect-[4/1] rounded-2xl md:rounded-3xl overflow-hidden mb-16 md:mb-20">
          {/* Video Element - Same video as previous section */}
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/poster.jpg"
          >
            <source src="/videos/asthesis-showcase.mp4" type="video/mp4" />
          </video>

          {/* Fallback Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-amber-950/30 to-black -z-10" />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Cursive Asthesis Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white/90 font-light italic"
              style={{ 
                fontFamily: 'Georgia, "Times New Roman", serif',
                letterSpacing: '0.05em'
              }}
            >
              Asthesis
            </h2>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12 md:mb-16">
          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              {footerLinks.product.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* System */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              {footerLinks.system.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.system.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              {footerLinks.about.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              {footerLinks.resources.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              {footerLinks.legal.title}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              CONTACT
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Partnerships
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-xs text-foreground/40">Support Email</span>
                <a href="mailto:support@asthesis.com" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                  support@asthesis.com
                </a>
              </li>
              <li>
                <span className="text-xs text-foreground/40">Business Email</span>
                <a href="mailto:contact@asthesis.com" className="block text-sm text-foreground/60 hover:text-foreground transition-colors">
                  contact@asthesis.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-foreground/10">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
              <XIcon className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground transition-colors">
              <YouTubeIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Request a Demo Button */}
          <Link 
            href="/demo"
            className="px-6 py-2.5 border border-foreground/20 rounded-full text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            REQUEST A DEMO
          </Link>
        </div>

        {/* Bottom Copyright Section */}
        <div className="relative py-8 border-t border-foreground/10">
          {/* Cross icons at bottom */}
          <CrossIcon className="absolute bottom-4 left-0 opacity-60" />
          <CrossIcon className="absolute bottom-4 right-0 opacity-60" />

          <div className="text-center space-y-2">
            <p className="text-sm text-foreground/60">
              © 2026 Asthesis
            </p>
            <p className="text-sm text-foreground/50">
              Designed for dignity. Built for trust.
            </p>
            <p className="text-xs text-foreground/40 max-w-2xl mx-auto mt-4">
              Asthesis is a healthcare support system designed to assist independent living. It is not a replacement for medical professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

