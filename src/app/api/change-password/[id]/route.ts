import connectDb from "@/db/dbconnect"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import { NextRequest,NextResponse } from "next/server"


export const PUT = async(req:NextRequest,{params}:{params:Promise<{id:string}>})=>{
const formDetails = await req.json()
const {id} =await params
  try {
     const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }

// check if user exist
     const checkIfUserExists = await User.findOne({username:formDetails.username})
   if (!checkIfUserExists) {
    return NextResponse.json({
        message:"sorry, no user with this username",
        success:false
    })
   }

  const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(formDetails.newPassword,salt)

const updateUser = await User.findOneAndUpdate({username:id},{password:hashPassword})
if (updateUser) {
    
  return  NextResponse.json({
        success:true,
        message:"password changed successfully",
        date:updateUser
    })
}
else {
        
  return  NextResponse.json({
        success:false,
        message:"an error occured",
        date:null
    })
}
  } catch (error) {

     console.log(error);
    
    return NextResponse.json({data:null,success:false,message:"an error occured please try again later"})
    


  }


// return NextResponse.json({
//     id:id,
// form:formDetails
// })



}