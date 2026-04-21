import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import ImpactSection7 from '@/components/ui/ImpactSection7'
import ImpactSection8 from '@/components/ui/ImpactSection8'
import ImpactSection9 from '@/components/ui/ImpactSection9'
import CareersSection from '@/components/ui/CareersSection'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Asthesis: open roles, our mission, vision, and how we support preventative care and technology enabled care at home.',
  openGraph: {
    title: 'Careers | Asthesis',
    description:
      'Join Asthesis: open roles, our mission, vision, and how we support preventative care and technology enabled care at home.',
  },
  twitter: {
    title: 'Careers | Asthesis',
    description:
      'Join Asthesis: open roles, our mission, vision, and how we support preventative care and technology enabled care at home.',
  },
}

export default function CareersPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar solid />
      <CareersSection />
      <ImpactSection7 />
      <ImpactSection8 />
      <ImpactSection9 />
      <Footer />
    </main>
  )
}
