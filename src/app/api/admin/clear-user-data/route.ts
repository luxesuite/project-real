import connectDb from "@/db/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Investment from "@/models/investmentModel";
import Bonus from "@/models/bonusModel";
import Withdrawal from "@/models/withdrawalModel";
import Notification from "@/models/notificationModel";
import Deposit from "@/models/depositModel";


export const POST = async (req:NextRequest)=>{
const username = await req.json()

console.log("detail",username);

   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }

  try {
    // CheckIf User Exists
    //  const checkIfUserExists = await User.findOne({username:detail})
    // Investment
    const deleteUserInvestment = await Investment.deleteMany({username:username})
    // bonus
    const deleteUserBonus = await Bonus.deleteMany({username:username})
    // Withdrawal
    const deleteUserWithdrawal = await Withdrawal.deleteMany({username:username})
    // Notificatioon
    const deleteUserNotification = await Notification.deleteMany({username:username})
    // deposit
    const deleteUserDepoit = await Deposit.deleteMany({username:username})
    
    return NextResponse.json({message:"successfully cleared user funds ",
    success:true,
    data:{
      username:username,
        investment:deleteUserInvestment,
        bonus:deleteUserBonus ,
        deposit:deleteUserDepoit ,
        withdrawal:deleteUserWithdrawal ,
        notification:deleteUserNotification,
    },

    })
    




} catch (error) {
    return NextResponse.json({message:"Something went wrong,please try again later",
    success:false
    })
    
  }


}