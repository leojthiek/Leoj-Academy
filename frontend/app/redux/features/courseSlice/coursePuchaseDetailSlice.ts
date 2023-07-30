import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const coursePurchaseDetailAction = createAsyncThunk(
  "course/purchaseCourse",
  async ( id:string,thunkApi) => {
    try {
      const {loginUser:{user}}=thunkApi.getState() as {loginUser:{user:{token:string}}}
      const response = await api.get(
        `/api/courses/purchase/courseDetail/${id}`,{headers:{'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}}
      )
      const course = response.data.course
      return course
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const coursePurchaseDetailReducer = createSlice({
  name: "fetchVideoUrl",
  initialState: {
    course:null,
    loading: false,
    error: null as string | unknown
  },
  reducers: {
    resetCourse:(state)=>{
      state.course = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(coursePurchaseDetailAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(coursePurchaseDetailAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(coursePurchaseDetailAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})
export const {resetCourse} = coursePurchaseDetailReducer.actions
export default coursePurchaseDetailReducer.reducer
