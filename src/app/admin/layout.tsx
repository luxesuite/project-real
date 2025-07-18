
"use client"
import HeaderForAdmin from "@/components/AdminComponent/HeaderForAdmin"
import { usePathname } from "next/navigation"


const layout = ({children}:Readonly<{children:React.ReactNode}>)=>{
    const pathname = usePathname()

    console.log(pathname);
    

    return <div>
       {!pathname.includes("sign-in") &&  <HeaderForAdmin/>}
        {children}
    </div>
}

export default layout