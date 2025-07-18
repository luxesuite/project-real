import connectDb from "@/db/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Investment from "@/models/investmentModel";
import Bonus from "@/models/bonusModel";
import Withdrawal from "@/models/withdrawalModel";
import Notification from "@/models/notificationModel";
import Deposit from "@/models/depositModel";


export const POST = async (req:NextRequest)=>{
const detail = await req.json()

console.log("detail",detail);

   const dbCheck = await connectDb()
   if (!dbCheck.success) {
    return NextResponse.json({message:"cant connect to database, please try again later",success:false})
   }

  try {
    // CheckIf User Exists
     const checkIfUserExists = await User.findOne({username:detail})
    // Investment
    const getUserInvestment = await Investment.find({username:checkIfUserExists.username})
    // bonus
    const getUserBonus = await Bonus.find({username:checkIfUserExists.username})
    // Withdrawal
    const getUserWithdrawal = await Withdrawal.find({username:checkIfUserExists.username})
    // Notificatioon
    const getUserNotification = await Notification.find({username:checkIfUserExists.username})
    // deposit
    const getUserDepoit = await Deposit.find({username:checkIfUserExists.username})
    
    return NextResponse.json({message:"successful",
    success:true,
    data:{
        userDetails:checkIfUserExists,
        investment:getUserInvestment ? getUserInvestment : [],
        bonus:getUserBonus ? getUserBonus : [],
        deposit:getUserDepoit ? getUserDepoit : [],
        withdrawal:getUserWithdrawal ? getUserWithdrawal : [],
        notification:getUserNotification ? getUserNotification : [],
    },

    })
    




} catch (error) {
    return NextResponse.json({message:"Something went wrong,please try again later",
    success:false
    })
    
  }


}