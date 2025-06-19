"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { FaStarOfLife } from "react-icons/fa";
import { GiConcentricCrescents } from "react-icons/gi";
export const page = () => {

    const [showPassword,setShowPassword] = useState({
        password:false,
        confirmPassword:false
    })
  return (
    <div className='flex  flex-col  h-screen items-center pt-16'>
            <section className='lg:w-[50%] md:w-[75%] w-[90%]   px-4'>
                  <div className='flex justify-center'>
    <Link href={"/"} className='flex items-center '>
    < GiConcentricCrescents className='text-primary' size={43}/>
        <span className='text-primary mdsm:text-[0.73rem] font-semibold text-[0.8rem]'>RealVista  Shares 
            <br />
            Limited</span>
    </Link>
      </div>
      
      <header className='my-8'>

        <h1 className='text-[1.1rem] '>Create Account</h1>
        <div className='mt-2'>Already registered ? <Link href={"/sign-in"} className='text-primary'>Sign in</Link></div>
      </header>

      {/* Form */}


<form action="">

    {/*full name, username , email */}
    {/* full name */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>Full name</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <input 
    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='Enter full name'
    
    type="text" />
</div>
{/* username */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>username</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <input 
    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='Enter full name'
    
    type="email" />
</div>
{/* email */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>Email</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <input 
    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='Enter full name'
    
    type="text" />
</div>


{/* password and confirm password */}

{/* Password */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>Password</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <aside className='relative'>
        <span onClick={()=>{
            if (showPassword.password) {
                setShowPassword({...showPassword,password:false})
            }
            else{
                setShowPassword({...showPassword,password:true})
            }
        }} className='cursor-pointer bg-black text-white px-[4px] py-[2px] rounded-lg absolute top-[30%] lg:left-[92%] md:left-[90%] left-[85%]'>{showPassword.password ? "hide" : "show"}</span>
    <input 
    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='Password'
    type={showPassword.password ? "text" : "password"} />
    </aside>
</div>


    {/* Confirm Password */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>Confirm Password</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <aside className='relative'>
        <span 
        
        onClick={()=>{
            if (showPassword.confirmPassword) {
                setShowPassword({...showPassword,confirmPassword:false})
            }
            else{
                setShowPassword({...showPassword,confirmPassword:true})
            }
        }}
        className='cursor-pointer bg-black text-white px-[4px] py-[2px] rounded-lg absolute top-[30%] lg:left-[92%] md:left-[90%] left-[85%]'>{showPassword.confirmPassword ? "hide" : "show"}</span>
    <input 

    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='Confirm Password'
    type={showPassword.confirmPassword ? "text" : "password"} />
    </aside>
</div>

<div className='flex justify-end'>
    <button type='submit' className='bg-primary rounded-full px-4 py-[5px]'> Register</button>
</div>
</form>
            </section>
    </div>
  )
}

export default page
