"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {userDetails: any;
    investment: never[];
    bonus: never[];
    deposit: never[];
    notification: never[];
    withdrawal: never[];} | any = {
   userDetails:{name:"",
username:"",
email:""},
    investment:[],
    bonus:[],
    deposit:[],
    notification:[],
    withdrawal:[],


}
// localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState
const userSlice = createSlice({
    name:"userSlice",
    initialState:initialState ,
    reducers:{
        addUserInfo:(state,actions:PayloadAction<any>)=>{
return actions.payload
        },
        clearState:(()=>{
        // localStorage.clear()

        return {
            userDetails:null,
            investment:[],
            bonus:[],
            deposit:[],
            notification:[],
            withdrawal:[],
        }
    })
    }
})

export const {clearState,addUserInfo} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
