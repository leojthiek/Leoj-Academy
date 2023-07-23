import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const getInstructorCourse = createAsyncThunk(
  "course/instructor/course",
  async (courseId:string) => {
    try {
      const response = await api.get(
        `/api/courses/instructor/course/${courseId}`,

        { headers: { "Content-Type": "application/json" } }
      )
      const course = response.data.instructorCourse
      return course
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const instructorCourseReducer = createSlice({
  name: "instructorCourse",
  initialState: {
    course:[],
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructorCourse.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getInstructorCourse.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(getInstructorCourse.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default instructorCourseReducer.reducer
