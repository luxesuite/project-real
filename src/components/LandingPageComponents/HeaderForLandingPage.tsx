"use client"

import React, { useEffect, useRef, useState } from 'react'
// import { FaBars } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { GiConcentricCrescents } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { RiQuestionLine } from "react-icons/ri";
import { GrContact } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import gsap from 'gsap';
import Dropdown from './ChangeLanguageDropDown';
import Flag from 'react-world-flags';

const languages = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
  { code: 'zh', label: '中文', flag: 'cn' }
];

export const HeaderForLandingPage = () => {
const [showMenu,setShowMenu] = useState<boolean>(false)
const [hoverClass] = useState<string>(" gap-x-[3px] hover:bg-primary hover:px-2 hover:rounded-lg hover:text-xl")
const menuRef =  useRef<HTMLDivElement | null>(null)


const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'grape', label: 'Grape' }
];
useEffect(()=>{
if (showMenu) {
  gsap.to(menuRef.current,{
    scale:1,
    duration:0.7,
    opacity:1,
    display:"block",
    ease:'power3'
  })
}
else{
  gsap.to(menuRef.current,{
    scale:0.8,
    duration:0.7,
    opacity:0,
    display:"none",
    ease:'power3'
  })
}
},[showMenu])

  return (
    <div className='flex items-center justify-between py-4  mx-4'>
      <div className='lg:w-[20%]'>
    <Link href={"/"} className='flex items-center '>
    < GiConcentricCrescents className='text-primary' size={43}/>
        <span className='text-primary mdsm:text-[0.73rem] font-semibold text-[0.8rem]'>RealVista  Shares 
            <br />
            Limited</span>
    </Link>
      </div>

{/* NavLinks for Desktop */}
    <nav className='hidden lg:flex justify-between   w-[20%]   '>
      <Link href={"/"} className='hover:text-primary transition-all text-[0.7rem]' >Home</Link>
      <Link href={"/about"} className='hover:text-primary transition-all text-[0.7rem]'>About Us</Link>
      <Link href={"/faqs"} className='hover:text-primary transition-all text-[0.7rem]'>FAQS</Link>
      <Link href={"/"} className='hover:text-primary transition-all text-[0.7rem]'>Contact Us</Link>
    </nav>
  
{/* NavLinks for Mobile */}
    <div ref={menuRef} className='opacity-0 lg:hidden fixed top-0 left-0 w-full h-full z-50'>
      <div className='w-full h-full relative flex flex-col  justify-center text-lg  text-white bg-dark  gap-y-[10px] px-4 '>
        <button onClick={()=> setShowMenu(false)} className='absolute left-[85%] top-[5%] cursor-pointer'><IoMdClose size={30}/></button>

      <Link href={"/"} className={`font-semibold h-[60px] transition-all flex items-center gap-x-[3px] px-6 ${hoverClass}`} ><IoHomeOutline size={23}/> Home</Link>
      <Link href={"/about"}className={`font-semibold h-[60px] transition-all flex items-center gap-x-[3px] px-6 ${hoverClass}`}><RiQuestionLine size={23}/> About Us</Link>
      <Link href={"/sign-in"}className={`font-semibold h-[60px] transition-all flex items-center gap-x-[3px] px-6 ${hoverClass}`}><IoLogInOutline size={23}/> Login</Link>
      <Link href={"/sign-up"} className={`font-semibold h-[60px] transition-all flex items-center gap-x-[3px] px-6 ${hoverClass}`}><IoLogInOutline size={23}/> Sign Up</Link>
      <Link href={"/faqs"}className={`font-semibold h-[60px] transition-all flex items-center gap-x-[3px] px-6 ${hoverClass}`}><RiQuestionLine size={23}/> FAQS</Link>
      <Link href={"/"}  className={`h-[60px] transition-all flex items-center gap-x-[3px] px-6 text-primary font-semibold font-semibold text-xl gap-x-[3px] hover:px-2 hover:rounded-md hover:text-xl`}><GrContact size={23}/> Contact Us</Link>
      </div>

    </div>


    <aside className=' flex items-center  lg:w-[18%] justify-between'>
  <Link href={"sign-up"} className='hidden lg:inline border-[1px] border-primary rounded-full w-[45%] text-center py-[10px]' >Sign Up</Link>
  <Link href={"/sign-in"} className='hidden lg:inline  rounded-full w-[45%] text-center py-[10px] bg-primary text-white'>Sign In</Link>
  {/* <select name="" id="" className='border-none outline-none rounded-lg '>
      <option value="">NIG</option>
      <option value="">ENG</option>
    </select> */}
  

  {/* drop down */}

  {/* <select name="" id="">
  {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            <Flag code="us" style={{ width: 50 }} />
            
          </option>
        ))}
  </select> */}
  {/* <Flag code="us" style={{ width: 50 }} />
  <Flag code="fr" style={{ width: 50 }} /> */}
  {/* <Dropdown/> */}
  <button className='lg:hidden cursor-pointer ml-4' onClick={()=> setShowMenu(true)}>< IoIosMenu size={35}/></button>
</aside>
{/* <NavLinks/>
<AccountLinks/> */}
    {/* <aside className='lg:hidden '>
    <button>< FaBars size={35}/></button>
    <select name="" id="">
      <option value="">NIG</option>
      <option value="">ENG</option>
    </select>
    </aside>  */}
    </div>
  )
}


const NavLinks = ()=>{

  return(   
    <nav className='hidden lg:block '>
      <Link href={"/"} >Home</Link>
      <Link href={"/about"}>About Us</Link>
      <Link href={"/faqs"}>FAQS</Link>
      <Link href={"/#"}>Contact Us</Link>
    </nav>
  )
}

const AccountLinks =()=>{

  return <aside className=''>
  <Link href={"sign-up"}>Sign Up</Link>
  <Link href={"/sign-in"}>Sign Sign In</Link>
  <select name="" id="">
      <option value="">NIG</option>
      <option value="">ENG</option>
    </select>
</aside>
}