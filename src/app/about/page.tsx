'use client'

import Navbar from '@/components/ui/Navbar'
import AboutSection1 from '@/components/ui/AboutSection1'
import AboutSection2 from '@/components/ui/AboutSection2'
import AboutSection3 from '@/components/ui/AboutSection3'
import AboutPurposeMissionSection from '@/components/ui/AboutPurposeMissionSection'
import AboutSection4 from '@/components/ui/AboutSection4'
import AboutSection5 from '@/components/ui/AboutSection5'
import AboutSection6 from '@/components/ui/AboutSection6'
import AboutSection7 from '@/components/ui/AboutSection7'
import Footer from '@/components/ui/Footer'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <AboutSection1 />
      <AboutSection2 />
      <AboutSection3 />
      <AboutPurposeMissionSection />
      <AboutSection4 />
      <AboutSection5 />
      <AboutSection6 />
      <AboutSection7 />
      <Footer />
    </main>
  )
}
