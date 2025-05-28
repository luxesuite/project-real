"use client"
import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { liveUpdateUsersDeposit } from '../../../utils/liveUpdateData'
import LiveDeposits from '../LiveUpdatesComponents/LiveDeposits'
import LiveWithdrawals from '../LiveUpdatesComponents/LiveWithdrawals'



gsap.registerPlugin(ScrollTrigger)

const LiveUpdates = () => {
       const headerContainer = useRef<HTMLDivElement | null>(null)
       useEffect(()=>{

         if (!headerContainer.current) {
           return
         }
         const  getElements: NodeListOf<Element> = window.document.querySelectorAll(".scaleAnimateLive")
 
         
        if (!getElements) {
          return
        }
        
          gsap.timeline({
            scrollTrigger:{
              trigger:headerContainer.current,
              start:"top 80%",
              once:true,

              // toggleActions:"play none none none"
            }
          }).from(getElements,{
            opacity:0,
            duration:1,
            stagger:0,
            y:"-100%",
          })
        
        return ()=> ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        },[])

        
  return (
    <div className='mb-16  mt-32 mx-6 lg:mx-8 text-lightDark text-[0.85rem]'>
    <section className='text-center flex flex-col items-center my-16' ref={headerContainer}>
        <p className='font-semibold'>What we offer</p>
        <h1 className='font-semibold  text-[1.5rem] scaleAnimateLive' >Investment plans</h1>
        <p className='mdlg:w-[75%] scaleAnimateLive'>Our transparent statistics will help you to know more about our successes.</p>
    </section>


<div className='lg:flex items-center gap-x-8 gap-y-16 justify-center'> 
<LiveDeposits/>
<LiveWithdrawals/>
</div>
</div>
  )
}





export default LiveUpdates

