import connectDb from "@/db/dbconnect";
import History from "@/models/historyModel";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    const formDetails =await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }
    
    try {
const createNewHistory = await History.create(formDetails)
if (createNewHistory) {
    return NextResponse.json({data:createNewHistory,success:true,message:"you have successfully added new History"})
}
else{
    return NextResponse.json({data:null,success:false,message:"cant add History now,please try again later"})
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
    const getHistory = await History.find({}).sort({ createdAt: -1 }).limit(10);
    if (!getHistory) {
        return NextResponse.json({message:"an error ocurred , can't fetch Histories",success:false})
        
    }

    return NextResponse.json({data:getHistory,success:true})

} catch (error) {
    
        return NextResponse.json({message:"an error occured please try again later",success:false})
}


}