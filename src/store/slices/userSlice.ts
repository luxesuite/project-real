"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
   userDetails:null,
    investment:[],
    bonus:[],
    deposit:[],
    notification:[],
    withdrawal:[],


}
const userSlice = createSlice({
    name:"userSlice",
    initialState:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : initialState ,
    reducers:{
        addUserInfo:(state,actions:PayloadAction<any>)=>{
return actions.payload
        },
        clearState:(()=>{
        localStorage.clear()

        return {
            username:"",
            email:"",
            investment:[],
            bonus:[]
        }
    })
    }
})

export const {clearState,addUserInfo} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
