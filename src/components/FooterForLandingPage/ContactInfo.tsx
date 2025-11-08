"use client"
import { FaLocationDot } from "react-icons/fa6";
import { IoMailUnreadSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import React from 'react'

const ContactInfo = () => {
  return (
    <div className="w-[90%] lg:w-[20%] my-6 lg:my-0">
        <h1 className='font-semibold text-footerTextOne'>CONTACT INFO</h1>
      <section className="my-4">
        {/* Contact */}
        <div className="flex gap-x-4 mb-4 hover:text-footerTextOne cursor-pointer">
            <FaLocationDot size={25} className="text-primary"/> <span>C/O 32 Castlewood Road, London, United Kingdom, N16 6DW</span></div>
            {/* Mail */}
        <div className="flex items-center gap-x-4 my-4 hover:text-footerTextOne cursor-pointer">
            <IoMailUnreadSharp size={25}  className="text-primary"/> <span className="text-[0.8rem]">realvistaglobalwealth
              <br />@gmail.com</span></div>
            {/* Vip */}
        <div className="flex gap-x-4 my-4 hover:text-footerTextOne cursor-pointer">
            <IoCall  size={25}  className="text-primary" /> <span>+1 (313) 697-8902</span></div>
      </section>
    </div>
  )
}

export default ContactInfo