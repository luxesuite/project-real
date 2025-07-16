import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any | null = null

const allNotifications = createSlice({
    name:"allUsers",
    initialState:initialState,
    reducers:{
        updateNotification:(state,actions:PayloadAction<any>)=>{

            return actions.payload
        },
        clearNotification:()=>{
            return []
        }
    }
})

export const {updateNotification,clearNotification} = allNotifications.actions
const allNotificationsReducer = allNotifications.reducer

export default allNotificationsReducer