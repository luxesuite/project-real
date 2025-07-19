
"use client"
import HeaderForAdmin from "@/components/AdminComponent/HeaderForAdmin"
import { appDispatch } from "@/store"
import { addUserInfo } from "@/store/slices/userSlice"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"


const layout = ({children}:Readonly<{children:React.ReactNode}>)=>{
    const pathname = usePathname()
    

    

    return <div>
       {!pathname.includes("sign-in") &&  <HeaderForAdmin/>}
        {children}
    </div>
}

export default layout