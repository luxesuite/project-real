"use client"
import React, { useEffect, useRef } from 'react'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { investmentPlans } from '../../../utils/InvestmentPlans'
import { IoCardOutline } from "react-icons/io5";
import { IoAlarmOutline } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger)

const InvestmentPlansComponent = () => {
       const headerContainer = useRef<HTMLDivElement | null>(null)


       useEffect(()=>{

         
         if (!headerContainer.current) {
           return
         }
         const  getElements: NodeListOf<Element> = window.document.querySelectorAll(".scaleAnimate")
 
         
        if (!getElements) {
          return
        }
        
          gsap.timeline({
            scrollTrigger:{
              trigger:headerContainer.current,
              start:"top 80%",
              once:true
              // toggleActions:"play none none none"
            }
          }).from(getElements,{
            opacity:0,
            duration:3,
            stagger:1,
            scale:0.5,
          })
        
        return ()=> ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        },[])

        
  return (
    <div className='mb-16  mt-32 mx-6 lg:mx-16 text-lightDark text-[0.85rem]'>
    <div className='text-center flex flex-col items-center ' ref={headerContainer}>
        <h1 className='font-semibold  text-[1.5rem] scaleAnimate' >Investment plans</h1>
        <p className='mdlg:w-[75%] scaleAnimate'>The RealVista shares limitedprovided with modern and reliable EV SSL encryption protocol and guarantees the security of confidential data.</p>
    </div>


<section className='lg:flex flex-wrap justify-between lg:gap-y-16 gap-y-8 my-16 mx-auto lg:w-[80%] w-[90%] '>
 {
  investmentPlans.map((item,index)=>{

    return <div key={index} className='lg:w-[48%] lg:mx-[0px] md:w-[80%] md:mx-auto w-[100%] bg-lightPrimary h-[200px] flex flex-col justify-between py-4 px-4 rounded-sm my-4'>
      <section className=' flex gap-8 text-primary font-semibold'>
        <span>{item.package}</span>
        <span>{item.return}</span>
      </section>

      <section className='flex justify-between h-[50%]' >
        {/* Capital Range */}
        <aside className='bg-primaryShade w-[45%] flex flex-col justify-between py-2 px-4 rounded-sm'>
          <span>
        <IoCardOutline />
          </span>
          <h1 className='text-[0.7rem]'>Capital Range</h1>
          <h1 className='text-primary font-semibold'>{item.capitalRange}</h1>
        </aside>
        {/* profit period */}
        <aside className='bg-primaryShade w-[45%] flex flex-col justify-between py-2 px-4 rounded-sm' >
          <span>
          <IoAlarmOutline />
          </span>
          <h1 className='text-[0.7rem]'>Profit Period</h1>
          <h1 className='text-primary font-semibold'>{item.profitPeriod}</h1>
        </aside>

      </section>

    </div>
  })
 }
</section>
</div>
  )
}


export default InvestmentPlansComponent