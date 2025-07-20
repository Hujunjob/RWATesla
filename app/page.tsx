"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import ProcessSection from "@/components/home/ProcessSection"
import TeslaVerificationSection from "@/components/home/TeslaVerificationSection"
import TestimonialSection from "@/components/home/TestimonialSection"
import FAQSection from "@/components/home/FAQSection"
import CTASection from "@/components/home/CTASection"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function HomePage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-16">
          <HeroSection />
          <ProcessSection />
          <TeslaVerificationSection />
          <TestimonialSection />
          <FAQSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  )
}