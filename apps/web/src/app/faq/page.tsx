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

type FaqTabId = (typeof FAQ_TABS)[number]['id']

type FaqItem = {
  id: number
  icon: string
  question: string
  answer: string
}

/** Icons: faq1, faq3, faq5, faq2_bell, faq4, reused per tab */
const FAQ_BY_TAB: Record<FaqTabId, FaqItem[]> = {
  general: [
    {
      id: 1,
      icon: '/images/faq1.png',
      question: 'Is Asthesis suitable for people who need support at home?',
      answer:
        'Yes. Asthesis is designed for non intrusive ambient monitoring in the home: privacy preserving remote monitoring without cameras or wearables, aligned with AI enabled technology enabled care (TEC). It operates quietly in the background to support preventative and anticipatory care without disrupting daily routines.',
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
        "Our AI powered system continuously monitors activity patterns and can detect falls, prolonged inactivity, or unusual behaviour. When something concerning is detected, alerts are immediately sent to designated carers, care teams, or other nominated contacts, supporting early intervention and escalation based on emerging risk.",
    },
    {
      id: 5,
      icon: '/images/faq4.png',
      question: 'Can multiple contacts receive alerts?',
      answer:
        "Yes. You can add unlimited nominated contacts, including individuals, carers, providers, local authorities and NHS commissioners where appropriate, to receive notifications. Each person can customize their alert preferences and access levels through our intuitive mobile app.",
    },
  ],
  safety: [
    {
      id: 1,
      icon: '/images/faq1.png',
      question: 'How is my data protected?',
      answer:
        'Data is handled using industry standard security practices, including encryption in transit and at rest where applicable. Access is strictly controlled, and we design our systems to meet applicable healthcare and data protection expectations.',
    },
    {
      id: 2,
      icon: '/images/faq3.png',
      question: 'Does Asthesis use cameras or record audio in the home?',
      answer:
        'Asthesis is built around ambient sensing: not cameras in living spaces and not continuous audio recording for surveillance. The focus is on patterns that support care while respecting dignity and privacy.',
    },
    {
      id: 3,
      icon: '/images/faq5.png',
      question: 'Who can see my health or activity information?',
      answer:
        'You and those you nominate can receive alerts and insights according to the permissions you set. Carers and professionals only see what their role and your choices allow, in line with consent and governance.',
    },
    {
      id: 4,
      icon: '/images/faq2_bell.png',
      question: 'How are emergency alerts delivered securely?',
      answer:
        'Alerts are sent through secure channels to your chosen contacts. We aim to make notifications timely and actionable while minimising unnecessary exposure of sensitive detail.',
    },
    {
      id: 5,
      icon: '/images/faq4.png',
      question: 'What privacy principles does Asthesis follow?',
      answer:
        'We apply privacy by design: collecting what is needed for safe, useful care insights, being transparent about use of data, and supporting your control over who is involved in your care circle.',
    },
  ],
  installation: [
    {
      id: 1,
      icon: '/images/faq1.png',
      question: 'What is needed to install Asthesis in a home?',
      answer:
        'Requirements depend on your package and property. Typically you need power, a suitable location for sensors or hub equipment as advised by our team, and a reliable network connection where the solution requires it.',
    },
    {
      id: 2,
      icon: '/images/faq3.png',
      question: 'How long does installation take?',
      answer:
        'Many setups are completed within a single visit, though larger or more complex homes may take longer. Our team will give you a realistic timeframe when you book.',
    },
    {
      id: 3,
      icon: '/images/faq5.png',
      question: 'Who performs the installation?',
      answer:
        'Installation may be carried out by trained installers or partners, or guided self setup where appropriate. You will be told exactly what to expect before the visit or delivery.',
    },
    {
      id: 4,
      icon: '/images/faq2_bell.png',
      question: 'Where can I get technical support?',
      answer:
        'Support is available through the channels we provide with your subscription or contract, such as email, phone, or in-app help, so you can report issues, ask questions, or request changes to your setup.',
    },
    {
      id: 5,
      icon: '/images/faq4.png',
      question: 'What if something stops working after installation?',
      answer:
        'Contact support with a short description of the problem. We will help you troubleshoot remotely where possible and arrange a visit or replacement if hardware service is required under your agreement.',
    },
  ],
}

const ICON_SIZE = 40

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<FaqTabId>('general')
  const [searchQuery, setSearchQuery] = useState('')

  const tabItems = FAQ_BY_TAB[activeTab]
  const filteredItems = tabItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const leftColumnItems = filteredItems.slice(0, 3)
  const rightColumnItems = filteredItems.slice(3, 5)

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar solid />

      {/* FAQ content – mobile / iPad / desktop */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-14 md:pb-20 lg:pb-24">
        {/* Heading */}
        <h1
          className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-[#101828] mb-2 sm:mb-3"
          style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-[#4A5565] text-sm sm:text-base mb-4 sm:mb-5 md:mb-8" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
          Can&apos;t find what you&apos;re looking for? Check out our{' '}
          <Link href="/resources/docs" className="font-medium underline hover:opacity-80" style={{ color: '#4A5565' }}>
            full documentation
          </Link>
          .
        </p>

        {/* Tabs – mobile: horizontal scroll (no wrap); iPad+: row with search; never wrap tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8 lg:mb-10">
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:flex-1 md:min-w-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {FAQ_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSearchQuery('')
                }}
                className={`shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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
          <div className="relative w-full md:w-auto md:min-w-[200px] shrink-0">
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

        {/* FAQ grid – 1 col mobile; 2 cols iPad+; each item #F9FAFB 50% */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-4 sm:gap-y-6 md:gap-y-6 lg:gap-y-8">
          {/* Left column */}
          <div className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
            {leftColumnItems.map((item) => (
              <div key={`${activeTab}-${item.id}`} className="flex gap-3 sm:gap-4 rounded-xl p-4 sm:p-5 md:p-5" style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <Image src={item.icon} alt="" width={ICON_SIZE} height={ICON_SIZE} className="object-contain w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-[#101828] text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 leading-snug" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
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
          <div className="space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
            {rightColumnItems.map((item) => (
              <div key={`${activeTab}-${item.id}`} className="flex gap-3 sm:gap-4 rounded-xl p-4 sm:p-5 md:p-5" style={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}>
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center">
                  <Image src={item.icon} alt="" width={ICON_SIZE} height={ICON_SIZE} className="object-contain w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-[#101828] text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2 leading-snug" style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
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
