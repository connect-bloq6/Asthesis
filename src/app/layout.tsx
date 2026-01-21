import type { Metadata } from 'next'
import { Unbounded } from 'next/font/google'
import './globals.css'

const unbounded = Unbounded({ 
  subsets: ['latin'],
  variable: '--font-unbounded',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Asthesis - A New Standard of Care',
  description: 'Designed to support life—without getting in the way.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
