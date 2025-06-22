"use client"
import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        clearState:(()=>{
        localStorage.clear()

        return null
    })
    }
})

export const {clearState} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
