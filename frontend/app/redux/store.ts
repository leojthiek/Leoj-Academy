import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/userSlice/registerSlice";
import loginUserReducer from './features/userSlice/loginSlice'



const store = configureStore({
    reducer:{
        registerUser:registerReducer,
        loginUser:loginUserReducer,
    }

})

export default store
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch