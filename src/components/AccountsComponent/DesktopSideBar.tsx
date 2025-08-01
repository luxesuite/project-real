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
import { PiHandWithdrawThin } from "react-icons/pi";
import { MdAddCard } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const buttonClass = "flex items-center py-4 gap-x-4 hover:text-primary font-medium transition-all duration-300 hover:pl-2"
const iconClass = "text-[1.2rem]"



const DesktopSideBar = () => {

    const router = useRouter()
  return (
  <div className='h-screen bg-white w-[20%]  pt-16 px-4 hidden lg:block border-l-[1px] border-slate-100 '>
        {/* arrow */}
      
        {/* Profile */}
    

{/* dashboard and investments sections */}
<div>
{/* Dashboard */}
<button className={buttonClass}
onClick={()=> router.push("/accounts/dashboard")}
>
    <span><IoHomeOutline className={iconClass}/></span>
    <span>Dashboard</span>
</button>
{/* Invest */}
    
<button className={buttonClass}
onClick={()=> router.push("/accounts/trades")}

>
    <span><MdAddCard className={iconClass}/></span>
    <span>Invest</span>
</button>
</div>


{/* other section */}
<div className='my-4'>
    {/* deposits */}
    <button className={buttonClass}
    onClick={()=> router.push("/accounts/deposit-method")}
    >
    <span>< PiHandDepositThin className={iconClass}/></span>
    <span>Deposit</span>
</button>
    {/* withdrawals */}
    <button className={buttonClass}
    onClick={()=> router.push("/accounts/withdraw")}
    >
    <span><PiHandWithdrawThin className={iconClass}/></span>
    <span>withdrawals</span>
</button>
    {/* Transaction History */}
    <button className={buttonClass}
    onClick={()=> router.push("/accounts/history")}
    >
    <span><MdHistory className={iconClass}/></span>
    <span>Transaction History</span>
</button>
    {/* All Investments */}
    <button className={buttonClass}
    onClick={()=> router.push("/accounts/investment-history")}
    >
    <span><LuWallet className={iconClass}/></span>
    <span>All Investments</span>
</button>
    {/* Settings */}
    <button className={buttonClass}
    onClick={()=> router.push("/accounts/settings")}
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

export default DesktopSideBar