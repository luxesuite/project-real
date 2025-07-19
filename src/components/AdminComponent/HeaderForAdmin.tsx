"use client"
import { appDispatch, RootState } from '@/store'
import { addUserInfo } from '@/store/slices/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HeaderForAdmin = () => {
const router = useRouter()
const dispatch = useDispatch<appDispatch>()
const [loadClient,setLoadClient] = useState(false)
  const handleSignOut = async()=>{
    localStorage.clear()
    router.push("/admin/sign-in")
    // window.location.reload()
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

  const userState = useSelector((state:RootState)=>{

    return state.userReducer
  })


//   if (!localStorage.getItem("user") || JSON.parse(localStorage.getItem("user") as string).userDetails.role !== "admin") {
//   localStorage.clear()
//   router.push("/admin/sign-in")
// }


  useEffect(()=>{

    // const user = 
console.log(localStorage.getItem("user"));
if (localStorage.getItem("user") == null || JSON.parse(localStorage.getItem("user") as string).userDetails.role !== "admin") {
  localStorage.clear()
  router.push("/admin/sign-in")
  return
}


dispatch(addUserInfo(JSON.parse(localStorage.getItem("user") as string)))
setLoadClient(true)

  },[])

  

  return (
    <div className='bg-primary flex flex-col items-center py-4 gap-y-2'>
<h1 className='text-lg text-yellow-200 font-medium'>Admin Management</h1>
<div className='text-white capitalize'>
  Welcome, <span className='font-semibold uppercase'>{loadClient ? JSON.parse(localStorage.getItem("user") as string).userDetails.username : "" }</span>
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