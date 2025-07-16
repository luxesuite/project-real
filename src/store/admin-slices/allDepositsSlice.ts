import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any | null = null

const allDeposits = createSlice({
    name:"allDeposits",
    initialState:initialState,
    reducers:{
        updateDeposit:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearDeposit:()=>{
            return []
        }
    }
})

export const {updateDeposit,clearDeposit} = allDeposits.actions
const allDepositsReducer = allDeposits.reducer

export default allDepositsReducer