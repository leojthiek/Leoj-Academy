import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "@/app/api/baseApi";

export const fetchVideoUrl = createAsyncThunk(
  "content/fetchVideoUrl",
  async ({ bucketName, keyName }: { bucketName: string; keyName: string }) => {
    try {
      const response = await api.get("/api/content/video", {
        params: { bucketName, keyName },
      })
      return response.data.url
      
    } catch (error:any) {
       throw new Error(error.response.data.error)
    }
  }
)

const videoSliceReducer = createSlice({
  name: "getVideo",
  initialState: {
    url: "",
    loading: false,
    error: null as unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoUrl.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVideoUrl.fulfilled, (state, action) => {
        state.loading = false
        state.url = action.payload
      })
      .addCase(fetchVideoUrl.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default videoSliceReducer.reducer
