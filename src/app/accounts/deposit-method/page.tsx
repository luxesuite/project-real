import React from 'react'
import { CiBank } from "react-icons/ci";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
const page = () => {
  return (
     <div className=' lg:w-[80%] w-[100%] '>

         <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6'>
{/* Header */}
<section className=''>
    <h1 className='font-semibold text-lg'>Payment Methid</h1>
    <aside className=' flex gap-x-4 my-4'>
        <button className='bg-grayUtil rounded-lg p-3 flex gap-x-2'><span><CiBank className='text-2xl'/></span> <span>Bank Wire</span></button>
        <button className='bg-grayUtil rounded-lg p-3 flex gap-x-2'><span><MdOutlineAccountBalanceWallet className='text-2xl' /></span> <span>Account Balance</span></button>
    </aside>
</section>

{/* How to Invest */}
<section className='my-6'>
    <h1 className='font-semibold text-lg'>How to Invest</h1>
    <p className='mt-2 mb-8'>For help with making your investment, contact our Admin Support team through the chat box. They will guide you step by step on the available options, how to proceed, and any important details you need to know. Make sure to have your account details ready for quicker assistance</p>

    <button className='w-full lg:py-6  py-4 rounded-full text-center bg-primary'>Contact Support</button>
</section>

            
         </div>
     </div>
  )
}

export default page