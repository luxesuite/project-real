import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any | null = null

const allBonuses = createSlice({
    name:"allBonuses",
    initialState:initialState,
    reducers:{
        updateBonus:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearBonus:()=>{
            return []
        }
    }
})

export const {updateBonus,clearBonus} = allBonuses.actions
const allBonusesReducer = allBonuses.reducer

export default allBonusesReducer