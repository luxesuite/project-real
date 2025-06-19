"use client"
import React, { useState } from 'react'
import { IoMdArrowUp } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
 const page = () => {
    const [depositActive,setDepositActive] = useState<boolean>(false)
  return (
        <div className=' lg:w-[80%] w-[100%] '>
    
             <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6 bg-gray-100 min-h-screen py-2'>

<h1 className='my-6 text-[1.05rem] font-medium'>Transaction History</h1>
<div className='flex gap-x-4'>
    {/* Deposit */}
    <button 
    onClick={()=> setDepositActive(true)}
    className={`px-4 py-2 rounded-full  flex items-center ${depositActive ? "bg-slate-900 text-white" : "bg-gray-200"}`}><span><IoMdArrowDown/></span> <span>Deposit</span></button>
    {/* Withdrawal */}
    <button
    onClick={()=> setDepositActive(false)}
    className={`px-4 py-2 rounded-full  flex items-center ${depositActive ? "bg-gray-200" : "bg-slate-900 text-white"}`}><span>< IoMdArrowUp/></span> <span>Withdrawal</span></button>
</div>

<div className='py-4'>
    {/* for Deposti */}
    {depositActive && (
        <p>No Transaction History</p>
    )}
    {!depositActive && (
        <p>No Withdrawal History</p>
    )}
</div>
</div>
             </div>
  )
}

export default page