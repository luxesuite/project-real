import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    username:"",
    email:""
}
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        addUserInfo:(state,actions:PayloadAction<any>)=>{
return actions.payload
        },
        clearState:(()=>{
        localStorage.clear()

        return {
            username:"",
            email:""
        }
    })
    }
})

export const {clearState,addUserInfo} = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
