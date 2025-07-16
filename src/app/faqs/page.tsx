"use client"
import Faqs from '@/components/FaqsComponents/Faqs'
import HeroSectionFaqs from '@/components/FaqsComponents/HeroSectionFaqs'
import Footer from '@/components/LandingPageComponents/Footer'
import { HeaderForLandingPage } from '@/components/LandingPageComponents/HeaderForLandingPage'
import React from 'react'

const page = () => {
  if (typeof window === 'undefined') return null;
  return (
    <div>
        <HeaderForLandingPage/>
        <HeroSectionFaqs/>
        <Faqs/>
        <Footer/>
    </div>
  )
}

export default page