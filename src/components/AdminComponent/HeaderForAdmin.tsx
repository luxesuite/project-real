"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useEffect } from 'react'

const HeaderForAdmin = () => {
const router = useRouter()
  const handleSignOut = async()=>{
    localStorage.clear()
    window.location.reload()
    // try {
    //   const res = await fetch("/api/admin/sign-out",{
    //     method:'POST',
    //     credentials:"include"
    //   })
      
    //   const reponse = await res.json()

    //   if (reponse.success) {
    //     router.push("/admin/sign-in")
    //   }
    //   else{
    //     alert("can sign out now")
    //   }
      
  
    // } catch (error) {
    //   console.log("an error occured");
    //   alert("an error occured")
      
    // }
  }

  useEffect(()=>{

    // const user = 
console.log();
if (!localStorage.getItem("user") || JSON.parse(localStorage.getItem("user") as string).userDetails.role !== "admin") {
  localStorage.clear()
  router.push("/admin/sign-in")
}

  },[])
  return (
    <div className='bg-primary flex flex-col items-center py-4 gap-y-2'>
<h1 className='text-lg text-yellow-200 font-medium'>Admin Management</h1>
<div className='text-white'>
  Welcome, SUPER ADMIN
</div>
<div className='flex gap-x-4'>
<Link href={"/"}>View Site</Link>
<Link href={"/"}>Change Password</Link>
<button onClick={handleSignOut} className='cursor-pointer'>Log out</button>


</div>
    </div>
  )
}

export default HeaderForAdmin