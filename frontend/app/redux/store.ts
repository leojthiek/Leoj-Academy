<<<<<<< HEAD
import {configureStore} from '@reduxjs/toolkit'
import videoSliceReducer from './featuresSlice/contentSlice/contentSlice'
import courseDetailReducer from './featuresSlice/courseSlice/courseDetailSlice'
import getTopCourseReducer from './featuresSlice/courseSlice/topCourseSlice'
import InstructorCourseReducer from './featuresSlice/courseSlice/instructorCOurseSlice'
import loginReducer from './featuresSlice/userSlice/loginSlice'
import registerReducer from './featuresSlice/userSlice/registerSlice'
=======
import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./features/userSlice/registerSlice";
import loginUserReducer from './features/userSlice/loginSlice'
import getTopCourseReducer from './features/courseSlice/topCourseSlice'
import courseDetailReducer from './features/courseSlice/courseDetailSlice'
import instructorCourseReducer from './features/courseSlice/instructorSlice'
import videoUrlReducer from './features/contentSlice/contentSlice'
import sameCategoryReducer from './features/courseSlice/sameCategoryCourse'
import coursePurchaseDetailReducer from './features/courseSlice/coursePuchaseDetailSlice'

>>>>>>> branch


const store = configureStore({
    reducer:{
        registerUser:registerReducer,
        loginUser:loginUserReducer,
        topCourse:getTopCourseReducer,
<<<<<<< HEAD
        instructorCourse:InstructorCourseReducer,
        login:loginReducer,
        register:registerReducer
=======
        courseDetail:courseDetailReducer,
        instructorCourse:instructorCourseReducer,
        videoUrl:videoUrlReducer,
        sameCategory:sameCategoryReducer,
        coursePurchaseDetail:coursePurchaseDetailReducer,
>>>>>>> branch
    }

})

export default store
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch