"use client"
import { appDispatch, RootState } from '@/store';
import { openNotificationsModal } from '@/store/admin-slices/notificationModelSlice';
import { openMenu } from '@/store/slices/menubarSlice';
import React, { useEffect } from 'react'
import { IoMenuOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
const NavbarForAccounts = () => {
  const dispatch = useDispatch<appDispatch>()
     const userState = useSelector((store:RootState)=>{
  
          return store.userReducer
      })



  return (
    <div className='flex justify-between mt-10 lg:px-8 px-2  mb-6'>

<button
  onClick={()=> dispatch(openMenu()) }
><IoMenuOutline className='text-[2rem] lg:hidden'/></button>

<aside className='flex items-center lg:min-w-[10%] md:min-w-[15%] min-w-[30%] justify-between'>
    <span className='lg:text-[1.1rem] text-[1rem] bg-grayUtil rounded-full px-4 py-2 capitalize'>{userState?.userDetails?.username}</span>
    <button 
    onClick={()=> dispatch(openNotificationsModal())}
    className='relative px-2 cursor-pointer'>
<IoNotifications className='text-[2rem] text-grayUtil' />
<span className='absolute top-0 left-[70%] text-primary font-semibold'>{[...userState.investment,...userState.bonus,...userState.deposit,...userState.withdrawal,...userState.notification].length}</span>
    </button>
</aside>

    </div>
  )
}

export default NavbarForAccounts