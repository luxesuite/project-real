import HeaderForAdmin from "@/components/AdminComponent/HeaderForAdmin"


const layout = ({children}:Readonly<{children:React.ReactNode}>)=>{


    return <div>
        <HeaderForAdmin/>
        {children}
    </div>
}

export default layout