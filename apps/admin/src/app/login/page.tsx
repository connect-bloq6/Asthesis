import Image from 'next/image'
import Link from 'next/link'
import { BODY_MUTED, BUTTON_BG, CARD_BG, HEADING_TEXT, INPUT_BG, INPUT_BORDER, LABEL_TEXT } from '@asthesis/shared'
import { LoginForm } from './LoginForm'

const inter = { fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' } as const

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background flex flex-col items-center justify-center px-5 py-16">
      <div
        className="w-full max-w-[440px] rounded-2xl p-8 shadow-lg border border-[#E5E7EB]"
        style={{ backgroundColor: CARD_BG }}
      >
        <div className="flex justify-center mb-6">
          <Image
            src="/images/Ast_logo_icon.png"
            alt="Asthesis"
            width={56}
            height={56}
            className="object-contain"
            priority
          />
        </div>
        <h1
          className="text-xl sm:text-2xl font-semibold text-center leading-snug mb-2"
          style={{ ...inter, color: HEADING_TEXT }}
        >
          Admin sign in
        </h1>
        <p
          className="text-sm text-center leading-relaxed mb-6"
          style={{ ...inter, color: BODY_MUTED }}
        >
          Sign in to view contact form enquiries. Access is limited to authorised accounts.
        </p>
        <LoginForm inter={inter} labelColor={LABEL_TEXT} inputBg={INPUT_BG} inputBorder={INPUT_BORDER} buttonBg={BUTTON_BG} />
        <p className="text-center text-xs mt-6" style={{ ...inter, color: BODY_MUTED }}>
          <Link href="https://asthesis.com" className="underline hover:opacity-80" style={{ color: LABEL_TEXT }}>
            Back to asthesis.com
          </Link>
        </p>
      </div>
    </main>
  )
}
