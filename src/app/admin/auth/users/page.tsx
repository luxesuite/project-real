"use client"
import UserManagement from '@/components/AdminComponent/UserManagement'
import Loader from '@/components/Loader'
import { appDispatch, RootState } from '@/store'
import { updateUsers } from '@/store/admin-slices/allUsers'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
const allUsersState = useSelector((state:RootState)=>{

return state.allUsersReducer
})
    const dispatch = useDispatch<appDispatch>()

    const fetchUsers = async()=>{
const res = await fetch("/api/admin/get-all-users")
if (!res.ok) {
alert("Something went wrong, couldnt get users")
return
}

const response = await res.json()
console.log(response);

dispatch(updateUsers(response.data))
return
    }

    useEffect(()=>{
fetchUsers()
    },[])

    if (allUsersState == null) {
      return <div>
         <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading Users</h1>
        </div>
      </div>
    }
  return (
    <div>
{allUsersState.length < 1 && (
  <div className='text-center'>
    <h1>no users currently, kindly create one by signing up</h1>
  </div>
)}
{allUsersState.length > 0 && <UserManagement/>}

    </div>
  )
}

export default page