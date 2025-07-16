import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any | null = null

const allWithdrawals = createSlice({
    name:"allWithdrawals",
    initialState:initialState,
    reducers:{
        updateWithdrawal:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearWithdrawal:()=>{
            return []
        }
    }
})

export const {updateWithdrawal,clearWithdrawal} = allWithdrawals.actions
const allWithdrawalsReducer = allWithdrawals.reducer

export default allWithdrawalsReducer