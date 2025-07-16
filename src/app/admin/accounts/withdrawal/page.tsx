"use client"
import WithdrawalComponent from '@/components/AdminComponent/WithdrawalComponent';
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateWithdrawal } from '@/store/admin-slices/allWithdrawalsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
      const [errorState, setErrorState] = useState({
        message:"",
        status:false
      });
    
const dispatch = useDispatch<appDispatch>()

  const allWithdrawals = useSelector((store:RootState)=>{
    return store.allWithdrawalsReducer
  })
const fetchWithdrawals = async()=>{
const res = await fetch("/api/admin/withdrawal")
if (!res.ok) {
alert("Something went wrong, couldnt get withdrawals")
return
}

const response = await res.json()
// console.log(response);
if (response.success) {
    
    dispatch(updateWithdrawal(response.data))
}
else{
    setErrorState({status:true,message:response.message})
}
return
    }

    useEffect(()=>{
        if (allWithdrawals) {
            return
        }
fetchWithdrawals()
    },[])


  if (errorState.status) {
    return <div>
        <p className='text-center'>
        {errorState.message ? errorState.message : "something went wrong"}
        </p>
        {/* <button onClick={}>please reload</button> */}
    </div>
}

  if (allWithdrawals == null ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
  }

  return (
    <>
    {/* this , */}
    {allWithdrawals && <WithdrawalComponent allWithdrawals={allWithdrawals}/>}
    </>
  )
}

export default page