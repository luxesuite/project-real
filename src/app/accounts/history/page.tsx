"use client"
import { RootState } from '@/store';
import React, { useEffect, useState } from 'react'
import { IoMdArrowUp } from "react-icons/io";
import { IoMdArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
 const page = () => {
    const [depositActive,setDepositActive] = useState<boolean>(true)
    const userState = useSelector((store:RootState)=>{

        return store.userReducer
    })


    useEffect(()=>{
        console.log(depositActive);
        console.log(userState);
        
    },[depositActive])

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
        <>
        {userState.deposit.length < 1 && <p>No Transaction History</p>}
        {userState.deposit.length > 0 &&  userState.deposit.map((item:any,index:number)=>{
            return <div key={index} className='flex justify-between items-center bg-gray-300 p-4 rounded-lg my-3'>
                <span>{item.date.split(",")[0]}</span>
                <span>${item.amount}</span>
                <span>< FaCheckCircle className='text-green-500'/></span>
            </div>
        })}
        </>
    )}
    {!depositActive && (
        // <p>No Withdrawal History</p>

                <>
        {userState.withdrawal.length < 1 && <p>No Transaction History</p>}
        {userState.withdrawal.length > 0 &&  userState.withdrawal.map((item:any,index:number)=>{
            return <div key={index} className='flex justify-between items-center bg-gray-300 p-4 rounded-lg my-3'>
                <span>{item.date.split(",")[0]}</span>
                <span>${item.amount}</span>
                <span>{item.confirmed == "yes" ? < FaCheckCircle className='text-green-500'/> : <BsExclamationCircleFill className='text-orange-400'/>}</span>
            </div>
        })}
        </>
    )}
</div>



</div>
             </div>
  )
}

export default page