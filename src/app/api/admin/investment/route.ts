import connectDb from "@/db/dbconnect";
import Investment from "@/models/investmentModel";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    const formDetails =await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }
    
    try {
     
        // check user exist by name
        const checkIfUserExistInDbByUsername = await User.exists({username:formDetails.username})
        if (!checkIfUserExistInDbByUsername) {
            return NextResponse.json({message:"no user with this username",success:false})
        }

    
const createNewInvestment = await Investment.create(formDetails)

if (createNewInvestment) {
    return NextResponse.json({data:createNewInvestment,success:true,message:"you have successfully added new Investment"})
}
else{
    return NextResponse.json({data:null,success:false,message:"cant add Investment now,please try again later"})
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
    const getInvestments = await Investment.find({})
    if (!getInvestments) {
        return NextResponse.json({message:"an error ocurred , can't fetch investments",success:false})
        
    }

    return NextResponse.json({data:getInvestments,success:true})

} catch (error) {
    
        return NextResponse.json({message:"an error occured please try again later",success:false})
}


}