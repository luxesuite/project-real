import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any | null = null

const allInvestments = createSlice({
    name:"allInvestments",
    initialState:initialState,
    reducers:{
        updateInvestments:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearInvestments:()=>{
            return []
        }
    }
})

export const { updateInvestments,clearInvestments} = allInvestments.actions
const allInvestmentsReducer = allInvestments.reducer

export default allInvestmentsReducer