import Link from 'next/link'
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const links = [
  {
  id:1,
  name:"Bonus",
  link:"/admin/accounts/bonus",
  add:"/admin/accounts/bonus/add"
},
  {
  id:1,
  name:"Deposits",
  link:"/admin/accounts/deposit",
  add:"/admin/accounts/deposit/add"
},
  {
  id:1,
  name:"Investments",
  link:"/admin/accounts/investments",
  add:"/admin/accounts/investments/add"
},
  {
  id:1,
  name:"Notifications",
  link:"/admin/accounts/notifications",
  add:"/admin/accounts/notifications/add"
},
  {
  id:5,
  name:"Profiles",
  link:"/admin/accounts/bonus",
  add:"/admin/accounts/bonus/add"
},
  {
  id:5,
  name:"Withdrawals",
  link:"/admin/accounts/withdrawal",
  add:"/admin/accounts/withdrawal/add"
},

]


const authLinks = [
  {
id:5,
  name:"Users",
  link:"/admin/auth/users",
  add:"/admin/auth/users/add"
}]
const page = () => {
  return (
    <div>
<header>
  <p className='text-lg my-4 px-2'>Site Administration</p>  
</header>
<article className='flex flex-col lg:flex-row lg:justify-between gap-y-4'>


<div className='lg:w-[70%]'>
{/* Accounts */}
<section className=' px-2'>
    <header className='bg-primary text-white py-2 px-2'>ACCOUNTS</header>
    <div className=''>
      {links.map((link,index)=>{
        
        return <aside key={index} className={`flex justify-between text-primary ${index % 2 == 0 ? "bg-lightPrimary" : ""} py-2 px-2`}>
          <Link href={link.link} className='font-bold'>{link.name}</Link>
          <div className='w-[30%] flex justify-between '>
            <Link href={link.add} className='flex items-center'><FaPlus className='text-green-700' /> Add</Link>
            <Link href={link.link} className='flex items-center'><FaPen className='text-yellow-500' />Change</Link>

          </div>
        </aside>
      })}
    </div>
  </section>

  {/* Auth */}

 <section className=' px-2 mt-8'>
    <header className='bg-primary text-white py-2 px-2'>AUTHENTICATION AND AUTHORIZATION</header>
    <div className=''>
      {authLinks.map((link,index)=>{
        
        return <aside key={index} className={`flex justify-between text-primary ${index % 2 == 0 ? "bg-lightPrimary" : ""} py-2 px-2`}>
          <Link href={link.link} className='font-semibold'>{link.name} </Link>
          <div className='w-[30%] flex justify-between '>
            <Link href={link.add} className='flex items-center'><FaPlus className='text-green-700' /> Add</Link>
            <Link href={link.link} className='flex items-center'><FaPen 
            className='text-yellow-500'
            />Change</Link>

          </div>
        </aside>
      })}
    </div>
  </section>
        </div>

        {/* Recent Actions */}

        <div className='px-2 lg:w-[20%]'>
          <div className='bg-lightPrimary'>

          <header className='border-b-1 py-2'>Recent Actions</header>
          <h1 className='text-[1.08rem]'>My Actions</h1>

          <section>
            <aside className='py-2'>
              <p className='flex items-center'><FaPlus className='text-green-700' /> Ouk Putkakada Investmetn</p>
              <div>Investment</div>
               </aside>
          </section>
          </div>
        </div>


      </article>
    </div>
  )
}

export default page