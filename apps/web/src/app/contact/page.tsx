'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  BODY_MUTED,
  BUTTON_BG,
  CARD_BG,
  HEADING_TEXT,
  INPUT_BG,
  INPUT_BORDER,
  LABEL_TEXT,
  PRIVACY_MUTED,
} from '@asthesis/shared'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { COUNTRY_DIAL_CODES } from '@/data/countryDialCodes'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

const discussOptions = [
  'Commissioner briefing',
  'Request a demo',
  'Pilot or partnership discussion',
  'Service design conversation',
  'Support',
  'Other',
]

export default function ContactPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [countryIso, setCountryIso] = useState('GB')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [discuss, setDiscuss] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setSubmitting(true)
    try {
      const dial = COUNTRY_DIAL_CODES.find((c) => c.iso === countryIso)?.dial ?? ''
      const phone = phoneNumber.trim() ? (dial ? `+${dial} ${phoneNumber.trim()}` : phoneNumber.trim()) : ''
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          organisation: organisation.trim(),
          country_iso: countryIso,
          phone,
          discuss_topic: discuss,
          message: message.trim(),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSuccess(true)
      setFullName('')
      setEmail('')
      setOrganisation('')
      setCountryIso('GB')
      setPhoneNumber('')
      setDiscuss('')
      setMessage('')
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar solid />

      {/* Single section: map left, form right (Figma) – mobile/iPad: stacked; desktop: side by side */}
      <section className="w-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-8 lg:pl-10 lg:pr-0 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,600px)] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
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
              className="w-full max-w-[560px] lg:max-w-none rounded-2xl p-5 sm:p-6 md:p-7 lg:p-8 shadow-lg border border-[#E5E7EB]"
              style={{ backgroundColor: CARD_BG }}
            >
              <h1
                className="text-xl sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem] font-semibold leading-snug mb-2 sm:mb-3"
                style={{ ...inter, color: HEADING_TEXT }}
              >
                Talk To Us About Technology Enabled Care
              </h1>
              <p
                className="text-sm sm:text-[0.9375rem] leading-relaxed mb-4 sm:mb-5 md:mb-6"
                style={{ ...inter, color: BODY_MUTED }}
              >
                Whether you are exploring preventative care models, remote wellbeing monitoring, or independent living support, our team can discuss how Asthesis may fit within your service objectives.
              </p>

              {error ? (
                <p
                  className="text-sm rounded-lg px-4 py-3 mb-4 border border-red-200 bg-red-50 text-red-800"
                  style={inter}
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
              {success ? (
                <p
                  className="text-sm rounded-lg px-4 py-3 mb-4 border border-emerald-200 bg-emerald-50 text-emerald-900"
                  style={inter}
                  role="status"
                >
                  Thank you. Your message has been sent. We will be in touch soon.
                </p>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your name"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter }}
                  />
                </div>

                {/* Work email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@organisation.org"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter }}
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    Organisation
                  </label>
                  <input
                    id="organisation"
                    type="text"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                    placeholder="e.g. local authority, NHS trust, care provider"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter }}
                  />
                </div>

                {/* Phone: country code + number */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    Phone number
                  </label>
                  <div className="flex gap-2 sm:gap-3">
                    <select
                      aria-label="Country calling code"
                      value={countryIso}
                      onChange={(e) => setCountryIso(e.target.value)}
                      disabled={submitting}
                      className="shrink-0 min-w-[10.5rem] max-w-[min(46%,13.5rem)] sm:min-w-[11.5rem] sm:max-w-[14rem] pl-3 pr-8 py-3 rounded-lg border text-[#101828] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] appearance-none bg-no-repeat bg-right disabled:opacity-60"
                      style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center' }}
                    >
                      {COUNTRY_DIAL_CODES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.name} (+{c.dial})
                        </option>
                      ))}
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Phone Number"
                      disabled={submitting}
                      className="flex-1 min-w-0 px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
                      style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter }}
                    />
                  </div>
                </div>

                {/* What would you like to discuss? */}
                <div>
                  <label htmlFor="discuss" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    What would you like to discuss?
                  </label>
                  <select
                    id="discuss"
                    value={discuss}
                    onChange={(e) => setDiscuss(e.target.value)}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] text-sm focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] appearance-none bg-no-repeat bg-right disabled:opacity-60"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236B7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center' }}
                  >
                    <option value="">Select an option</option>
                    {discussOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ ...inter, color: LABEL_TEXT }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us a bit about your situation and how we can help..."
                    rows={4}
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-lg border text-[#101828] placeholder-[#9CA3AF] text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#101828]/20 focus:border-[#101828] disabled:opacity-60"
                    style={{ backgroundColor: INPUT_BG, borderColor: INPUT_BORDER, ...inter }}
                  />
                </div>

                {/* Send Message button – centered in form only */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-block px-6 py-2.5 rounded-full text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                    style={{ backgroundColor: BUTTON_BG, ...inter }}
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </div>

                {/* Privacy */}
                <p className="text-xs leading-relaxed pt-1" style={{ ...inter, color: PRIVACY_MUTED }}>
                  Your information is kept private and secure. We never share your details with third parties.{' '}
                  <Link href="/legal/privacy" className="underline hover:opacity-80" style={{ color: LABEL_TEXT }}>
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
