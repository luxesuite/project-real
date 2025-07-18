"use client"
import { appDispatch, RootState } from '@/store'
import { openModal } from '@/store/slices/modalSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
// const [amount,setAmount] = useState<any>()
const [loading,setLoading] = useState(false)
const dispatch = useDispatch<appDispatch>()
  const [formData, setFormData] = useState({
    username: '',
    amount: "",
    name:"",
    confirmed:"no",
    date:new Date().toLocaleString()
  });
    const [errorState, setErrorState] = useState({
      message:"",
      status:false
    });

      const userState = useSelector((store:RootState)=>{
    return store.userReducer
      })

  const totalBalance:number = userState.investment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0) + userState.bonus.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) + userState.deposit.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0)
  
const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // console.log(formData);
    // return
    
    if (loading) {
        return
    }
    if (!formData.username || !formData.amount) {
     dispatch(openModal("Empty field"))
      return;
    }
    // console.log('Form submitted:', formState);
    // used admin api route for withdrawal for client
    try {
        setLoading(true)
        const res = await fetch("/api/admin/withdrawal",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        })
        if (!res.ok) {
            dispatch(openModal("something went wrong please try again later"))
            setLoading(false)
            return
        }
        const response = await res.json()
        
        if (!response.success) {
            
            dispatch(openModal(response.message))
            setLoading(false)
            
            return
        }
        
        
        
        if (response.success) {
          
          setLoading(false)
          dispatch(openModal("you withdrawal request has been submitted"))
          return
        }
        else{
          
          setLoading(false)
          dispatch(openModal(response.message))
          return
        }
} catch (error) {
    
    dispatch(openModal("sorry,something went wrong"))
    setLoading(false)
    }
  
  };
//   useEffect(()=>{
// setFormData({
//   ...formData,
//    username: userState.userDetails.username,
//     name:userState.userDetails.name,
//     confirmed:"no",
//     date:new Date().toLocaleString()
// })

//   },[formData])




  return (
    <div className=' lg:w-[80%] w-[100%] '>
    
             <div className='lg:w-[50%] w-[95%] mt-16 gap-y-8   mx-auto lg:mx-0 px-6'>
    {/* Header */}
    <section className=''>
        <h1 className='font-semibold text-lg'>Payment Method</h1>
      <p>Withdrawal securely your preferred crypto to your wallet</p>
    </section>
    
    {/* How to Invest */}
    <form className='my-6 bg-gray-100 py-4 px-2' onSubmit={handleSubmit}>
<div className='flex flex-col gap-y-4'>
    <label htmlFor="">Amount(USD):</label>
    <input 
    placeholder='Enter amount'
    onChange={(e)=> {
      

      setFormData({
  ...formData,
   username: userState.userDetails.username,
    name:userState.userDetails.name,
    confirmed:"no",
    amount:e.target.value,
    date:new Date().toLocaleString()
})
    //  setFormData({...formData,})

    }}
value={formData.amount}
    className='bg-gray-200 h-12  w-full rounded-lg px-4 active:border-1 active:border-primary outline-none'
    type="number" />
</div>
<p className='text-end my-2 font-semibold text-primary'>Current balance: <span>${totalBalance}</span></p>
<button className='text-center w-full border-primary border-1 hover:bg-primary py-3 rounded-full mt-4'>{loading ? "withdrawing..." : "Make Withdrawal"}</button>
    </form>
    
                
             </div>
         </div>
  )
}

export default page