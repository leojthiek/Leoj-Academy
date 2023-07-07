import {configureStore} from '@reduxjs/toolkit'
import videoSliceReducer from './featuresSlice/contentSlice/contentSlice'
import courseDetailReducer from './featuresSlice/courseSlice/courseDetailSlice'
import getTopCourseReducer from './featuresSlice/courseSlice/topCourseSlice'
import InstructorCourseReducer from './featuresSlice/courseSlice/instructorCOurseSlice'


const store = configureStore({
    reducer:{
        videoSlice:videoSliceReducer,
        courseDetail:courseDetailReducer,
        topCourse:getTopCourseReducer,
        instructorCourse:InstructorCourseReducer
    }
})

export default store

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch