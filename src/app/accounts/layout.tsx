import { MenuBar } from '@/components/AccountsComponent/MenuBar';
import NavbarForAccounts from '@/components/AccountsComponent/NavbarForAccounts';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
        <NavbarForAccounts/>
        <MenuBar/>
        {children}
        
        </div>
  )
}

export default layout