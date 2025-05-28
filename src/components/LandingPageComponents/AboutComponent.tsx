"use client"
import Link from "next/link"
import React from 'react'

const AboutComponent = () => {
  return (
    <div className='lg:flex justify-between mx-6 lg:mx-16 text-[0.8rem] text-lightBlack py-16 bg-lightPrimary px-4 rounded-2xl'>

        {/* Video container */}

<section className='lg:w-[45%] w-full'>
  <div className='w-full h-full rounded-2xl overflow-hidden'>
    <video
    src={"/video-home.mp4"}
    controls
    />
    </div>
    </section>  
    {/* Text content */}
    <section className='lg:w-[45%] w-full space-y-4 py-2 flex flex-col justify-center lg:items-start items-center mt-8'>
<h1 className='font-semibold lg:text-[2rem] text-[1.6rem]  text-center lg:text-start'>About Vista-Shares Limited</h1>
<p className="text-center lg:text-start">We are a trusted investment company dedicated to helping you grow your wealth. With a range of tailored investment plans, expert guidance, and a commitment to your financial success, we make investing simple and effective. Our team ensures transparency, security, and personalized support every step of the way. Partner with us to achieve your financial goals with confidence</p>

<Link href="#" className='rounded-full w-[160px] text-center py-[12px] bg-primary text-white'>Start Investing</Link>
    </section>
      </div>
  )
}

export default AboutComponent