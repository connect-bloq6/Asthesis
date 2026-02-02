'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const FAQ_TABS = [
  { id: 'general', label: 'General FAQs' },
  { id: 'safety', label: 'Safety & Privacy' },
  { id: 'installation', label: 'Installation & Support' },
] as const

/** Icons per user: 1=faq1, 2=faq3, 3=faq5, 4=faq2_bell, 5=faq4 */
const FAQ_ITEMS = [
  {
    id: 1,
    icon: '/images/faq1.png',
    question: 'Is Asthesis safe for elderly individuals?',
    answer:
      'Absolutely. Asthesis is designed specifically with elderly users in mind. Our technology is non-intrusive, requires no wearables, and operates silently in the background to monitor wellbeing without disrupting daily routines.',
  },
  {
    id: 2,
    icon: '/images/faq3.png',
    question: 'Do I need to wear any devices?',
    answer:
      "No wearables required. Asthesis works through ambient monitoring technology that respects privacy while providing comprehensive care insights. There's nothing to charge, wear, or remember.",
  },
  {
    id: 3,
    icon: '/images/faq5.png',
    question: 'What health metrics does Asthesis monitor?',
    answer:
      'Asthesis tracks daily activity patterns, sleep quality, movement frequency, and routine adherence. This helps identify changes in wellbeing early, allowing for proactive care rather than reactive responses.',
  },
  {
    id: 4,
    icon: '/images/faq2_bell.png',
    question: 'How does emergency detection work?',
    answer:
      "Our AI-powered system continuously monitors activity patterns and can detect falls, prolonged inactivity, or unusual behavior. When something concerning is detected, alerts are immediately sent to designated caregivers or family members.",
  },
  {
    id: 5,
    icon: '/images/faq4.png',
    question: 'Can multiple family members receive alerts?',
    answer:
      "Yes. You can add unlimited family members and caregivers to receive notifications. Each person can customize their alert preferences and access levels through our intuitive mobile app.",
  },
]

const ICON_SIZE = 40

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<string>('general')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const leftColumnItems = filteredItems.slice(0, 3)
  const rightColumnItems = filteredItems.slice(3, 5)

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />

      {/* FAQ content – no card; same page background as About, content directly on page */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 lg:px-16 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-24">
        {/* Heading – mobile / iPad / desktop */}
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#101828] mb-2 sm:mb-3"
          style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-[#4A5565] text-sm sm:text-base mb-5 sm:mb-6 md:mb-8" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
          Can&apos;t find what you&apos;re looking for? Check out our{' '}
          <Link href="/resources/docs" className="font-medium underline hover:opacity-80" style={{ color: '#4A5565' }}>
            full documentation
          </Link>
          .
        </p>

        {/* Tabs + Search – mobile: stacked full-width; iPad: row; desktop: same */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10">
          <div className="flex flex-wrap gap-2">
            {FAQ_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#374151] text-white'
                    : 'bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB]'
                }`}
                style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto md:min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none">
              <svg width="16" height="16" className="sm:w-[18px] sm:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border border-[#E5E7EB] text-[#374151] placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#374151]/20 focus:border-[#374151]"
              style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
            />
          </div>
        </div>

        {/* FAQ grid – each item has #F9FAFB 50% background */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-6 sm:gap-y-8">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8">
            {leftColumnItems.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4 rounded-lg p-4 sm:p-5" style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <Image src={item.icon} alt="" width={ICON_SIZE} height={ICON_SIZE} className="object-contain w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-[#101828] text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    {item.question}
                  </h2>
                  <p className="text-[#4A5565] text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Right column */}
          <div className="space-y-6 sm:space-y-8">
            {rightColumnItems.map((item) => (
              <div key={item.id} className="flex gap-3 sm:gap-4 rounded-lg p-4 sm:p-5" style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <Image src={item.icon} alt="" width={ICON_SIZE} height={ICON_SIZE} className="object-contain w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-[#101828] text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    {item.question}
                  </h2>
                  <p className="text-[#4A5565] text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
