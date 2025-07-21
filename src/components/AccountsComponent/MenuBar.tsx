"use client"
import React, { useEffect, useRef } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaUserLarge } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, RootState } from '@/store';
import gsap from 'gsap';
import { closeMenu } from '@/store/slices/menubarSlice';
import { useRouter } from 'next/navigation';
import { PiHandDepositThin } from "react-icons/pi";
import { MdAddCard } from "react-icons/md";
import { PiHandWithdrawThin } from "react-icons/pi";
import { MdHistory } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const buttonClass = "flex items-center py-4 gap-x-4 hover:text-primary font-medium transition-all duration-300 hover:pl-2"
const iconClass = "text-[1.2rem]"
export const MenuBar = () => {
    const menuRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch<appDispatch>()
      const userState = useSelector((store:RootState)=>{
    return store.userReducer
      })

    const router =useRouter()
const menuState = useSelector((state:RootState)=>{
    return state.menuBar
})
 
    //   const userState = useSelector((store:RootState)=>{
  
    //       return store.userReducer
    //   })


      const totalBalance:number = userState.investment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0) + userState.bonus.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) + userState.deposit.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) - userState.withdrawal.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0)

useEffect(()=>{
    if (!menuRef.current) {
        
    }
if (menuState) {
    gsap.to(menuRef.current,{
        left:0,
        duration:0.5,
        opacity:1
    })
}
else{
    gsap.to(menuRef.current,{
        left:"-200%",
        duration:1,
        opacity:0
    })
}


},[menuState])


  return (
    <div ref={menuRef} className='fixed top-0 left-[0%] h-full bg-white w-[70%]  pt-16 px-4 opacity-0 '>
        {/* arrow */}
        <div className='flex items-end justify-end mb-6'>
            <button 
            onClick={()=> dispatch(closeMenu()) }
            className='bg-grayUtil rounded-lg px-[4px] py-[2px]'><IoIosArrowRoundBack className='text-[1.5rem]' /></button>
        </div>
        {/* Profile */}
        <div className='flex flex-col items-center gap-y-2'>
<span className='bg-grayUtil p-6 rounded-full'><FaUserLarge className='text-[1.5rem]'/></span>
<span className='text-[0.87rem] capitalize'>{userState.username}</span>
<button className='w-[90%] bg-primary py-[10px] rounded-full text-[1rem]'>${totalBalance}</button>
        </div>

{/* dashboard and investments sections */}
<div>
{/* Dashboard */}
<button className={buttonClass} 
onClick={()=> {
    router.push("/accounts/dashboard")
    dispatch(closeMenu())
}
}
>
    <span><IoHomeOutline className={iconClass}/></span>
    <span>Dashboard</span>
</button>
{/* Investments */}
    
<button className={buttonClass}
onClick={()=> {

    router.push("/accounts/trades")
    dispatch(closeMenu())

}}

>
    <span><MdAddCard className={iconClass}/></span>
    <span>Invest</span>
</button>
</div>


{/* other section */}
<div className='my-4'>
    {/* deposits */}
    <button className={buttonClass}
    onClick={()=> 
    {
        router.push("/accounts/deposit-method")
        dispatch(closeMenu())
    }    
    
    }
    >
    <span><PiHandDepositThin className={iconClass}/></span>
    <span>Deposit</span>
</button>
    {/* withdrawals */}
    <button className={buttonClass}
    onClick={()=> 
    {

        router.push("/accounts/withdraw")
        dispatch(closeMenu())
    }
    }
    >
    <span><PiHandWithdrawThin className={iconClass}/></span>
    <span>withdrawals</span>
</button>
    {/* Transaction History */}
    <button className={buttonClass}
    onClick={()=> {
        router.push("/accounts/history")
        dispatch(closeMenu())
    }
}
    >
    <span><MdHistory className={iconClass}/></span>
    <span>Transaction History</span>
</button>
    {/* All Investments */}
    <button className={buttonClass}
    onClick={()=>
    {
        router.push("/accounts/investment-history")
        dispatch(closeMenu())

    }
    }
    >
    <span><LuWallet className={iconClass}/></span>
    <span>All Investments</span>
</button>
    {/* Settings */}
    <button className={buttonClass}
    onClick={()=> 
    {

        router.push("/accounts/settings")
        dispatch(closeMenu())
    }
    }
    >
    <span><CiSettings className={iconClass}/></span>
    <span>Settings</span>
</button>
</div>

{/* logout */}

<div>
        <button
        onClick={()=> {
            localStorage.clear()
           router.push("/")
        }}
        className={buttonClass}>
    <span><CiLogout className={iconClass}/></span>
    <span> logout</span>
</button>
</div>
    </div>
  )
}
