import HeroSection from '@/components/AboutComponents/HeroSection'
import OperationMission from '@/components/AboutComponents/OperationMission'
import AboutComponent from '@/components/LandingPageComponents/AboutComponent'
import Footer from '@/components/LandingPageComponents/Footer'
import { HeaderForLandingPage } from '@/components/LandingPageComponents/HeaderForLandingPage'
import React from 'react'

const page = () => {
  return (
    <div>
        <HeaderForLandingPage/>
        <HeroSection/>
        <OperationMission/>
        <AboutComponent/>
        <div className='my-6'></div>
<Footer/>
    </div>
  )
}

export default page