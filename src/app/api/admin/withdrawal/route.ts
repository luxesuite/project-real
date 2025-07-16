import connectDb from "@/db/dbconnect";
// import Deposit from "@/models/depositModel";
import User from "@/models/userModel";
import Withdrawal from "@/models/withdrawalModel";

import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    const formDetails =await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }
    
    try {
     
        // check user exist by username
        const checkIfUserExistInDbByUsername = await User.exists({username:formDetails.username})
        if (!checkIfUserExistInDbByUsername) {
            return NextResponse.json({message:"no user with this username",success:false})
        }

    
const createNewWithdrawal = await Withdrawal.create(formDetails)

if (createNewWithdrawal) {
    return NextResponse.json({data:createNewWithdrawal,success:true,message:"you have successfully added new withdrawal"})
}
else{
    return NextResponse.json({data:null,success:false,message:"cant add withdrwal now,please try again later"})
}

} catch (error) {
    console.log(error);
    
    return NextResponse.json({data:null,success:false,message:"an error occured, please please try again later"})
    }

// console.log(formDetails);
//  return NextResponse.json({success:true})

}




export const GET = async()=>{

       const dbCheck = await connectDb()
       if (!dbCheck.success) {
        return NextResponse.json({message:"cant connect to database, please try again later",success:false})
    }
    
    try {
    const getWithdrawals = await Withdrawal.find({})
    if (!getWithdrawals) {
        return NextResponse.json({message:"an error ocurred , can't fetch withdrawals",success:false})
        
    }

    return NextResponse.json({data:getWithdrawals,success:true})

} catch (error) {
    
        return NextResponse.json({message:"an error occured please try again later",success:false})
}


}