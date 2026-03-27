'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const KNOW_MORE_FEATURE_IMAGES = {
  patterns: '/images/pop-up-3.png',
  connectedCare: '/images/pop-up-1.png',
  privacy: '/images/pop-up-2.png',
} as const

const knowMoreImageSizes =
  '(max-width: 1024px) min(96vw, 900px), (max-width: 1440px) 42vw, 640px'

export function useKnowMoreModal() {
  const [isKnowMoreOpen, setIsKnowMoreOpen] = useState(false)
  const [knowMoreEntered, setKnowMoreEntered] = useState(false)
  const [knowMorePortalReady, setKnowMorePortalReady] = useState(false)
  const knowMoreCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const knowMoreCloseBtnRef = useRef<HTMLButtonElement>(null)
  const knowMoreModalRef = useRef<HTMLDivElement>(null)
  const knowMorePrevFocusRef = useRef<HTMLElement | null>(null)
  const knowMoreIsOpenRef = useRef(false)

  useEffect(() => {
    setKnowMorePortalReady(true)
  }, [])

  const closeKnowMore = useCallback(() => {
    setKnowMoreEntered(false)
    if (knowMoreCloseTimeoutRef.current) clearTimeout(knowMoreCloseTimeoutRef.current)
    knowMoreCloseTimeoutRef.current = setTimeout(() => {
      setIsKnowMoreOpen(false)
      knowMoreCloseTimeoutRef.current = null
      const el = knowMorePrevFocusRef.current
      knowMorePrevFocusRef.current = null
      if (el && typeof el.focus === 'function') {
        try {
          el.focus()
        } catch {
          /* ignore */
        }
      }
    }, 300)
  }, [])

  useEffect(() => {
    knowMoreIsOpenRef.current = isKnowMoreOpen
  }, [isKnowMoreOpen])

  const openKnowMore = useCallback(() => {
    if (knowMoreCloseTimeoutRef.current) {
      clearTimeout(knowMoreCloseTimeoutRef.current)
      knowMoreCloseTimeoutRef.current = null
    }
    const alreadyOpen = knowMoreIsOpenRef.current
    if (!alreadyOpen && typeof document !== 'undefined') {
      knowMorePrevFocusRef.current = document.activeElement as HTMLElement
    }
    setIsKnowMoreOpen(true)
    if (alreadyOpen) {
      requestAnimationFrame(() => requestAnimationFrame(() => setKnowMoreEntered(true)))
    }
  }, [])

  useEffect(() => {
    if (!isKnowMoreOpen) {
      setKnowMoreEntered(false)
      return
    }
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setKnowMoreEntered(true)
      })
    )
    return () => cancelAnimationFrame(id)
  }, [isKnowMoreOpen])

  useEffect(() => {
    if (!isKnowMoreOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isKnowMoreOpen])

  useEffect(() => {
    if (!isKnowMoreOpen || !knowMoreEntered) return
    knowMoreCloseBtnRef.current?.focus()
  }, [isKnowMoreOpen, knowMoreEntered])

  useEffect(() => {
    if (!isKnowMoreOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeKnowMore()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isKnowMoreOpen, closeKnowMore])

  const onKnowMoreDialogKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const root = knowMoreModalRef.current
    if (!root) return
    const sel =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const list = Array.from(root.querySelectorAll<HTMLElement>(sel)).filter(
      (n) => n.offsetParent !== null || n === knowMoreCloseBtnRef.current
    )
    if (list.length === 0) return
    const first = list[0]
    const last = list[list.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const portal =
    knowMorePortalReady && typeof document !== 'undefined' && isKnowMoreOpen
      ? createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
        aria-hidden={false}
      >
        <div
          className={`absolute inset-0 cursor-pointer transition-opacity duration-300 ease-out ${
            knowMoreEntered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          aria-hidden
          onClick={closeKnowMore}
        />
        <div
          ref={knowMoreModalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="know-more-dialog-title"
          aria-describedby="know-more-dialog-desc"
          onKeyDown={onKnowMoreDialogKeyDown}
          className={`relative z-10 flex w-full max-w-[min(96vw,1440px)] max-h-[88vh] flex-col overflow-hidden rounded-2xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out md:rounded-3xl ${
            knowMoreEntered ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0'
          }`}
          style={{
            backgroundColor: '#F7EFE4',
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex shrink-0 justify-end border-b border-[#1D1D1F]/[0.06] bg-[#F7EFE4]/95 px-3 py-2 backdrop-blur-md supports-[backdrop-filter]:bg-[#F7EFE4]/88">
            <button
              ref={knowMoreCloseBtnRef}
              type="button"
              onClick={closeKnowMore}
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1F] transition-colors hover:bg-[#1D1D1F]/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D1D1F]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7EFE4]"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-2 md:px-8 md:pb-10 md:pt-3 lg:px-10 lg:pb-12">
            <p
              className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6F6F6F] md:text-left"
              id="know-more-eyebrow"
            >
              Inside Asthesis
            </p>
            <h2
              id="know-more-dialog-title"
              className="mb-5 text-center text-[1.35rem] font-extrabold leading-tight tracking-tight text-[#1D1D1F] md:text-left md:text-[1.65rem] lg:text-[1.85rem]"
            >
              AI-Powered Care, Designed for Everyday Living
            </h2>
            <p
              id="know-more-dialog-desc"
              className="mx-auto mb-8 max-w-2xl text-center text-[0.95rem] leading-relaxed text-[#3D3D3D] md:mx-0 md:text-left md:text-[1.02rem]"
            >
              Asthesis brings together ambient intelligence, thoughtful design, and responsive AI to create a new
              standard of care at home. By understanding daily rhythms, sensing subtle changes, and enabling timely
              support, Asthesis helps deliver AI-enabled technology enabled care (TEC)—supporting independent living and home-based support with calmer, better-connected care.
            </p>
            <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-[#1D1D1F]/12 to-transparent" aria-hidden />

            <div className="space-y-8 md:space-y-12">
              <article className="overflow-hidden rounded-xl border border-[#1D1D1F]/[0.07] bg-white/50 shadow-md md:rounded-2xl">
                <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
                  <div className="relative aspect-[16/10] min-h-[200px] w-full bg-[#E8DFD4] lg:aspect-auto lg:min-h-[280px]">
                    <Image
                      src={KNOW_MORE_FEATURE_IMAGES.patterns}
                      alt="Warm, calm living space suggesting ambient home sensing and daily life patterns"
                      fill
                      className="object-cover"
                      sizes={knowMoreImageSizes}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 md:p-7 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-sm font-medium tabular-nums text-[#9A8B7A]">01</span>
                      <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F] md:text-xl">
                        AI That Understands Daily Patterns
                      </h3>
                    </div>
                    <p className="mb-4 text-[0.9375rem] leading-relaxed text-[#3D3D3D] md:text-[1rem]">
                      Asthesis uses on-device AI to interpret motion, gait, thermal cues, and behavioral signals in
                      context. Instead of reacting only after an emergency, it helps identify subtle changes early —
                      making Care more proactive, aware, and continuous.
                    </p>
                    <ul className="space-y-1.5 border-t border-[#1D1D1F]/[0.06] pt-4 text-[0.8125rem] leading-snug text-[#6F6F6F] md:text-[0.875rem]">
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Motion + gait awareness
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        On-device AI detection
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Privacy-first sensing
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-[#1D1D1F]/[0.07] bg-white/50 shadow-md md:rounded-2xl">
                <div className="grid lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
                  <div className="relative aspect-[16/10] min-h-[200px] w-full bg-[#E8DFD4] lg:order-2 lg:aspect-auto lg:min-h-[280px]">
                    <Image
                      src={KNOW_MORE_FEATURE_IMAGES.connectedCare}
                      alt="Video call on a laptop — connected care and reassurance for care partners"
                      fill
                      className="object-cover"
                      sizes={knowMoreImageSizes}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 md:p-7 lg:order-1 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-sm font-medium tabular-nums text-[#9A8B7A]">02</span>
                      <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F] md:text-xl">
                        Care That Stays Close, Without Feeling Intrusive
                      </h3>
                    </div>
                    <p className="mb-4 text-[0.9375rem] leading-relaxed text-[#3D3D3D] md:text-[1rem]">
                      From one-touch video calls to intelligent alerts and responsive support, Asthesis transforms
                      advanced sensing into everyday reassurance. It is built to strengthen care for individuals, carers,
                      providers, local authorities and NHS commissioners while preserving comfort, dignity, and independence.
                    </p>
                    <ul className="space-y-1.5 border-t border-[#1D1D1F]/[0.06] pt-4 text-[0.8125rem] leading-snug text-[#6F6F6F] md:text-[0.875rem]">
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        One-touch support
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Intelligent alerts &amp; connection
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Calm, always-available Care presence
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              <article className="overflow-hidden rounded-xl border border-[#1D1D1F]/[0.07] bg-white/50 shadow-md md:rounded-2xl">
                <div className="grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
                  <div className="relative aspect-[16/10] min-h-[200px] w-full bg-[#E8DFD4] lg:aspect-auto lg:min-h-[280px]">
                    <Image
                      src={KNOW_MORE_FEATURE_IMAGES.privacy}
                      alt="Hands using a secured smartphone — private AI and trusted Care systems"
                      fill
                      className="object-cover"
                      sizes={knowMoreImageSizes}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-5 md:p-7 lg:p-8">
                    <div className="mb-3 flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-sm font-medium tabular-nums text-[#9A8B7A]">03</span>
                      <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F] md:text-xl">
                        Private AI. Trusted Care. Resilient by Design.
                      </h3>
                    </div>
                    <p className="mb-4 text-[0.9375rem] leading-relaxed text-[#3D3D3D] md:text-[1rem]">
                      With privacy shutters, secure system architecture, on-device AI processing, resilient
                      connectivity, and dependable backup power, Asthesis is designed to deliver care you can trust.
                      Every layer is built to support safety, consent, and support for proactive, person-centred care at home.
                    </p>
                    <ul className="space-y-1.5 border-t border-[#1D1D1F]/[0.06] pt-4 text-[0.8125rem] leading-snug text-[#6F6F6F] md:text-[0.875rem]">
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Secure system logging
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Cloud analytics with trusted architecture
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#9A8B7A]" aria-hidden>·</span>
                        Resilient connectivity &amp; backup power
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            <p className="mt-10 border-t border-[#1D1D1F]/[0.08] pt-8 text-center text-[0.95rem] font-semibold leading-snug text-[#1D1D1F] md:text-[1rem]">
              Asthesis is where advanced AI meets deeply human Care.
            </p>
            <div className="mt-6 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={closeKnowMore}
                className="rounded-2xl px-6 py-3 text-sm font-bold text-[#1D1D1F] transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#F5E6D3' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
      : null

  return { openKnowMore, portal }
}
