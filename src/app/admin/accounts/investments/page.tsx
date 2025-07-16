"use client"
import InvestmentLists from '@/components/AdminComponent/InvestmentComponent/InvestmentLists'
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateBonus } from '@/store/admin-slices/allBonusesSlice';
import { updateInvestments } from '@/store/admin-slices/InvestmentsSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

        const [errorState, setErrorState] = useState({
          message:"",
          status:false
        });
      
  const dispatch = useDispatch<appDispatch>()
  
    const allInvestments = useSelector((store:RootState)=>{
      return store.allInvestmentsReducer
    })
  const fetchBonuses = async()=>{
  const res = await fetch("/api/admin/investment")
  console.log();
  
  if (!res.ok) {
  alert("Something went wrong, couldnt get users")
  return
  }
  
  const response = await res.json()
  // console.log(response);
  if (response.success) {
      
      dispatch(updateInvestments(response.data))
  }
  else{
      setErrorState({status:true,message:response.message})
  }
  return
      }
  
      useEffect(()=>{
          if (allInvestments) {
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
  
    if (allInvestments == null ) {
      return <div className='flex items-center justify-center my-16 flex-col gap-2'>
          <Loader/>
          <h1>Loading</h1>
          </div>
    }


  return (
    <div>

      {/* {allInvestments && <InvestmentLists allInvestments={allInvestments}/>} */}
        {allInvestments &&  <InvestmentLists allInvestments={allInvestments}/>}
    </div>
  )
}

export default page