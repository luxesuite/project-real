import Link from 'next/link'
import React from 'react'

const HeaderForAdmin = () => {
  return (
    <div className='bg-primary flex flex-col items-center py-4 gap-y-2'>
<h1 className='text-lg text-yellow-200 font-medium'>Admin Management</h1>
<div className='text-white'>
  Welcome, SUPER ADMIN
</div>
<div className='flex gap-x-4'>
<Link href={"/"}>View Site</Link>
<Link href={"/"}>Change Password</Link>
<button>Log out</button>


</div>
    </div>
  )
}

export default HeaderForAdmin