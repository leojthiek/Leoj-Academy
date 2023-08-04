import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const createChapterAction = createAsyncThunk(
  "course/create",
  async (chapterData,id) => {
    try {
      const response = await api.post(
        `/api/courses/admin/chapter/create/${id}`,
        {chapterData},
        { headers: { "Content-Type": "application/json" } }
      )
      const chapter = response.data.chapters
      return chapter
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const createChapterReducer = createSlice({
  name: "registerUser",
  initialState: {
    chapters:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChapterAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(createChapterAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.chapters = action.payload)
      })
      .addCase(createChapterAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default createChapterReducer.reducer
