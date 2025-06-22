"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FaStarOfLife } from "react-icons/fa";
import { GiConcentricCrescents } from "react-icons/gi";
import { openModal } from '@/store/slices/modalSlice';
import { useDispatch } from 'react-redux';
import { appDispatch } from '@/store';
import { useMutation } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { addUserInfo } from '@/store/slices/userSlice';

const domainAddress = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS

const signIn = async(formDetails:any)=>{



    const res = await fetch(`${domainAddress}/api/sign-in`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formDetails)
    })

    return res.json()
}
const page = () => {
    const router = useRouter()
    const dispatch = useDispatch<appDispatch>()
    const mutation = useMutation({
        mutationFn:signIn,
        onSuccess:(data)=>{
                console.log(data);
                if (data.success) {
                    localStorage.setItem("token",JSON.stringify(data.token))
                    localStorage.setItem("user",JSON.stringify(data.data))
                    dispatch(addUserInfo({username:data.data.username,email:data.data.email}))
                router.push("/accounts/dashboard")

                return
                }
                if (data.message) {
                    dispatch(openModal(data.message))
                }

        
            },
            onError:(error)=>{
                console.log(error);
                
            }
    })
        const [formDetails,setFormDetails] = useState({
            username:"",
            password:"",
        })

    const [showPassword,setShowPassword] = useState({
        password:false,
        confirmPassword:false
    })



    const handleSubmit = (e:React.SyntheticEvent)=>{
e.preventDefault()
if (!formDetails.password || !formDetails.username) {
     dispatch(openModal("Empty field"))
         return
}

mutation.mutate(formDetails)
    }
    useEffect(()=>{
console.log(formDetails);

    },[formDetails])
  return (
    <div className='flex  flex-col  h-screen items-center pt-16'>
            <section className='lg:w-[50%] md:w-[75%] w-[90%]'>
                  <div className='flex justify-center'>
    <Link href={"/"} className='flex items-center '>
    < GiConcentricCrescents className='text-primary' size={43}/>
        <span className='text-primary mdsm:text-[0.73rem] font-semibold text-[0.8rem]'>RealVista  Shares 
            <br />
            Limited</span>
    </Link>
      </div>
      
      <header className='my-8'>

        <h1 className='text-[1.1rem] text-primary'>Login Account</h1>
        <div className='mt-2'>No account yet ? <Link href={"/sign-up"} className='text-primary'>Sign Up</Link></div>
      </header>

      {/* Form */}


<form action="" onSubmit={handleSubmit}>

{/* username */}
<div className='my-2'>
    <label htmlFor="" className='flex items-center'><span>Username</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
    <input 
    className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
    placeholder='username'
    name='username'
    onChange={(e)=>{
        setFormDetails({...formDetails,[e.target.name]:e.target.value})
    }}
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
    placeholder='password'
       
    name='password'
    onChange={(e)=>{
        setFormDetails({...formDetails,[e.target.name]:e.target.value})
    }}
    type={showPassword.password ? "text" : "password"} />
    </aside>
</div>


<div className='flex justify-end'>
    <button type='submit'
    disabled = {mutation.isPending ? true : false}
    className='font-medium text-white bg-primary rounded-full px-4 py-[5px]'>{mutation.isPending ? <Loader/> : "Login"}</button>
</div>
</form>
            </section>
    </div>
  )
}

export default page
