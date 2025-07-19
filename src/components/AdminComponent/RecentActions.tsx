
"use client"
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


const fetchHistories = async ()=>{
    const res = await fetch(`/api/admin/history`)
    
    return res.json()
}
const RecentActions = () => {
        const {data,isLoading,isError,error} = useQuery({
        queryKey:["history"],
        queryFn:fetchHistories
    })


  return (
   
        <div className='px-2 lg:w-[20%]'>
          <div className='bg-lightPrimary px-4'>

          <header className='border-b-1 py-2'>Recent Actions</header>
          <h1 className='text-[1.08rem]'>My Actions</h1>
          <article >

{isError && (
    <div className='my-2'>
        An error occured
    </div>
)}
{isLoading && (
    <div className='my-2'>
       loading recent Actions....
    </div>
)}
          { data && (
            data.data.map((item:any,index:number)=>{
                return <section key={index}>
            <aside className='py-2'>
              <p className='flex items-center'>
                {item.actionPerformed == "add" ? <FaPlus className='text-green-700' /> : item.actionPerformed == "delete" ? <MdCancel className='text-red-700' />  : <FaPen className='text-orange-700' />}
                   <span className='px-2'>{item.username}</span> <span className='uppercase'>{item.action}</span></p>
              <div className='uppercase' >{item.action}</div>
               </aside>  
          </section>
            })
        )
    }
    </article>
          </div>
        </div>
  )
}

export default RecentActions