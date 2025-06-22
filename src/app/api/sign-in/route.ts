import connectDb from "@/db/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt  from "bcryptjs";


export const POST = async (req:NextRequest)=>{
const formDetails = await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }

  try {
    // CheckIf User Exists
     const checkIfUserExists = await User.findOne({username:formDetails.username})
   if (!checkIfUserExists) {
    return NextResponse.json({
        message:"sorry, no user with this username",
        success:false
    })
   }
//    Check if entered password matches


const comparePassword = await  bcrypt.compare(formDetails.password,checkIfUserExists.password)

if (!comparePassword) {
    return NextResponse.json({message:"Password is incorrect,please try again with a new password",
    success:false
    })
}
else{
    const createdToken = jwt.sign({username:checkIfUserExists.username,email:checkIfUserExists.email},process.env.JSON_SECRET  as string,{
        expiresIn:"10m"
    })
    return NextResponse.json({message:"Login successful",
    success:true,
    token:createdToken,
    data:checkIfUserExists
    })
    
}




} catch (error) {
    return NextResponse.json({message:"Something went wrong,please try again later",
    success:false
    })
    
  }


}