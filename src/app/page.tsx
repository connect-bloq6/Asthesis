'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/ui/HeroSection'
import SystemSection from '@/components/ui/SystemSection'
import StyleSection from '@/components/ui/StyleSection'
import InterfaceSection from '@/components/ui/InterfaceSection'
import HousingSection from '@/components/ui/HousingSection'
import ProcessingSection from '@/components/ui/ProcessingSection'
import PowerSection from '@/components/ui/PowerSection'
import FutureSection from '@/components/ui/FutureSection'
import CloudAnalyticsSection from '@/components/ui/CloudAnalyticsSection'
import ThermalVisionSection from '@/components/ui/ThermalVisionSection'
import MotionSection from '@/components/ui/MotionSection'
import LidarSection from '@/components/ui/LidarSection'
import DeviceShowcaseSection from '@/components/ui/DeviceShowcaseSection'
import VideoSection from '@/components/ui/VideoSection'
import Footer from '@/components/ui/Footer'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      <main className={`relative bg-background transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection isLoaded={!isLoading} />

        {/* System Section */}
        <SystemSection />

        {/* Style Section */}
        <StyleSection />

        {/* Interface Section - Protective Glass */}
        <InterfaceSection />

        {/* Interface Section - Aluminum Housing */}
        <HousingSection />

        {/* Interface Section - Processing Core */}
        <ProcessingSection />

        {/* Interface Section - Power */}
        <PowerSection />

        {/* The Future Section */}
        <FutureSection />

        {/* Cloud Analytics Section */}
        <CloudAnalyticsSection />

        {/* Thermal Vision Section */}
        <ThermalVisionSection />

        {/* Motion Section */}
        <MotionSection />

        {/* Lidar Mapping Section */}
        <LidarSection />

        {/* Device Showcase Section */}
        <DeviceShowcaseSection />

        {/* Video Section */}
        <VideoSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
