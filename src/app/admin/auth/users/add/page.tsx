"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Link from 'next/link';
import { FaStarOfLife } from "react-icons/fa";
import { GiConcentricCrescents } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { appDispatch } from '@/store';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const postData = async(formDetails:any)=>{
    const res = await fetch(`/api/sign-up`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formDetails)
})

return res.json()
}

const page = () => {
const dispatch = useDispatch<appDispatch>()
const [confirmPassword,setConfirmPassword] = useState<string>("")
const router = useRouter()
const mutation = useMutation({
    mutationFn:postData,
    onSuccess:(data)=>{
        console.log(data);
  
        if (data.message) {
            dispatch(openModal("you have manually created a new user"))
        }
    },
    onError:(error)=>{
        console.log(error);
        dispatch(openModal("Cant create user at this time"))
    }
})

const [showPassword,setShowPassword] = useState({
    password:false,
    confirmPassword:false
})

const [formDetails,setFormDetails] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    role:"user"
})

const handleSubmit =async (e:React.SyntheticEvent)=>{
    e.preventDefault()

    if (confirmPassword !== formDetails.password) {
        dispatch(openModal("password does not match"))
        return
    }

    if ( !formDetails.name || !formDetails.password || !formDetails.username) {
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
    
            {/* Form */}
            <form action="" className='' onSubmit={handleSubmit}>
                {/*full name, username , email */}
                {/* full name */}
                <div className='my-2'>
                    <label htmlFor="" className='flex items-center'><span>Full name</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
                    <input 
                        className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
                        placeholder='Enter full name'
                        name='name'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                            setFormDetails({...formDetails,[e.target.name]:e.target.value})
                        }}
                        type="text" 
                    />
                </div>
                
                {/* username */}
                <div className='my-2'>
                    <label htmlFor="" className='flex items-center'><span>username</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
                    <input 
                        className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
                        placeholder='username'
                        name='username'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                            setFormDetails({...formDetails,[e.target.name]:e.target.value})
                        }}
                        type="text" 
                    />
                </div>
                
                {/* email */}
                <div className='my-2'>
                    <label htmlFor="" className='flex items-center'><span>Email</span><span className='px-2'><FaStarOfLife className='text-[0.5rem]'/></span></label>
                    <input 
                        className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
                        placeholder='Email'
                        name='email'
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                            setFormDetails({...formDetails,[e.target.name]:e.target.value})
                        }}
                        type="email" 
                    />
                </div>
                
                {/* Role dropdown */}
                <div className='my-2'>
                    <label htmlFor="" className='flex items-center'><span>Role</span></label>
                    <select
                        className='h-[40px] rounded-sm border-1 border-gray-500 w-full pl-2 my-2 outline-none'
                        name='role'
                        value={formDetails.role}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>)=> {
                            setFormDetails({...formDetails,[e.target.name]:e.target.value})
                        }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
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
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                                setFormDetails({...formDetails,[e.target.name]:e.target.value})
                            }}
                            type={showPassword.password ? "text" : "password"} 
                        />
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
                            className='cursor-pointer bg-black text-white px-[4px] py-[2px] rounded-lg absolute top-[30%] lg:left-[92%] md:left-[90%] left-[85%]'
                        >
                            {showPassword.confirmPassword ? "hide" : "show"}
                        </span>
                        <input 
                            className='h-[40px] rounded-sm  border-1 border-gray-500 w-full pl-2 my-2 outline-none'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=> {
                                setConfirmPassword(e.target.value)
                            }}
                            type={showPassword.confirmPassword ? "text" : "password"} 
                        />
                    </aside>
                </div>

                <div className='flex justify-end'>
                    <button type='submit'
                        disabled = {mutation.isPending ? true : false}
                        className='font-medium text-white bg-primary rounded-full px-4 py-[5px] flex items-center justify-center cursor-pointer'
                    >
                        {mutation.isPending ? <Loader/> : "Register"}
                    </button>
                </div>
            </form>
        </section>
    </div>
)
}

export default page