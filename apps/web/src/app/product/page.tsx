'use client'

import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import ProductSection1 from '@/components/ui/ProductSection1'
import ProductSection2 from '@/components/ui/ProductSection2'
import ProductSection3 from '@/components/ui/ProductSection3'
import ProductSection4, { ProductFeatureVideoCarousel } from '@/components/ui/ProductSection4'
import ProductSection5 from '@/components/ui/ProductSection5'

export default function ProductPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-visible bg-[#363636]">
      {/* White content area: navbar + hero – full width */}
      <div className="relative bg-white w-full min-h-screen overflow-visible">
        <Navbar solid />
        <section
          className="relative mt-6 w-full overflow-x-hidden overflow-y-visible pt-6 pb-10 sm:mt-8 sm:pt-8 sm:pb-12 lg:mt-10 lg:pt-10 lg:pb-16"
          aria-label="Product highlights"
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <ProductFeatureVideoCarousel variant="hero" />
          </div>
        </section>
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
