import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Asthesis: our purpose, mission, and how we support preventative, person centred, technology enabled care at home.',
  openGraph: {
    title: 'About Us | Asthesis',
    description:
      'Learn about Asthesis: our purpose, mission, and how we support preventative, person centred, technology enabled care at home.',
  },
  twitter: {
    title: 'About Us | Asthesis',
    description:
      'Learn about Asthesis: our purpose, mission, and how we support preventative, person centred, technology enabled care at home.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
