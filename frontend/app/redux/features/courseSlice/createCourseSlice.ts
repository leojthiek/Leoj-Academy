import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const createCourseAction = createAsyncThunk(
  "course/create",
  async (courseData: {
    course_category: string;
    course_description: string;
    course_instructor: string;
    course_image:string,
    course_name: string;
    course_price: number | undefined;
  }) => {
    try {
      const response = await api.post(
        "/api/courses/admin/createCourse",
        courseData,
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

const createCourseReducer = createSlice({
  name: "registerUser",
  initialState: {
    course: null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCourseAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(createCourseAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.course = action.payload)
      })
      .addCase(createCourseAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default createCourseReducer.reducer
