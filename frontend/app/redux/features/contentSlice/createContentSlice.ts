import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const createContentAction = createAsyncThunk(
  "course/create",
  async (contentData,id) => {
    try {
      const response = await api.post(
        `/api/courses/admin/chapter/create/${id}`,
        {contentData},
        { headers: { "Content-Type": "application/json" } }
      )
      const content = response.data.content
      return content
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const createContentReducer = createSlice({
  name: "registerUser",
  initialState: {
    content:null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContentAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(createContentAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.content = action.payload)
      })
      .addCase(createContentAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default createContentReducer.reducer
