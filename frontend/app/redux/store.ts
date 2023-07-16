import {configureStore} from '@reduxjs/toolkit'
import videoSliceReducer from './featuresSlice/contentSlice/contentSlice'
import courseDetailReducer from './featuresSlice/courseSlice/courseDetailSlice'
import getTopCourseReducer from './featuresSlice/courseSlice/topCourseSlice'
import InstructorCourseReducer from './featuresSlice/courseSlice/instructorCOurseSlice'
import loginReducer from './featuresSlice/userSlice/loginSlice'
import registerReducer from './featuresSlice/userSlice/registerSlice'


const store = configureStore({
    reducer:{
        videoSlice:videoSliceReducer,
        courseDetail:courseDetailReducer,
        topCourse:getTopCourseReducer,
        instructorCourse:InstructorCourseReducer,
        login:loginReducer,
        register:registerReducer
    }
})

export default store

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch