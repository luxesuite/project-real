import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType ={
    message: string;
    showModal: boolean;
}

const initialState = {
        message:"",
        showModal:false
    }
const modalSlice = createSlice({
    name:"modalSlice",
    initialState,
    reducers:{
        openModal:(state:initialStateType,actions:PayloadAction<string>)=>{

            return {
                message:actions.payload,
                showModal:true,
            }
        },
        closeModal:()=>{
            return {
        message:"",
        showModal:false
    }
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
const modalReducer = modalSlice.reducer

export default modalReducer