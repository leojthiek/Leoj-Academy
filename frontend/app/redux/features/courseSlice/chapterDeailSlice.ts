import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const getChapterDetailAction = createAsyncThunk(
  "course/chapterDetail",
  async (chapterId:string) => {
    try {
      const response = await api.get(
        `/api/courses/chapter/${chapterId}`,

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

const chapterDetailReducer = createSlice({
  name: "chapterDetail",
  initialState: {
    chapter:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChapterDetailAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(getChapterDetailAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.chapter = action.payload)
      })
      .addCase(getChapterDetailAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default chapterDetailReducer.reducer
