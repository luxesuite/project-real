import connectDb from "@/db/dbconnect";
import Bonus from "@/models/bonusModel";
import Deposit from "@/models/depositModel";
import Investment from "@/models/investmentModel";
import Notification from "@/models/notificationModel";
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
   // CheckIf User Exists
     const checkIfUserExists = await User.findOne({username:formDetails.username})
    // Investment
    const getUserInvestment = await Investment.find({username:checkIfUserExists.username})
    // bonus
    const getUserBonus = await Bonus.find({username:checkIfUserExists.username})
    // Withdrawal
    const getUserWithdrawal = await Withdrawal.find({username:checkIfUserExists.username})
    // Notificatioon
    // const getUserNotification = await Notification.find({username:checkIfUserExists.username})
    // deposit
    const getUserDepoit = await Deposit.find({username:checkIfUserExists.username})
    
    // calclulate total balance
       const totalBalance:number = getUserInvestment.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.profitReturn) , 0) + getUserBonus.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) + getUserDepoit.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0) - getUserWithdrawal.reduce((acc:number,curr:any)=> Number(acc) + Number(curr.amount) , 0)

       if (formDetails.amount > totalBalance) {
        return NextResponse.json({data:null,success:false,message:"Amount exceeds user balance"})
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