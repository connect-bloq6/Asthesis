'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import ImpactSection1 from '@/components/ui/ImpactSection1'
import ImpactSection2 from '@/components/ui/ImpactSection2'
import ImpactSection3 from '@/components/ui/ImpactSection3'
import ImpactSection4 from '@/components/ui/ImpactSection4'
import ImpactSection5 from '@/components/ui/ImpactSection5'
import ImpactSection6 from '@/components/ui/ImpactSection6'
import ImpactSection7 from '@/components/ui/ImpactSection7'
import ImpactSection8 from '@/components/ui/ImpactSection8'
import ImpactSection9 from '@/components/ui/ImpactSection9'

export default function ImpactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar solid />
      <ImpactSection1 />
      <ImpactSection2 />
      <ImpactSection3 />
      <ImpactSection4 />
      <ImpactSection5 />
      <ImpactSection6 />
      <ImpactSection7 />
      <ImpactSection8 />
      <ImpactSection9 />
      <Footer />
    </main>
  )
}
