import type { Metadata } from 'next'
import { Unbounded, Inter } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({ 
  subsets: ['latin'],
  variable: '--font-unbounded',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const defaultTitle = 'Asthesis | A New Standard of Care'
const defaultDescription =
  'AI enabled technology enabled care (TEC): privacy preserving remote monitoring without cameras or wearables, supporting independent living and home first care models.'

export const metadata: Metadata = {
  metadataBase: new URL('https://asthesis.com'),
  title: {
    default: defaultTitle,
    template: '%s | Asthesis',
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Asthesis',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/images/Ast_logo_icon.png',
        width: 512,
        height: 512,
        alt: 'Asthesis',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/images/Ast_logo_icon.png'],
  },
  icons: {
    icon: [{ url: '/images/log-modified.png', type: 'image/png' }],
    apple: [{ url: '/images/log-modified.png', type: 'image/png' }],
    shortcut: '/images/log-modified.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
