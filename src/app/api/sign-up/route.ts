import connectDb from "@/db/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { signUpRouteType } from "@/types/types";



export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    const formDetails =await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }
    
    try {
        // check user exist by email
        const checkIfUserExistInDbByEmail = await User.exists({email:formDetails.email})
        if (checkIfUserExistInDbByEmail) {
            return NextResponse.json({message:"User with this email already exist",success:false})
        }
        // check user exist by name
        const checkIfUserExistInDbByUsername = await User.exists({username:formDetails.username})
        if (checkIfUserExistInDbByUsername) {
            return NextResponse.json({message:"User with this username already exist,please choose another name",success:false})
        }

        // hashPassword

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(formDetails.password,salt)

const createNewUser = await User.create({
    ...formDetails,password:hashPassword
})


if (createNewUser) {
    return NextResponse.json({data:createNewUser,success:true})
}
else{
    return NextResponse.json({data:null,success:false,message:"cant create new user currently,please try again later"})
}

} catch (error) {
    
    return NextResponse.json({data:null,success:false,message:"an error occured please"})
    }

// console.log(formDetails);
//  return NextResponse.json({success:true})

}