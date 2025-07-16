import connectDb from "@/db/dbconnect";
import Notification from "@/models/notificationModel";
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

    
const createNewNotification = await Notification.create(formDetails)

if (createNewNotification) {
    return NextResponse.json({data:createNewNotification,success:true,message:"you have successfully added new notification"})
}
else{
    return NextResponse.json({data:null,success:false,message:"cant add notification now,please try again later"})
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
    const getNotifications = await Notification.find({})
    if (!getNotifications) {
        return NextResponse.json({message:"an error ocurred , can't fetch notifications",success:false})
        
    }

    return NextResponse.json({data:getNotifications,success:true})

} catch (error) {
    
        return NextResponse.json({message:"an error occured please try again later",success:false})
}


}