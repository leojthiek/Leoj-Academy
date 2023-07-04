import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '@/app/api/baseApi'


 export const getTopCourseAction = createAsyncThunk('course/getTopFourCourse',async(_,{rejectWithValue})=>{
    try {
        const response = await api.get('/api/courses/topCourse')
        return response.data
    } catch (error:any) {
        if(error.response && error.response.data){
            return rejectWithValue(error.response.data)
        }else{
            return rejectWithValue({message:'error occur hile tring to fetch a data'})
        }
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
            state.error = action.error
        })
    }
    
})

export default getTopCourseReducer.reducer


