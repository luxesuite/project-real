"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
export const HeroSectionForLandingPage = () => {
const headerRef = useRef<HTMLHeadingElement | null>(null)
const paraRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(()=>{

    // for header
gsap.fromTo(headerRef.current,{
  y:-50,
  opacity:0,
  
},{
  y:0,
  opacity:1,
  duration:1.5,
  ease:"power3"
})
// for paragraph
gsap.fromTo(paraRef.current,{
  y:-50,
  opacity:0,
  
},{
  y:0,
  opacity:1,
  duration:3,
  ease:"power3",
  delay:1.5
})
  },[])
  return (
<div className='lg:flex items-center text-lightDark my-16 mx-6'>
  <div className='lg:w-[50%] flex flex-col gap-y-8'>
<h1 ref={headerRef} className='lg:text-[3.5rem] text-[2rem] leading-none'>
Grow Wealth,
<br />
Secure Your Future
</h1>
<p ref={paraRef} className='lg:w-[50%] w-[300px] text-sm'>Our investment platform is offering profitable
  <br />
investment opportunities to our customers</p>

<button className='rounded-full w-[120px] text-center py-[10px] bg-primary text-white '>
Get Started
</button>
  </div>

<div className='lg:w-[50%] w-full mdsm:min-h-[390px]  min-h-[350px] relative my-8'>
<Image 
src={"/hero-image2.jpg"}
alt='hero image'
priority={true} 
fill
className='absolute rounded-xl object-cover'
/>
</div>
    </div>
  )
}
