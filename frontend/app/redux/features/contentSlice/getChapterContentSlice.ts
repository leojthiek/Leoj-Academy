import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const getAllChapterContentAction = createAsyncThunk(
  "course/chapterContent",
  async (chapterId:string) => {
    try {
      const response = await api.get(
        `/api/content/chapter/${chapterId}`,

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

const getAllChapterContentReducer = createSlice({
  name: "chapterDetail",
  initialState: {
    contents:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChapterContentAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getAllChapterContentAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.contents = action.payload)
      })
      .addCase(getAllChapterContentAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default getAllChapterContentReducer.reducer
