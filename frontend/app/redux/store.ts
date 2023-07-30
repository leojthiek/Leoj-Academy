import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/userSlice/registerSlice";
import loginUserReducer from './features/userSlice/loginSlice'
import getTopCourseReducer from './features/courseSlice/topCourseSlice'
import courseDetailReducer from './features/courseSlice/courseDetailSlice'
import instructorCourseReducer from './features/courseSlice/instructorSlice'
import videoUrlReducer from './features/contentSlice/contentSlice'
import sameCategoryReducer from './features/courseSlice/sameCategoryCourse'
import coursePurchaseDetailReducer from './features/courseSlice/coursePuchaseDetailSlice'



const store = configureStore({
    reducer:{
        registerUser:registerReducer,
        loginUser:loginUserReducer,
        topCourse:getTopCourseReducer,
        courseDetail:courseDetailReducer,
        instructorCourse:instructorCourseReducer,
        videoUrl:videoUrlReducer,
        sameCategory:sameCategoryReducer,
        coursePurchaseDetail:coursePurchaseDetailReducer,
    }

})

export default store
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch