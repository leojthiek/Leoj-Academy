import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const getAllChapterAction = createAsyncThunk(
  "course/chapterDetail",
  async (courseId:string) => {
    try {
      const response = await api.get(
        `/api/courses/${courseId}`,

        { headers: { "Content-Type": "application/json" } }
      )
      const chapter = response.data.chapter
      return chapter
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const getAllChapterReducer = createSlice({
  name: "chapterDetail",
  initialState: {
    chapters:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChapterAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getAllChapterAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.chapters = action.payload)
      })
      .addCase(getAllChapterAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default getAllChapterReducer.reducer
