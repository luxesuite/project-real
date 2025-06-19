"use client"
import React, { useState } from 'react'
interface investMentPlansType<S,N>{
    id:N,
    packageName:S,
    minDeposit:N,
    profitReturns:N,
    maxDeposit:N,
    profitDuration:S
}

const investmentPlans: investMentPlansType<string,number>[] = [
    {
        id:1,
        packageName:"Starter",
        minDeposit:30,
        profitReturns:20,
        maxDeposit:500,
        profitDuration:"24 hours"
    },
    {
        id:2,
        packageName:"Gold",
        minDeposit:30,
        profitReturns:20,
        maxDeposit:500,
        profitDuration:"24 hours"
    },
    {
        id:3,
        packageName:"Professional",
        minDeposit:30,
        profitReturns:20,
        maxDeposit:500,
        profitDuration:"24 hours"
    },
    {
        id:4,
        packageName:"Promotion",
        minDeposit:30,
        profitReturns:20,
        maxDeposit:500,
        profitDuration:"24 hours"
    },
    {
        id:5,
        packageName:"Diamond",
        minDeposit:30,
        profitReturns:20,
        maxDeposit:500,
        profitDuration:"24 hours"
    },
]

const page = () => {
    const [active,setActive ] = useState("")

  return (
    <div>
        <div className='lg:w-[70%] bg-gray-100 pt-16 pb-4 lg:px-4 px-4 '>

        <h1 className='md:px-4   font-semibold my-4'>Choose Investment Plans</h1>



    <section className='flex flex-wrap justify-between  gap-y-5  '>

    {
        investmentPlans.map((item,index)=>{
            
            return <div key={index} 
            className={`lg:w-[30%] cursor-pointer w-[45%] flex flex-col gap-y-4 rounded-lg border-gray-300  border-[1px] p-2 mdlg:text-[0.8rem] text-[0.7rem] ${active === item.packageName ? "border-primary" : "border-gray-300"}`}
            onClick={()=> setActive(item.packageName)}
            >
    <div className={`py-[4px] pl-2 bg-primary rounded-lg w-full ${active === item.packageName ? "bg-primary" : "bg-white"}`}>{item.packageName}</div>
    <div> <span>Profit Returns</span> : <span>${item.profitReturns}</span> </div>
    <div> <span>Minimum Deposit</span> : <span>${item.minDeposit}</span> </div>
    <div> <span>Max Deposit</span> : <span>${item.maxDeposit}</span> </div>
    <div> <span>Profit Duration</span> : <span>{item.profitDuration}</span> </div>
    

    </div>
    })
}
    </section>

    <button className='w-full bg-primary py-2 rounded-lg mt-6'>Pay Investment</button>
</div>



    </div>
  )
}

export default page