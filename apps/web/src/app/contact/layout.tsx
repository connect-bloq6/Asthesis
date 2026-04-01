import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Speak to us about technology enabled care commissioning, including demos, commissioner briefings, pilots, partnerships, and service design.',
  openGraph: {
    title: 'Contact Us | Asthesis',
    description:
      'Speak to us about technology enabled care commissioning, including demos, commissioner briefings, pilots, partnerships, and service design.',
  },
  twitter: {
    title: 'Contact Us | Asthesis',
    description:
      'Speak to us about technology enabled care commissioning, including demos, commissioner briefings, pilots, partnerships, and service design.',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
