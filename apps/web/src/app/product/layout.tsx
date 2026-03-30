import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product',
  description:
    'Explore the Asthesis product—privacy-preserving home wellbeing monitoring without cameras or wearables for independent living and TEC pathways.',
  openGraph: {
    title: 'Product | Asthesis',
    description:
      'Explore the Asthesis product—privacy-preserving home wellbeing monitoring without cameras or wearables for independent living and TEC pathways.',
  },
  twitter: {
    title: 'Product | Asthesis',
    description:
      'Explore the Asthesis product—privacy-preserving home wellbeing monitoring without cameras or wearables for independent living and TEC pathways.',
  },
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
