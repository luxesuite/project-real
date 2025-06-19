"use client"
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
interface passwordViewType<B>{
    newPassword:B,
    confirmPassword:B
}

const page = () => {
    const [accountActive,setAccountActive] = useState<boolean>(true)
    const [passwordView,setPasswordView] = useState<passwordViewType<boolean>>({
        newPassword:false,
        confirmPassword:false
    })
  return (
     <div className=' lg:w-[80%] w-[100%] '>
    
             <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6  min-h-screen py-2'>

<header className='flex items-center gap-x-4'>
    <button 
     className={`cursor-pointer px-4 py-2 rounded-full  flex items-center ${accountActive ? "bg-primary text-white" : "bg-lightPrimary"}`}
    onClick={()=> setAccountActive(true)}>Account</button>
    <button
    className={`cursor-pointer px-4 py-2 rounded-full  flex items-center ${accountActive ? "bg-lightPrimary" : "bg-primary text-white"}`}
    onClick={()=> setAccountActive(false)}>Security</button>
</header>

{accountActive && <>
<div className='flex flex-col gap-y-6 my-4'>
    <h1 className='text-[1.05rem] font-medium '>Account Details</h1>
    <section className='flex items-center gap-x-2'>
        <div className='h-[20px] w-[20] rounded-full bg-primary'></div>
        <h1 className='font-medium'>Kris</h1>
    </section>

    <form action="" className='my-4'>
        {/* Name */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Full Name</label>
            <input 
            readOnly
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg'
            // value={"Kris"}
            defaultValue={"KrisBake"}
            type="text" />
        </div>
        {/* Email */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Email</label>
            <input 
            readOnly
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg'
            defaultValue={"KrisBake"}
            type="text" />
        </div>
        {/* Username */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Username</label>
            <input 
            readOnly
            defaultValue={"KrisBake"}
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg'
            // value={"KrisBake"}
            type="text" />
        </div>
    </form>
</div>
</>}
{
    !accountActive && <>
    <div className='flex flex-col gap-y-6 my-4'>
    <h1 className='text-[1.05rem] font-medium '>Update Password</h1>


    <form action="" className='my-4'>
        {/* New Password */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">New Password</label>
            <aside className='flex relative'>
            <input 
            className='border-1 h-full w-full  border-gray-100 px-2 outline-none py-3 rounded-lg '
            placeholder='enter password'

            // value={""}
            type={`${passwordView.newPassword? "text" : "password"}`} />
            <span  onClick={()=>{
                if (passwordView.newPassword) {
                    
                    setPasswordView({...passwordView,newPassword:false})
                }
                else{
                    
                    setPasswordView({...passwordView,newPassword:true})
                }
            }} className='absolute top-[40%] left-[90%] w-[20px] h-[20px]'><FaEye /></span>
            </aside>

        </div>
        {/* Confirm New Password */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Confirm New Password</label>
            <aside className='flex relative'>
            <input 
            className='border-1 h-full w-full  border-gray-100 px-2 outline-none py-3 rounded-lg '
            placeholder='confirm password'
            // value={""}
            type={`${passwordView.confirmPassword? "text" : "password"}`} />
            <span  onClick={()=>{
                if (passwordView.confirmPassword) {
                    
                    setPasswordView({...passwordView,confirmPassword:false})
                }
                else{
                    
                    setPasswordView({...passwordView,confirmPassword:true})
                }
            }} className='absolute top-[40%] left-[90%] w-[20px] h-[20px]'><FaEye /></span>
            </aside>
        </div>
       
       <div>
        <button className='bg-primary px-4 py-2 text-white rounded-lg'>Update Password</button>
       </div>
    </form>
</div>
    </>
}
             </div>
             </div>
  )
}

export default page