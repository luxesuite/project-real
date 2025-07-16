import connectDb from "@/db/dbconnect";
import Bonus from "@/models/bonusModel";
// import Notification from "@/models/notificationModel";


import { NextRequest, NextResponse } from "next/server";




export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    const formDetails =await req.json()
   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }
    
    try {
     
    
  const result = await Bonus.deleteMany({ _id: { $in: formDetails } });

    
if (!result) {
   return NextResponse.json({
    success:false,
    message: `cant delete bonus or bonus not available in the database, kindly reload the page`
    })
}

return  NextResponse.json({
        success:true,
        message: `${result.deletedCount} bonuses deleted successfully`
    })


} catch (error) {
    console.log(error);
    
    return NextResponse.json({data:null,success:false,message:"an error occured, please please try again later"})
    }

}
