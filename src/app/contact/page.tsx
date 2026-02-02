'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const CARD_BG = '#FFFFFF'
const INPUT_BORDER = '#E5E7EB'
const INPUT_BG = '#FAFAFA'
const BUTTON_BG = '#101828'

const countryCodes = [
  { value: '+91', label: 'IN +91' },
  { value: '+1', label: 'US +1' },
  { value: '+44', label: 'UK +44' },
  { value: '+49', label: 'DE +49' },
  { value: '+33', label: 'FR +33' },
  { value: '+61', label: 'AU +61' },
]

const discussOptions = [
  'General enquiry',
  'Request a demo',
  'Support',
  'Partnerships',
  'Other',
]

export default function ContactPage() {
  const [fullName, setFullName] = useState('Jude Bellingham')
  const [email, setEmail] = useState('email@domain.com')
  const [organisation, setOrganisation] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [discuss, setDiscuss] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      {/* Single section: map left, form right (Figma) – mobile/iPad: stacked; desktop: side by side */}
      <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-8 lg:pl-10 lg:pr-0 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 sm:gap-8 lg:gap-8 items-center">
          {/* Left: Map – map.png (first on mobile, left on desktop) */}
          <div className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-0 aspect-[4/3] lg:aspect-[4/3] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto lg:mx-0 order-1">
            <Image
              src="/images/map.png"
              alt="World map"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
              priority
              unoptimized
            />
          </div>

          {/* Right: Contact form card (second on mobile, right on desktop) */}
          <div className="flex justify-center lg:justify-end order-2">
            <div
              className="w-full max-w-[440px] rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg border border-[#E5E7EB]"
              style={{ backgroundColor: CARD_BG }}
            >
              <h1
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#101828] mb-1.5 sm:mb-2"
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
              >
                Get in touch
              </h1>
              <p
                className="text-[#4A5565] text-sm sm:text-base mb-3 sm:mb-4 md:mb-6"
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
              >
                Complete the form below and we&apos;ll be in touch shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    Full name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828]"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Email address */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828]"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Organisation (optional) */}
                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    Organisation <span className="font-normal text-[#6B7280]">(optional)</span>
                  </label>
                  <input
                    id="organisation"
                    type="text"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="Care organisation or family name."
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828]"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Phone: country code + number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    Phone
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="shrink-0 w-[100px] px-3 py-3 rounded-lg border text-[#101828] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] appearance-none bg-no-repeat bg-right"
                      style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center' }}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                      className="flex-1 min-w-0 px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828]"
                      style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                    />
                  </div>
                </div>

                {/* What would you like to discuss? */}
                <div>
                  <label htmlFor="discuss" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    What would you like to discuss?
                  </label>
                  <select
                    id="discuss"
                    value={discuss}
                    onChange={(e) => setDiscuss(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] appearance-none bg-no-repeat bg-right"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select an option</option>
                    {discussOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#374151] mb-1.5" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us a bit about your situation and how we can help..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828]"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                  />
                </div>

                {/* Send Message button – centered in form only */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-block px-6 py-2.5 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: BUTTON_BG, fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
                  >
                    Send Message
                  </button>
                </div>

                {/* Privacy */}
                <p className="text-[#6B7280] text-xs leading-relaxed pt-1" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                  Your information is kept private and secure. We never share your details with third parties.{' '}
                  <Link href="/legal/privacy" className="text-[#374151] underline hover:opacity-80">
                    Read our privacy policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
