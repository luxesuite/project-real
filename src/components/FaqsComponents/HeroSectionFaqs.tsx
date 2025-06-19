
"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
const HeroSectionFaqs = () => {
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
    <div>
      <button className='rounded-full p-2 bg-blue-100 border-blue-300 border-1'>we answer your complains</button> 
    </div>
<h1 ref={headerRef} className='md:w-[90%] lg:text-[3.5rem] text-[2rem] leading-none'>
Find answers to frequent questions
</h1>
<p ref={paraRef} className='lg:w-[50%] w-[300px] text-sm'>Our investment platform is offering profitable
  <br />
investment opportunities to our customers</p>

<button className='rounded-full w-[120px] text-center py-[10px] bg-primary text-white '>
Join us now
</button>
  </div>

<div className='lg:w-[50%] w-full mdsm:min-h-[390px]  min-h-[350px] relative my-8'>
<Image 
src={"/faq-image.jpg"}
alt='hero image'
priority={true} 
fill
className='absolute rounded-xl object-cover'
/>
</div>
    </div>)
}

export default HeroSectionFaqs