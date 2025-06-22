"use client"
import { appDispatch, RootState } from '@/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@/store/slices/modalSlice'

const Modal = () => {
    const dispatch = useDispatch<appDispatch>()
    const modalState = useSelector((state:RootState)=>{
       return state.modalReducer
    })

        
  return (
    <>
   {
    modalState.showModal && (
         <div className='flex items-center justify-center  fixed w-screen h-screen  z-2 bg-[#716d6d5a]'>

        <section className='lg:w-[25%] md:w-[30%]  w-[90%] bg-white py-8 px-4 rounded-lg '>
<p className='my-2'>{modalState.message}</p>
<button
className='bg-primary text-white w-full  rounded-md py-2'
onClick={()=> dispatch(closeModal())} >Ok</button>
        </section>
    </div>
    )
   }
    </>
  )
}

export default Modal