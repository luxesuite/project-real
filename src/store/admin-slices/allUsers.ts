import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any | null = null

const allUsersSlice = createSlice({
    name:"allUsers",
    initialState:initialState,
    reducers:{
        updateUsers:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearUsers:()=>{
            return []
        }
    }
})

export const {updateUsers,clearUsers} = allUsersSlice.actions
const allUsersReducer = allUsersSlice.reducer

export default allUsersReducer