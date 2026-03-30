import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impact',
  description:
    'How Asthesis supports preventative care, carers and families, and more responsive care systems—harm prevention and proactive insight at home.',
  openGraph: {
    title: 'Impact | Asthesis',
    description:
      'How Asthesis supports preventative care, carers and families, and more responsive care systems—harm prevention and proactive insight at home.',
  },
  twitter: {
    title: 'Impact | Asthesis',
    description:
      'How Asthesis supports preventative care, carers and families, and more responsive care systems—harm prevention and proactive insight at home.',
  },
}

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children
}
