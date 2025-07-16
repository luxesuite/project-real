"use client"
import DesktopSideBar from '@/components/AccountsComponent/DesktopSideBar';
import { MenuBar } from '@/components/AccountsComponent/MenuBar';
import NavbarForAccounts from '@/components/AccountsComponent/NavbarForAccounts';
import NotificationsModal from '@/components/AccountsComponent/NotificationsModal';
import { appDispatch } from '@/store';
import { addUserInfo } from '@/store/slices/userSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const dispatch = useDispatch<appDispatch>()
  
const initialState: {userDetails: any;
    investment: never[];
    bonus: never[];
    deposit: never[];
    notification: never[];
    withdrawal: never[];} | any = {
   userDetails:{name:"john doe",
username:"doe",
email:"does@gmail.com"},
    investment:[],
    bonus:[],
    deposit:[],
    notification:[],
    withdrawal:[],


}
  useEffect(()=>{
   const userState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState

dispatch(addUserInfo(userState))

  },[])

  
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