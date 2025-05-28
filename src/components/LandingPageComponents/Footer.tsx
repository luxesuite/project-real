import React from 'react'
import Company from '../FooterForLandingPage/Company'
import { LinksAndResources } from '../FooterForLandingPage/LinksAndResources'
import Certificate from '../FooterForLandingPage/Certificate'
import ContactInfo from '../FooterForLandingPage/ContactInfo'

const Footer = () => {
  return (
    <div className=' lg:px-24 px-4 md:px-6  bg-black text-footerTextTwo py-8'>
        <div className='flex flex-col lg:flex-row lg:justify-between'>

        <Company/>
        <LinksAndResources/>
        <Certificate/>
        <ContactInfo/>
        </div>
    <p className='my-4'>Copyright © 2025 | Real Vista Shares Limited | All rights reserved.</p>
    </div>
  )
}

export default Footer