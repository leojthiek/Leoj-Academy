import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const getTopCourseAction = createAsyncThunk(
  "course/getTopCourse",
  async () => {
    try {
      const response = await api.get(
        "/api/courses/topCourse",

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

const getTopCourseReducer = createSlice({
  name: "topCourse",
  initialState: {
    course: [],
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopCourseAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getTopCourseAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(getTopCourseAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default getTopCourseReducer.reducer
