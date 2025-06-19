import React from 'react'

const page = () => {
  return (
    <div className=' lg:w-[80%] w-[100%] '>
    
             <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6'>
    {/* Header */}
    <section className=''>
        <h1 className='font-semibold text-lg'>Payment Method</h1>
      <p>Withdrawal securely your preferred crypto to your wallet</p>
    </section>
    
    {/* How to Invest */}
    <form className='my-6 bg-gray-100 py-4 px-2'>
<div className='flex flex-col gap-y-4'>
    <label htmlFor="">Amount(USD):</label>
    <input 
    placeholder='Enter amount'
    className='bg-gray-200 h-12  w-full rounded-lg px-4 active:border-1 active:border-primary outline-none'
    type="text" />
</div>
<p className='text-end my-2'>Current balance: <span>$0.00</span></p>
<button className='text-center w-full border-primary border-1 hover:bg-primary py-3 rounded-full mt-4'>Make Withdrawal</button>
    </form>
    
                
             </div>
         </div>
  )
}

export default page