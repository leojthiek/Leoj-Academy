import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const sameCategoryCourseAction = createAsyncThunk(
  "course/sameCategory",
  async (courseId:string) => {
    try {
      const response = await api.get(
        `/api/courses/category/course/${courseId}`,

        { headers: { "Content-Type": "application/json" } }
      )
      const course = response.data.courseCategory
      return course
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const sameCategoryReducer = createSlice({
  name: "sameCategory",
  initialState: {
    courses: [],
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sameCategoryCourseAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(sameCategoryCourseAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.courses = action.payload)
      })
      .addCase(sameCategoryCourseAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default sameCategoryReducer.reducer
