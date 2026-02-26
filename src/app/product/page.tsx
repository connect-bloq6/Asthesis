'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import ProductSection1 from '@/components/ui/ProductSection1'
import ProductSection2 from '@/components/ui/ProductSection2'
import ProductSection3 from '@/components/ui/ProductSection3'
import ProductSection4 from '@/components/ui/ProductSection4'
import ProductSection5 from '@/components/ui/ProductSection5'

export default function ProductPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-visible bg-[#363636]">
      {/* White content area: navbar + hero – full width */}
      <div className="relative bg-white w-full min-h-screen overflow-visible">
        <Navbar solid />
        <ProductSection1 />
      </div>
      <ProductSection2 />
      <ProductSection3 />
      <ProductSection4 />
      <ProductSection5 />
      <Footer />
    </main>
  )
}
