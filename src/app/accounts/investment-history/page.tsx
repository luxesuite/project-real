import React from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
const page = () => {
  return (
    <div className=' lg:w-[80%] w-[100%] '>
        
                 <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6 bg-gray-100 min-h-screen py-2'>
    
    <h1 className='my-2 text-[1.05rem] font-medium'>Investment History</h1>
    
    {/* Investment History */}
    <div className='py-2 text-red-600'>
      <p className='flex gap-x-2 items-center'><span><AiOutlineExclamationCircle/></span>  <span>No Investments made</span></p>
    </div>
    </div>
                 </div>
  )
}

export default page