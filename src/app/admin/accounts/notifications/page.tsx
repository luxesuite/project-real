"use client"
import NotificationTable from '@/components/AdminComponent/NotificationComponents/NotificationTable'
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/store/slices/modalSlice';
import { updateNotification } from '@/store/admin-slices/allNotifications';


 const page = () => {
  const allNotificationsState = useSelector((state:RootState)=>{
return state.allNotificationsReducer
  })

  const dispatch = useDispatch<appDispatch>()
const fetchData = async()=>{
    const res = await fetch("/api/admin/notification")
    if (!res.ok) {
       
        dispatch(openModal("something went wrong,please relaod the page"))
        return
    }
    
    
    const response = await res.json()
    
    if (!response.success) {
        dispatch(openModal(response.message))
        return
        
}

dispatch(updateNotification(response.data))

}

useEffect(()=>{

    if (allNotificationsState) {
        return
    }
fetchData()
    
},[allNotificationsState])

  useEffect(()=>{
console.log(allNotificationsState);

  },[allNotificationsState])

  if (allNotificationsState == null) {
    return (
      <div className="max-w-full p-4">

    <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
      </div>
   )
  }
  return (
   <div className="max-w-full p-4">
    {/* { &&  } */}
<NotificationTable/>
        
    </div>
  )
}
export default page
