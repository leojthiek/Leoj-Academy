import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '@/app/api/baseApi'

export const getCourseDetailsActions = createAsyncThunk('course/getCourseDetail',async(courseId:string)=>{
    try {
        const response = await api.get(`/api/courses/courseDetail/${courseId}`)
        return response.data.course
    } catch (error:any) {
       throw new Error(error.response.data.errors)
    }
})


const courseDetailReducer = createSlice({
    name:'getCourseDetail',
    initialState:{
        course:null,
        loading:false,
        error:null as unknown
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getCourseDetailsActions.pending,(state)=>{
            state.loading = true
            state.error = false
        })
        .addCase(getCourseDetailsActions.fulfilled, (state,action)=>{
            state.loading = false,
            state.course = action.payload
        })
        .addCase(getCourseDetailsActions.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
})

export default courseDetailReducer.reducer


