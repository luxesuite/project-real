"use client"
import DepositComponent from '@/components/AdminComponent/DepositComponent';
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';

import { updateDeposit } from '@/store/admin-slices/allDepositsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
      const [errorState, setErrorState] = useState({
        message:"",
        status:false
      });
    
const dispatch = useDispatch<appDispatch>()

  const allDeposits = useSelector((store:RootState)=>{
    return store.allDepositsReducer
  })
const fetchDeposits = async()=>{
const res = await fetch("/api/admin/deposit")
if (!res.ok) {
alert("Something went wrong, couldnt get deposits")
return
}

const response = await res.json()
// console.log(response);
if (response.success) {
    
    dispatch(updateDeposit(response.data))
}
else{
    setErrorState({status:true,message:response.message})
}
return
    }

    useEffect(()=>{
        if (allDeposits) {
            return
        }
fetchDeposits()
    },[])


  if (errorState.status) {
    return <div>
        <p className='text-center'>
        {errorState.message ? errorState.message : "something went wrong"}
        </p>
        {/* <button onClick={}>please reload</button> */}
    </div>
}

  if (allDeposits == null ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
  }

  return (
    <>
    {/* this , */}
    {allDeposits && <DepositComponent allDeposits={allDeposits}/>}
    </>
  )
}

export default page