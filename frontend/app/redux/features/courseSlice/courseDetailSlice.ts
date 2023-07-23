import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const getCourseDetailAction = createAsyncThunk(
  "course/courseDetail",
  async (courseId:string) => {
    try {
      const response = await api.get(
        `/api/courses/courseDetail/${courseId}`,

        { headers: { "Content-Type": "application/json" } }
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

const courseDetailReducer = createSlice({
  name: "courseDetail",
  initialState: {
    course:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseDetailAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getCourseDetailAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(getCourseDetailAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default courseDetailReducer.reducer
