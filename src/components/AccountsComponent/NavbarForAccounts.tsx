"use client"
import { appDispatch } from '@/store';
import { openMenu } from '@/store/slices/menubarSlice';
import React from 'react'
import { IoMenuOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { useDispatch } from 'react-redux';
const NavbarForAccounts = () => {
  const dispatch = useDispatch<appDispatch>()
  return (
    <div className='flex justify-between mt-10 lg:px-8 px-2  mb-6'>

<button
  onClick={()=> dispatch(openMenu()) }
><IoMenuOutline className='text-[2rem] lg:hidden'/></button>

<aside className='flex items-center lg:w-[10%] md:w-[15%] w-[30%] justify-between'>
    <span className='text-[1.1rem] bg-grayUtil rounded-full px-4 py-2 '>Kris</span>
    <button className='relative px-2'>
<IoNotifications className='text-[2rem] text-grayUtil' />
<span className='absolute top-0 left-[70%] text-primary font-semibold'>0</span>
    </button>
</aside>

    </div>
  )
}

export default NavbarForAccounts