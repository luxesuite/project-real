"use client"
import DesktopSideBar from '@/components/AccountsComponent/DesktopSideBar';
import { MenuBar } from '@/components/AccountsComponent/MenuBar';
import NavbarForAccounts from '@/components/AccountsComponent/NavbarForAccounts';
import NotificationsModal from '@/components/AccountsComponent/NotificationsModal';
import { appDispatch } from '@/store';
import { openModal } from '@/store/slices/modalSlice';
import { addUserInfo } from '@/store/slices/userSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const initialState: {userDetails: any;
    investment: never[];
    bonus: never[];
    deposit: never[];
    notification: never[];
    withdrawal: never[];} | any = {
   userDetails:{name:"",
username:"",
email:""},
    investment:[],
    bonus:[],
    deposit:[],
    notification:[],
    withdrawal:[],
}



const getData = async(formDetails:any)=>{



    const res = await fetch(`/api/get-user-data`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formDetails)
    })

    return res.json()
}

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const dispatch = useDispatch<appDispatch>()
  const router = useRouter()
   const mutation = useMutation({
        mutationFn:getData,
        onSuccess:(data:any)=>{
                console.log(data);
                if (data.success) {
                    localStorage.setItem("user",JSON.stringify(data.data))
                    dispatch(addUserInfo(data.data))
                    console.log(data);
                
                return
                }
                else if (!data.success) {
    const userState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState

    dispatch(addUserInfo(userState))
    console.log(data);
    
                  }
                  // if (data.message) {
                    //     dispatch(openModal(data.message))
                    // }
                    
                    
                  },
                  onError:(error)=>{
                    console.log("error",error);
   const userState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState

dispatch(addUserInfo(userState))
                    // dispatch(addUserInfo(initialState))
                
            }
    })
        const [formDetails,setFormDetails] = useState({
            username:"",
            password:"",
        })

    const [showPassword,setShowPassword] = useState({
        password:false,
        confirmPassword:false
    })



//     const handleSubmit = (e:React.SyntheticEvent)=>{
// e.preventDefault()
// if (!formDetails.password || !formDetails.username) {
//      dispatch(openModal("Empty field"))
//          return
// }

// mutation.mutate(formDetails)
//     }
  
//   useEffect(()=>{
//    const userState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState

//    if (!userState?.userDetails?.username) {
  //     router.push("/sign-in")
  //    }
  // dispatch(addUserInfo(userState))
  
  //   },[])
  
  useEffect(()=>{
    const userState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState
    
  
       if (!localStorage.getItem("user")) {
          router.push("/")
          return
         }
     mutation.mutate(userState.userDetails.username)

},[])
if (mutation.isPending) {
  return <div>
        <NotificationsModal/>
        <NavbarForAccounts/>
        <MenuBar/>
        <div className='flex'>
<DesktopSideBar/>
        {children}
        </div>
        
        </div>
}
  
  return (
    <div>
        <NotificationsModal/>
        <NavbarForAccounts/>
        <MenuBar/>
        <div className='flex'>
<DesktopSideBar/>
        {children}
        </div>
        
        </div>
  )
}

export default layout