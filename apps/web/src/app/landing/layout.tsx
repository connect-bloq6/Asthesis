import type { Metadata } from 'next'

/** Same positioning as `/` (home re-exports landing) for anyone hitting `/landing`. */
export const metadata: Metadata = {
  title: {
    absolute: 'Asthesis | A New Standard of Care',
  },
  description:
    'AI enabled technology enabled care (TEC): privacy preserving remote monitoring without cameras or wearables, supporting independent living and home first care models.',
  openGraph: {
    title: 'Asthesis | A New Standard of Care',
    description:
      'AI enabled technology enabled care (TEC): privacy preserving remote monitoring without cameras or wearables, supporting independent living and home first care models.',
  },
  twitter: {
    title: 'Asthesis | A New Standard of Care',
    description:
      'AI enabled technology enabled care (TEC): privacy preserving remote monitoring without cameras or wearables, supporting independent living and home first care models.',
  },
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return children
}
