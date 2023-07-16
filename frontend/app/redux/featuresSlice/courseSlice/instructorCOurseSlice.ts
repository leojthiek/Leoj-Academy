import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '@/app/api/baseApi'


 export const getInstructorCourseAction = createAsyncThunk('course/getInstructorCourse/:id',async(courseId:string)=>{
    try {
        const response = await api.get(`/api/courses/instructor/course/${courseId}`)
        return response.data
    } catch (error:any) {
       throw new Error(error.response.data.errors)
    }
})

  const InstructorCourseReducer = createSlice({
    name:'instructorCourse',
    initialState:{
        instructorCourse:[],
        loading:false,
        error:null as unknown
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getInstructorCourseAction.pending,(state)=>{
            state.loading=true,
            state.error = null
        })
        .addCase(getInstructorCourseAction.fulfilled,(state,action)=>{
            state.loading= false,
            state.instructorCourse= action.payload
        })
        .addCase(getInstructorCourseAction.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
    
})

export default InstructorCourseReducer.reducer


