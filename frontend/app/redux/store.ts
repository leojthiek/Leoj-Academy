import {configureStore} from '@reduxjs/toolkit'
import videoSliceReducer from './featuresSlice/contentSlice/contentSlice'
import courseDetailReducer from './featuresSlice/courseSlice/courseDetailSlice'
import getTopCourseReducer from './featuresSlice/courseSlice/topCourseSlice'


const store = configureStore({
    reducer:{
        videoSlice:videoSliceReducer,
        courseDetail:courseDetailReducer,
        topCourse:getTopCourseReducer
    }
})

export default store

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch