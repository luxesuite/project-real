"use client"
import { RootState } from '@/store';
import React from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
const page = () => {

      
      const userState = useSelector((store:RootState)=>{
  
          return store.userReducer
      })
  return (
    <div className=' lg:w-[80%] w-[100%] '>
        
                 <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6 bg-gray-100 min-h-screen py-2'>
    
    <h1 className='my-2 text-[1.05rem] font-medium'>Investment History</h1>
    
    {/* Investment History */}
    <div className='py-2 '>

       {userState.investment.length < 1 &&  <article className='text-red-600'>
  <p className='flex gap-x-2 items-center'><span><AiOutlineExclamationCircle/></span>  <span >No Investments made</span></p>
  </article>}
  
             {userState.investment.length > 0 &&  [...userState.investment].reverse().map((item:any,index:number)=>{
                         return <div key={index} className='flex justify-between items-center bg-gray-300 p-4 rounded-lg my-3'>
                          <span>{item.plan}</span>
                             <span>{item.date.split(",")[0]}</span>
                             <span>${item.amount}</span>
                             <span className='text-green-800'>${item.confirmed == "yes" ? item.profitReturn : "0"}</span>
                             <span>{item.confirmed == "yes" ? < FaCheckCircle className='text-green-500'/> : <BsExclamationCircleFill className='text-orange-400'/>}</span>
                         </div>
                     })}
 
    </div>
    </div>
                 </div>
  )
}

export default page