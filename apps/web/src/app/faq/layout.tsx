import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Asthesis—home monitoring, safety, privacy, installation, alerts, carers, and support.',
  openGraph: {
    title: 'FAQ | Asthesis',
    description:
      'Frequently asked questions about Asthesis—home monitoring, safety, privacy, installation, alerts, carers, and support.',
  },
  twitter: {
    title: 'FAQ | Asthesis',
    description:
      'Frequently asked questions about Asthesis—home monitoring, safety, privacy, installation, alerts, carers, and support.',
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
