"use client"
import { appDispatch, RootState } from '@/store';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import React, { FormEvent, useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import BtnLoader from '../../../../utils/BtnLoader';
interface passwordViewType<B>{
    newPassword:B,
    confirmPassword:B
}

const postData = async(formState:any)=>{
    const res = await fetch(`/api/change-password/${formState.username}`,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formState)
    })
    if (!res.ok) {
        // alert("an error occured")
        return {
            data:null,
            message:"an error occured",
            success:false
        }
    }
    
    const response = await res.json()
return response
    
}

const page = () => {
    const [accountActive,setAccountActive] = useState<boolean>(true)
    const [passwordView,setPasswordView] = useState<passwordViewType<boolean>>({
        newPassword:false,
        confirmPassword:false
    })
    const mutation = useMutation({
        mutationFn:postData,
        onSuccess:(data)=>{
            // console.log(data);
            // if (data.success) {
                
            //     return
            // }
            if (data.message) {
                dispatch(openModal(data.message))
            }
            
        },
        onError:(error)=>{
            console.log(error);
            dispatch(openModal(error.message))
            
        }
    })
const dispatch = useDispatch<appDispatch>()
    const [formState,setFormState] = useState({
        newPassword:"",
        confirmedPassword:"",
        username:""
    })
    const userState = useSelector((store:RootState)=>{
  
          return store.userReducer
      })


      useEffect(()=>{
        if (formState.username) {
            return
        }
setFormState({...formState,username:userState.userDetails.username})

      },[formState])


      const handleSubmit = async(e:React.SyntheticEvent)=>{
e.preventDefault()

if (formState.newPassword != formState.confirmedPassword) {
    dispatch(openModal("Password doesn't match"))
    return
}

mutation.mutate(formState)

      }
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
        <h1 className='font-medium capitalize'>{userState.userDetails.username}</h1>
    </section>

    <form action="" className='my-4'>
        {/* Name */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Full Name</label>
            <input 
            readOnly
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg capitalize'
            // value={"Kris"}
            defaultValue={userState.userDetails.name}
            type="text " />
        </div>
        {/* Email */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Email</label>
            <input 
            readOnly
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg capitalize'
            defaultValue={userState.userDetails.email}
            type="text" />
        </div>
        {/* Username */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">Username</label>
            <input 
            readOnly
            defaultValue={userState.userDetails.username}
            className='border-1 border-gray-100 px-2 outline-none py-3 rounded-lg capitalize'
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


    <form action="" onSubmit={handleSubmit} className='my-4'>
        {/* New Password */}
        <div className='flex flex-col gap-2 my-2'>
            <label htmlFor="">New Password</label>
            <aside className='flex relative'>
            <input 
            className='border-1 h-full w-full  border-gray-100 px-2 outline-none py-3 rounded-lg '
            placeholder='enter password'
onChange={e => setFormState({...formState, newPassword:e.target.value})}
            value={formState.newPassword}
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
            value={formState.confirmedPassword}
            onChange={e => setFormState({...formState, confirmedPassword:e.target.value})}
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
        <button className='bg-primary px-4 py-2 text-white rounded-lg'>{mutation.isPending ? <BtnLoader/> : "Update Password"}</button>
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