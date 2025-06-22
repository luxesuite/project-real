import { configureStore } from "@reduxjs/toolkit";
import menuBarSlice from "./slices/menubarSlice";
import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";
import allUsersReducer from "./slices/allUsersSlice";

const store = configureStore({
    reducer:{
        menuBar:menuBarSlice,
        modalReducer:modalReducer,
        userReducer:userReducer,
        allUsersReducer:allUsersReducer
    }
})


export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
