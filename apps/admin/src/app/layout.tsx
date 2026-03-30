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

export const metadata: Metadata = {
  title: 'Asthesis — Contact enquiries',
  description: 'Admin portal for Asthesis contact form submissions.',
  icons: {
    icon: [{ url: '/images/Ast_logo_icon.png', type: 'image/png' }],
    apple: [{ url: '/images/Ast_logo_icon.png', type: 'image/png' }],
    shortcut: '/images/Ast_logo_icon.png',
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
