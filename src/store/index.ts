"use client"
import { configureStore } from "@reduxjs/toolkit";
import menuBarSlice from "./slices/menubarSlice";
import modalReducer from "./slices/modalSlice";
import userReducer from "./slices/userSlice";
import allUsersReducer from "./admin-slices/allUsers";
import allNotificationsReducer from "./admin-slices/allNotifications";
import allInvestmentsReducer from "./admin-slices/InvestmentsSlice";
import allBonusesReducer from "./admin-slices/allBonusesSlice";
import allDepositsReducer from "./admin-slices/allDepositsSlice";
import allWithdrawalsReducer from "./admin-slices/allWithdrawalsSlice";
import notificationsModalReducer from "./admin-slices/notificationModelSlice";
// import allUsersReducer from "./slices/allUsersSlice";

const store = configureStore({
    reducer:{
        menuBar:menuBarSlice,
        modalReducer:modalReducer,
        userReducer:userReducer,
        allUsersReducer:allUsersReducer,
        allNotificationsReducer:allNotificationsReducer,
        allInvestmentsReducer:allInvestmentsReducer,
        allBonusesReducer:allBonusesReducer,
        allDepositsReducer:allDepositsReducer,
        allWithdrawalsReducer:allWithdrawalsReducer,
        notificationsModalReducer:notificationsModalReducer
    }
})


export type appDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
