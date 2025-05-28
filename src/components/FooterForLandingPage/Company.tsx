import React from 'react'
import { GiConcentricCrescents } from "react-icons/gi";
import Link from 'next/link';
import { PiInstagramLogo } from "react-icons/pi";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
const linksData = [
    {
        id:1,
        name:"Instagram",
        icon:PiInstagramLogo,
    },
    {
        id:2,
        name:"Twitter",
        icon:FaTwitter,
    },
    {
        id:3,
        name:"Facebook",
        icon:RiFacebookCircleFill ,
    },
    {
        id:4,
        name:"Mail",
        icon:IoMdMail,
    },
    {
        id:5,
        name:"Instagram",
        icon:FaPinterest,
    },
]
const Company = () => {
  return (
    <div className='w-[90%] lg:w-[20%] flex flex-col gap-y-2'>
        <h1 className='font-semibold text-footerTextOne'>COMPANY</h1>
              <div className='my-4'>
    <Link href={"/"} className='flex items-center '>
    < GiConcentricCrescents className='text-primary' size={43}/>
        <span className='text-primary mdsm:text-[0.73rem] font-semibold text-[0.8rem]'>RealVista  Shares 
            <br />
            Limited</span>
    </Link>
      </div>
      <p className='text-[0.7rem]'>
        Real Vista Shares offers you a share in a highly profitable business based on the trading of real estate and shares. We guarantee a stable profit to every investor of the company. Join and multiply your income with us!
      </p>
<div className=' w-[60%] flex  justify-between'>

{
    linksData.map((item,_)=>{
        
        return <span key={item.id}>
        <item.icon size={18} className='text-primary'/>
        </span>
    })
}
    </div>
    </div>
  )
}

export default Company