import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '@/app/api/baseApi'


 export const getTopCourseAction = createAsyncThunk('course/getTopFourCourse',async()=>{
    try {
        const response = await api.get('/api/courses/topCourse')
        return response.data
    } catch (error:any) {
       throw new Error(error.response.data.errors)
    }
})

  const getTopCourseReducer = createSlice({
    name:'getTopCourse',
    initialState:{
        topCourse:[],
        loading:false,
        error:null as unknown
    },
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getTopCourseAction.pending,(state)=>{
            state.loading=true,
            state.error = null
        })
        .addCase(getTopCourseAction.fulfilled,(state,action)=>{
            state.loading= false,
            state.topCourse= action.payload
        })
        .addCase(getTopCourseAction.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.error.message
        })
    }
    
})

export default getTopCourseReducer.reducer


