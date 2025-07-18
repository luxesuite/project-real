import { NextResponse } from "next/server"


export const POST = async()=>{

    const response = NextResponse.json({message:"Logged out",success:true})
    response.cookies.set('token','',{
        maxAge:0,
        path:"/",
        httpOnly:true
    })
    return response
}