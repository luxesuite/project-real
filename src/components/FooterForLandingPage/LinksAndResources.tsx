import React from 'react'
import Link from 'next/link'

export const LinksAndResources = () => {
  return (
    <div className='w-[90%] lg:w-[20%] my-6 lg:my-0'>
<h1 className='font-semibold text-footerTextOne'>LINKS AND RESOURCES</h1>

<div className='flex flex-col gap-y-2 my-4 '>
        <Link href={"#"} className='hover:text-footerTextOne cursor-pointer'>Home</Link>
        <Link href={"#"} className='hover:text-footerTextOne cursor-pointer'>About Us</Link>
        <Link href={"#"} className='hover:text-footerTextOne cursor-pointer'>Registration</Link>
        <Link href={"#"} className='hover:text-footerTextOne cursor-pointer'>Login</Link>
        <Link href={"#"} className='hover:text-footerTextOne cursor-pointer'>Frequently Asked Questions</Link>
</div>
    </div>
  )
}
