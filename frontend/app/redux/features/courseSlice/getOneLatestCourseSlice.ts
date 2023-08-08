import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const getOneLatestCourseAction = createAsyncThunk(
  "course/getLatest",
  async () => {
    try {
      const response = await api.get(
        "/api/courses/admin/course/latest",

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

const getOneLatestCourseReducer = createSlice({
  name: "getOneCourse",
  initialState: {
    course:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneLatestCourseAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getOneLatestCourseAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(getOneLatestCourseAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default getOneLatestCourseReducer.reducer
