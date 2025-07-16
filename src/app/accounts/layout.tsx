import DesktopSideBar from '@/components/AccountsComponent/DesktopSideBar';
import { MenuBar } from '@/components/AccountsComponent/MenuBar';
import NavbarForAccounts from '@/components/AccountsComponent/NavbarForAccounts';
import NotificationsModal from '@/components/AccountsComponent/NotificationsModal';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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