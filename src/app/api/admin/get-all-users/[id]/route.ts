import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/db/dbconnect"
import User from "@/models/userModel"

export const DELETE = async(req:NextRequest,{params}:{params:any})=>{
    const {id} = await params

        const dbCheck = await connectDb()
           if (!dbCheck.success) {
            return NextResponse.json({message:"cant connect to database, please try again later",success:false})
        }

        const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
    return NextResponse.json(
    { success: false, error: 'User not found' },
    { status: 404 }
    );
    }

   return NextResponse.json(
      { 
        success: true, 
        message: 'User deleted successfully',
        data: {
          id: deletedUser._id,
          name: deletedUser.name,
          email: deletedUser.email
        }
      },
      { status: 200 })

}