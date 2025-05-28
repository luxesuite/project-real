
import { createSlice } from '@reduxjs/toolkit'

const menuBar = createSlice({
    name:"menubar",
    initialState:false,
    reducers:{
openMenu:()=>{

    return true
},
closeMenu:()=>{
return false
}

    }
})

export const {openMenu,closeMenu} = menuBar.actions
const menuBarSlice = menuBar.reducer
export default menuBarSlice