"use client"
import { appDispatch, RootState } from '@/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import { closeNotificationsModal } from '@/store/admin-slices/notificationModelSlice';
import { dateSort } from '../../../utils/dateSort';


const btn = ["all","investment","deposit","bonus","withdrawal"]
const NotificationsModal = () => {
    const dispatch = useDispatch<appDispatch>()
    const [currentBtn,setCurrentBtn] = useState<string>("deposit")
    const notificationState = useSelector((store:RootState)=>{

        return store.notificationsModalReducer
    })
    const userState = useSelector((store:RootState)=>{

        return store.userReducer
    })



    useEffect(()=>{

console.log([...userState.deposit,...userState.bonus,...userState.bonus,...userState.notification]);
    },[])
    
  return (

<>
{notificationState && <>

    <div className='w-screen h-full fixed top-0 flex items-center justify-center bg-[#6d6c6c5a]'>
 <section className='bg-white lg:w-[50%] h-[60%] rounded-md p-4 overflow-y-scroll'>
    {/* Cancel btn */}
    <aside className='flex justify-end '>
        <button 
        onClick={()=> dispatch(closeNotificationsModal())}
        className='bg-red-200 rounded-lg py-2 px-4 cursor-pointer'><IoClose className='text-red-500 text-lg' /></button>
    </aside>
    {/* header */}
    <h1 className='text-lg font-semibold'>Notifications</h1>
<header className='flex flex-wrap gap-y-4 gap-x-3 my-2'>
    {btn.map((item,index)=>{

        return <button
        onClick={()=> setCurrentBtn(item)}
        className={`cursor-pointer  py-2 px-4 rounded-md capitalize ${currentBtn === item ?"bg-primary":"bg-gray-200"}`} key={index}>
{item}
        </button>
    })}
</header>
 {/* Message */}
 <article className='py-4'>

    {currentBtn == "all" && [...userState.deposit,...userState.withdrawal,...userState.bonus,...userState.notification,...userState.investment].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item,index)=>{
if (item.action == "deposit"){
   return <div key={index} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{item.action}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, a deposit of ${item.amount} has been funded to your account
     </div>
    </div>
}
else if(item.action == "bonus"){
 return <div key={index} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{item.action}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Congratulations,a bonus of ${item.amount} has been funded to your account
     </div>
    </div>

}
// NOTIFICATION
else if (item.action == "notification") {
   return <div key={index} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{item.notificationType}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        {item.details}
     </div>
    </div>
}
// Investment
else if (item.action == "investment") {
    return <div key={item._id} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{item.action}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Congratulations {item.username}, your ${item.amount} {item.plan} investment gave a profit of ${item.confirmed == "yes" ? item.profitReturn : "0"}
     </div>
    </div>
}
// WITHDRAWAL
else if (item.action == "withdrawal") {
     return <div key={index} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{item.action}</span>
        </header>
     {item.confirmed == "yes" ? <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Your withdrawal request of ${item.amount} has been successsfully reviewed and confirmed
     </div> : <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Your withdrawal request of ${item.amount} has been created and under review
     </div>}
    </div>
}

    }
    )}

  {/* Deposit */}
    {currentBtn == "deposit" && userState[currentBtn] && userState[currentBtn].length > 0 && dateSort(userState[currentBtn]).map((item:any,index:number)=>{
        return <div key={item._id} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{currentBtn}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, a deposit of ${item.amount} has been funded to your account
     </div>
    </div>
    })}
    {/* Investment */}
 {currentBtn == "investment" && userState[currentBtn] && userState[currentBtn].length > 0 && dateSort(userState[currentBtn]).map((item:any,index:number)=>{
        return <div key={item._id} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{currentBtn}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Congratulations {item.username}, your ${item.amount} {item.plan} investment gave a profit of ${item.confirmed == "yes" ? item.profitReturn : "0"}
     </div>
    </div>
    })}
    {/* Bonus */}
 {currentBtn == "bonus" && userState[currentBtn] && userState[currentBtn].length > 0 && dateSort(userState[currentBtn]).map((item:any,index:number)=>{
        return <div key={item._id} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{currentBtn}</span>
        </header>
     <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Congratulations,a bonus of ${item.amount} has been funded to your account
     </div>
    </div>
    })}
    {/* Withdrawal */}
 {currentBtn == "withdrawal" && userState[currentBtn] && userState[currentBtn].length > 0 && dateSort(userState[currentBtn]).map((item:any,index:number)=>{
        return <div key={item._id} className='border-1 border-[#6d6c6c5a] rounded-lg px-4 py-2 my-2'>
        <header className='flex justify-between items-center'>
            <span>{item.date.split(",")[0]}</span>
            <span className='text-primary'>{currentBtn}</span>
        </header>
     {item.confirmed == "yes" ? <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Your withdrawal request of ${item.amount} has been successsfully reviewed and confirmed
     </div> : <div className='bg-lightPrimary rounded-md  my-4 p-2 '>
        Hello {item.username}, Your withdrawal request of ${item.amount} has been created and under review
     </div>}
    </div>
    })}

   
</article>
 </section>




    </div>

{/* {notificationState && (

)} */}
</>}
</>
  )
}

export default NotificationsModal