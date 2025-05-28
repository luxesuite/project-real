"use client"
import React, { useEffect, useRef } from 'react'
import { stabeAndSafeInfos } from '../../../utils/StabeAndSafeUtils'
import Image from 'next/image'
import Link from "next/link"
import { VscArrowRight } from "react-icons/vsc";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)
const StableAndSafeComponent = () => {
    const allContainerRef = useRef<(HTMLDivElement | null)[]>([])
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const headerContainer = useRef<HTMLHeadingElement | null>(null)

// useEffect(()=>{
// const observer = new IntersectionObserver(([entry])=>{
//   if (entry.isIntersecting) {
    
//     console.log("gotten to the point");
    
//   }
// })

// if (wrapperRef.current) {
//   observer.observe(wrapperRef.current)
// }

// return ()=> observer.disconnect()
// },[])



// Animation for header 

useEffect(()=>{

if (!headerContainer.current) {
  return
}
 const  getElements: NodeListOf<Element> = window.document.querySelectorAll(".scaleAnimateStable")
 console.log(getElements);
 
if (!getElements) {
  return
}

  gsap.timeline({
    scrollTrigger:{
      trigger:headerContainer.current,
      start:"top 100%",
      toggleActions:"play none none none"
    }
  }).from(getElements,{
    opacity:0,
    duration:3,
    stagger:1,
    scale:0.5,
  })

return ()=> ScrollTrigger.getAll().forEach(trigger => trigger.kill())
},[])


    useEffect(() => {
      const isDesktop = window.innerWidth > 900;
  
      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
  
        tl.from(allContainerRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.5,
        });
      } else {
        allContainerRef.current.forEach((el) => {
          if (!el) return;
          gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
  
      return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }, []);

  return (
    <div className='mb-16  mt-32 mx-6 lg:mx-16 text-lightDark text-[0.85rem]'>

        <header className='text-center flex flex-col items-center' ref={headerContainer}>
            <h1 className='font-semibold  text-[1.5rem] scaleAnimateStable'>Stable, safe and profitable system for everyone</h1>
            <p className='mdlg:w-[60%] scaleAnimateStable'>Providing of the declared profitability is reached by the eSports betting. Making use of experience of professional guarantee profit from the invested money.</p>
        </header>

        <section ref={wrapperRef} className='lg:flex justify-between my'>
            {
                stabeAndSafeInfos.map((item,index)=>{

                    return <div 
                    ref={ (el) => {
                        allContainerRef.current[index] = el}
                    
                    }
                    key={index} className='lg:w-[30%] w-full my-8'>
                        <div className='relative w-full h-[230px] rounded-xl overflow-hidden '>
                        <Image className='absolute top-0 left-0 object-cover' src={item.image} fill alt={item.header} />
                        </div>
                        <h1 className='font-semibold capitalize text-[1.2rem] my-4'>{item.header}</h1>
                        <p>{item.paragraph}</p>
                        <Link href="/about" className='text-primary flex my-4'>Learn More <VscArrowRight /></Link>

                    </div>
                })
            }
        </section>
    </div>
  )
}

export default StableAndSafeComponent