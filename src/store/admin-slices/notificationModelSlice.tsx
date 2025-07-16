import { createSlice } from "@reduxjs/toolkit";


const notificationsModalSlice = createSlice({
    name:"notifications modal",
    initialState:false,
    reducers:{
        openNotificationsModal:()=>{
            return true
        },
        closeNotificationsModal:()=>{
            return false
        }
    }
}) 

export const {openNotificationsModal,closeNotificationsModal} = notificationsModalSlice.actions
const notificationsModalReducer = notificationsModalSlice.reducer


export default notificationsModalReducer