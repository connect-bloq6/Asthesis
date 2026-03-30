import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Device model',
  description:
    'Interactive 3D exploded view of the Asthesis device—explore how the hardware is arranged.',
  openGraph: {
    title: 'Device model | Asthesis',
    description:
      'Interactive 3D exploded view of the Asthesis device—explore how the hardware is arranged.',
  },
  twitter: {
    title: 'Device model | Asthesis',
    description:
      'Interactive 3D exploded view of the Asthesis device—explore how the hardware is arranged.',
  },
}

export default function ModelsLayout({ children }: { children: React.ReactNode }) {
  return children
}
