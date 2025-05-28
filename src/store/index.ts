import { configureStore } from "@reduxjs/toolkit";
import menuBarSlice from "./slices/menubarSlice";

const store = configureStore({
    reducer:{
        menuBar:menuBarSlice,
    }
})


export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
