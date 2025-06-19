"use client"
import React, { useState } from 'react'
import { IoIosWallet } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { MdHistory } from "react-icons/md";
import { FaEye } from "react-icons/fa";


const actionClass = " md:py-4 py-2  md:px-4 px-2 flex flex-col items-center justify-between  mdlg:text-md md:text-[0.7] text-[0.6rem] hover:bg-primary rounded-md hover:text-white"
const statsClass = " w-[48%] mdlg:h-[100px] lg:h-[120px] h-[100px] mdlg:py-4 py-4  py-2 lg:text-lg mdlg:text-md text-[0.9rem] lg:px-4 px-2 flex flex-col rounded-lg justify-between "
const page = () => {

  const [investMent,setInvestment] = useState<boolean>(false)
  return (
    <div className=' lg:w-[80%] w-[100%] '>
        <div className='lg:w-[50%] w-[95%] flex flex-col items-center mt-16 gap-y-8   mx-auto lg:mx-0'>
   <h1 className='text-2xl text center'>Welcome chris</h1>
{/* BALANCE SHOW */}
   <section className='flex justify-between items-center lg:w-[20%] w-[25%] text-2xl '>
    <aside className='flex gap-x-[3px] items-center text-primary'><span><IoIosWallet/></span> <span>$0</span></aside>
    <button><FaEye/></button>
   </section>

{/* INVESTMENT STATS */}

<section className='flex flex-wrap  justify-between  lg:w-[80%] w-[90%] px-2 gap-y-8'>
  {/* Investment Earning */}
  <div className={`${statsClass}  bg-blue-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Investment Earning</span>
    <span className='text-blue-600 text-lg'>+$0</span>
  </div>

  {/* Bonuses */}
    <div className={`${statsClass}   bg-orange-200`}>
    <span className='mdlg:text-md text-[0.8rem]'> Bonuses</span>
    <span className='text-orange-600 text-lg'>+$0</span>
  </div>
  {/* Total Deposit */}
    <div className={`${statsClass}  bg-green-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Total Deposits</span>
    <span  className='text-green-600 text-lg'>+$0</span>
  </div>
  {/* Total withdrawals */}
    <div className={`${statsClass}  bg-red-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Total Withdrawals</span>
    <span className='text-red-600 text-lg'>+$0</span>
  </div>
</section>

        
        {/* options */}
        <div className='flex justify-between  lg:w-[80%] w-[90%]  '>
{/* Deposit */}
          <div className={`${actionClass}`}>
           <span> <IoIosWallet className='text-xl'/></span>
           <span>Deposit</span>
          </div>
{/* Withdrawals */}
          <div className={`${actionClass}`}>
           <span> <IoCardOutline className='text-xl'/></span>
           <span>Withdrawals</span>
          </div>
{/* Investment Plans */}
          <div className={`${actionClass}`}>
           <span> <ImStatsBars2 className='text-xl'/></span>
           <span className='text-center '>Investments Plans</span>
          </div>
{/* History */}
          <div className={`${actionClass}`}>
           <span> <MdHistory className='text-xl'/></span>
           <span>History</span>
          </div>


        </div>

{/* ACTIVE EARNINGS  */}
<div className='flex flex-col  lg:w-[80%] w-[90%]'>
  <h1 className='font-semibold pl-2'>Active Earnings</h1>
  <section className='my-4'>
    {/* buttons */}
    <aside className='flex gap-x-6 '>
      <button className={`px-8 bg-gray-200 h-[50px] rounded-full ${investMent ? "bg-primary":"" }`} onClick={()=> setInvestment(true)}>Investments</button>
      <button className={`px-8 bg-gray-200 h-[50px] rounded-full ${!investMent ? "bg-primary":"" }`} onClick={()=> setInvestment(false)}>Bonus</button>
    </aside>
  </section>
</div>



</div>
        </div>
  )
}

export default page