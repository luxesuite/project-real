"use client"
import BonusComponent from '@/components/AdminComponent/BonusComponent'
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateBonus } from '@/store/admin-slices/allBonusesSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {
      const [errorState, setErrorState] = useState({
        message:"",
        status:false
      });
    
const dispatch = useDispatch<appDispatch>()

  const allBonuses = useSelector((store:RootState)=>{
    return store.allBonusesReducer
  })
const fetchBonuses = async()=>{
const res = await fetch("/api/admin/bonus")
if (!res.ok) {
alert("Something went wrong, couldnt get users")
return
}

const response = await res.json()
// console.log(response);
if (response.success) {
    
    dispatch(updateBonus(response.data))
}
else{
    setErrorState({status:true,message:response.message})
}
return
    }

    useEffect(()=>{
        if (allBonuses) {
            return
        }
fetchBonuses()
    },[])


  if (errorState.status) {
    return <div>
        <p className='text-center'>
        {errorState.message ? errorState.message : "something went wrong"}
        </p>
        {/* <button onClick={}>please reload</button> */}
    </div>
}

  if (allBonuses == null ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
  }

  return (
    <>
    {allBonuses && <BonusComponent allBonuses={allBonuses}/>}
    </>
  )
}

export default page