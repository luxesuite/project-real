import connectDb from "@/db/dbconnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import bcrypt  from "bcryptjs";
import Investment from "@/models/investmentModel";
import Bonus from "@/models/bonusModel";
import Withdrawal from "@/models/withdrawalModel";
import Notification from "@/models/notificationModel";
import Deposit from "@/models/depositModel";


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
    const createdToken = jwt.sign({username:checkIfUserExists.username,email:checkIfUserExists.email,role:checkIfUserExists.role},process.env.JSON_SECRET  as string,{
        expiresIn:"1h"
    })

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
    
const response = NextResponse.json({message:"Login successful",
    success:true,
    token:createdToken,
    data:{
        userDetails:checkIfUserExists,
        investment:getUserInvestment ? getUserInvestment : [],
        bonus:getUserBonus ? getUserBonus : [],
        deposit:getUserDepoit ? getUserDepoit : [],
        withdrawal:getUserWithdrawal ? getUserWithdrawal : [],
        notification:getUserNotification ? getUserNotification : [],
    },

    })

    response.cookies.set({
        name:"token",
        value:createdToken,
        httpOnly:true,
        secure:true,
        maxAge:60 * 60,
        path:"/"
    })
    
    return response
    
}




} catch (error) {
    return NextResponse.json({message:"Something went wrong,please try again later",
    success:false
    })
    
  }


}