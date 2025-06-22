import connectDb from "@/db/dbconnect"
import User from "@/models/userModel"
import { NextResponse } from "next/server"


export const GET = async()=>{

       const dbCheck = await connectDb()
       if (!dbCheck.success) {
        return NextResponse.json({message:"cant connect to database, please try again later",success:false})
    }
    
    try {
    const getUsers = await User.find({})
    if (!getUsers) {
        return NextResponse.json({message:"an error ocurred , can't fetch users",success:false})
        
    }

    return NextResponse.json({data:getUsers,success:true})

} catch (error) {
    
        return NextResponse.json({message:"an error occured please try again later",success:false})
}


}