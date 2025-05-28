"use client"
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { ourFeat } from '../../../utils/ourFeatures'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const OurFeatures = () => {
       const headerContainer = useRef<HTMLHeadingElement | null>(null)


       useLayoutEffect(()=>{

        if (!headerContainer.current) {
          return
        }
         const  getElements: NodeListOf<Element> = window.document.querySelectorAll(".scaleAnimateFeatures")
        
         
        if (!getElements) {
          return
        }
        
          gsap.timeline({
            scrollTrigger:{
              trigger:headerContainer.current,
              start:"top 80%",
              toggleActions:"play none none none"
            }
          }).from(getElements,{
            opacity:0,
            duration:1,
            stagger:0,
            y:'-100%',
          })
        
        return ()=> ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        },[])

        
  return (
    <div className='mb-16  mt-32 mx-6 lg:mx-16 text-lightDark text-[0.85rem]'>
    <header className='text-center flex flex-col items-center' ref={headerContainer}>
        <h1 className='font-semibold  text-[1.5rem] scaleAnimateFeatures' >Our Features</h1>
        <p className='mdlg:w-[60%] scaleAnimateFeatures' >The RealVista shares limitedprovided with modern and reliable EV SSL encryption protocol and guarantees the security of confidential data.</p>
    </header>


<section className='lg:flex flex-wrap justify-between lg:gap-y-16 gap-y-8 my-16'>
  {ourFeat.map((item,index)=>{

    return <div key={index} className='lg:w-[30%]  w-full flex flex-col items-center text-center '>
      <article className='w-[100px] h-[100px] rounded-full bg-lightPrimary flex items-center justify-center '>
        <item.image size={60} className='text-primary' />
      </article>
      <h1 className='font-medium text-[1rem]'>{item.header}</h1>
      <p className='text-[0.8rem] font-light my-2'>{item.description}</p>
    </div>
  })}
</section>
</div>
  )
}

export default OurFeatures