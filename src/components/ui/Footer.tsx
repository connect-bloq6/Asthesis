'use client'

import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  product: {
    title: 'PRODUCT',
    links: [
      { label: 'Overview', href: '/product/overview' },
      { label: 'Technology', href: '/technology' },
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
      { label: 'FAQs', href: '/faq' },
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
    <footer className="relative border-t border-[#E5E7EB] pt-8 sm:pt-10 md:pt-12 pb-0" style={{ backgroundColor: FOOTER_BG }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
        {/* Link columns – 2 col mobile, 3 col tablet, 6 col desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              {footerLinks.product.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.product.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              {footerLinks.system.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.system.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              {footerLinks.about.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.about.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              {footerLinks.resources.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              {footerLinks.legal.title}
            </h3>
            <ul className={listSpacing}>
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column with REQUEST A DEMO button */}
          <div>
            <h3 className={columnTitleClass} style={{ color: FOOTER_TEXT }}>
              CONTACT
            </h3>
            <ul className={listSpacing}>
              <li>
                <Link href="/contact" className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/contact#demo" className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link href="/contact#partnerships" className={linkClass} style={{ color: FOOTER_TEXT_MUTED }}>
                  Partnerships
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-[10px] font-normal opacity-80" style={{ color: FOOTER_TEXT_MUTED }}>Support Email</span>
                <a href="mailto:support@asthesis.com" className={`block ${linkClass}`} style={{ color: FOOTER_TEXT_MUTED }}>
                  support@asthesis.com
                </a>
              </li>
              <li>
                <span className="text-[10px] font-normal opacity-80" style={{ color: FOOTER_TEXT_MUTED }}>Business Email</span>
                <a href="mailto:contact@asthesis.com" className={`block ${linkClass}`} style={{ color: FOOTER_TEXT_MUTED }}>
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

        {/* Social icons – centered, small */}
        <div className="flex items-center justify-center gap-5 py-6 border-t" style={{ borderColor: FOOTER_DIVIDER }}>
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label={item.label}
            >
              <Image
                src={item.icon}
                alt=""
                width={SOCIAL_ICON_SIZE}
                height={SOCIAL_ICON_SIZE}
                className="object-contain w-5 h-5"
              />
            </a>
          ))}
        </div>

        {/* Bottom – small, light, centered (clean look) */}
        <div className="pt-6 pb-8 text-center space-y-1 border-t" style={{ borderColor: FOOTER_DIVIDER, borderTopWidth: '0.87px' }}>
          <p className="text-[11px] font-normal" style={{ color: FOOTER_TEXT }}>© 2026 Asthesis</p>
          <p className="text-[11px] font-normal" style={{ color: FOOTER_TEXT_MUTED }}>Designed for dignity. Built for trust.</p>
          <p className="text-[10px] font-normal max-w-2xl mx-auto mt-3 opacity-90 leading-snug" style={{ color: FOOTER_TEXT_MUTED }}>
            Asthesis is a healthcare support system designed to assist independent living. It is not a replacement for medical professionals.
          </p>
        </div>
      </div>
      {/* Dark gray bar at very bottom */}
      <div className="w-full h-3 md:h-4" style={{ backgroundColor: FOOTER_BAR }} aria-hidden />
    </footer>
  )
}
