"use client"
import { appDispatch, RootState } from '@/store'
import { openModal } from '@/store/slices/modalSlice'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import BtnLoader from '../../../../../utils/BtnLoader'

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
    <div className='flex justify-center'>
      <>
    <div className='flex flex-col gap-y-6 my-4 w-full md:w-[80%] lg:w-[40%]'>
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
    </div>
  )
}

export default page