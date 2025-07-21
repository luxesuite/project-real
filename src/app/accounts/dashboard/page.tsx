"use client"
import React, { useEffect, useState } from 'react'
import { IoIosWallet } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { MdHistory } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, RootState } from '@/store';
import { addUserInfo } from '@/store/slices/userSlice';
import { FaCheckCircle } from "react-icons/fa";
import { BsExclamationCircleFill } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const actionClass = " md:py-4 py-2  md:px-4 px-2 flex flex-col items-center justify-between  mdlg:text-md md:text-[0.7] text-[0.6rem] hover:bg-primary rounded-md hover:text-white"
const statsClass = " w-[48%] mdlg:h-[100px] lg:h-[120px] h-[100px] mdlg:py-4 py-4  py-2 lg:text-lg mdlg:text-md text-[0.9rem] lg:px-4 px-2 flex flex-col rounded-lg justify-between "
const page = () => {
const [hideBalance,setHideBalance] = useState<boolean>(false)
  const [investMent,setInvestment] = useState<boolean>(false)
const router = useRouter()
   const dispatch = useDispatch<appDispatch>()
      const userState = useSelector((store:RootState)=>{
  
          return store.userReducer
      })


      const totalBalance:number = userState.investment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0) + userState.bonus.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) + userState.deposit.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) - userState.withdrawal.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0)
  useEffect(()=>{
// console.log(user);
// const getDetail = JSON.parse(localStorage.getItem("user") as string)
// console.log(getDetail);

// if (!user.email) {
//   dispatch(addUserInfo({username:getDetail.username,email:getDetail.email}))
// }
console.log(userState.investment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0));

  },[])
  return (
    <div className=' lg:w-[80%] w-[100%] '>
        <div className='lg:w-[50%] w-[95%] flex flex-col items-center mt-16 gap-y-8   mx-auto lg:mx-0'>
   <h1 className='text-2xl text center capitalize'>Welcome {userState.userDetails.username}</h1>
{/* BALANCE SHOW */}
   <section className='flex justify-between items-center lg:w-[20%] w-[25%] text-2xl '>
    <aside className='flex gap-x-2 items-center text-primary'><span><IoIosWallet/></span> {hideBalance ? "*****" : <span className='font-semibold'>${totalBalance}</span>}</aside>
    <button 
    className='mx-2'
    onClick={()=> setHideBalance(prev => !prev)}>{hideBalance ? <FaEyeSlash/> :  <FaEye/>}</button>
   </section>

{/* INVESTMENT STATS */}

<section className='flex flex-wrap  justify-between  lg:w-[80%] w-[90%] px-2 gap-y-8'>
  {/* Investment Earning */}
  <div className={`${statsClass}  bg-blue-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Investment Earning</span>
    <span className='text-blue-600 text-lg'>+${userState.investment.length > 0 ? userState.investment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0):"0"}</span>
  </div>

  {/* Bonuses */}
    <div className={`${statsClass}   bg-orange-200`}>
    <span className='mdlg:text-md text-[0.8rem]'> Bonuses</span>
    <span className='text-orange-600 text-lg'>+${userState.bonus.length > 0 ? userState.bonus.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0):"0"}</span>
  </div>
  {/* Total Deposit */}
    <div className={`${statsClass}  bg-green-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Total Deposits</span>
    <span  className='text-green-600 text-lg'>+${userState.deposit.length > 0 ? userState.deposit.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0):"0"}</span>
  </div>
  {/* Total withdrawals */}
    <div className={`${statsClass}  bg-red-200`}>
    <span className='mdlg:text-md text-[0.8rem]'>Total Withdrawals</span>
    <span className='text-red-600 text-lg'>-${userState.withdrawal.length > 0 ? userState.withdrawal.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0):"0"}</span>
  </div>
</section>

        
        {/* options */}
        <div className='flex justify-between  lg:w-[80%] w-[90%]  '>
{/* Deposit */}
          <div
          onClick={()=> router.push("/accounts/deposit-method")}
          className={`${actionClass}`}>
           <span> <IoIosWallet className='text-xl'/></span>
           <span>Deposit</span>
          </div>
{/* Withdrawals */}
          <div className={`${actionClass}`}
            onClick={()=> router.push("/accounts/withdraw")}
          
          >
           <span> <IoCardOutline className='text-xl'/></span>
           <span>Withdrawals</span>
          </div>
{/* Investment Plans */}
          <div className={`${actionClass}`}
           onClick={()=> router.push("/accounts/trades")}
          >
           <span> <ImStatsBars2 className='text-xl'/></span>
           <span className='text-center '>Investments Plans</span>
          </div>
{/* History */}
          <div className={`${actionClass}`}
           onClick={()=> router.push("/accounts/investment-history")}
          >
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
    <div className='py-2 w-full'>
{/* Investment Active */}
      {investMent && <>
      {userState.investment.length < 1 &&  <article className='text-red-600'>
  <p className='flex gap-x-2 items-center'><span><AiOutlineExclamationCircle/></span>  <span >No Investments made</span></p>
  </article>}
             {userState.investment.length > 0 &&  userState.investment.map((item:any,index:number)=>{
                         return <div key={index} className='flex justify-between items-center bg-gray-300 p-4 rounded-lg my-3'>
                          <span>{item.plan}</span>
                             <span>{item.date.split(",")[0]}</span>
                             <span>${item.amount}</span>
                             <span className='text-green-800'>${item.profitReturn}</span>
                             <span>{item.confirmed == "yes" ? < FaCheckCircle className='text-green-500'/> : <BsExclamationCircleFill className='text-orange-400'/>}</span>
                         </div>
                     })}
      </>}
 
{/* Bonus Active */}

{!investMent &&    <>
        {userState.bonus.length < 1 && <p>No Transaction History</p>}
        {userState.bonus.length > 0 &&  userState.bonus.map((item:any,index:number)=>{
            return <div key={index} className='flex justify-between items-center bg-gray-300 p-4 rounded-lg my-3'>
                <span>{item.date.split(",")[0]}</span>
                <span>${item.amount}</span>
                <span>< FaCheckCircle className='text-green-500'/></span>
            </div>
        })}
        </>}


    </div>

</div>

        </div>
  )
}

export default page