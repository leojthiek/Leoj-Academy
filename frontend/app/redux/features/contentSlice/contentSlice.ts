import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"



export const fetchVideoUrl = createAsyncThunk(
  "course/fetchVideoUrl",
  async ({ id,bucketName,keyName}:{id:string,bucketName:string,keyName:string},thunkApi) => {
    try {
      const {loginUser:{user}}=thunkApi.getState() as {loginUser:{user:{token:string}}}
      const response = await api.get(
        `/api/content/video/${id}`,{params:{bucketName,keyName},headers:{'Content-Type':'application/json','Authorization':`Bearer ${user.token}`}}
      )
      const course = response.data.url
      return course
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const videoUrlReducer = createSlice({
  name: "fetchVideoUrl",
  initialState: {
    url:"",
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoUrl.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(fetchVideoUrl.fulfilled, (state, action) => {
        ;(state.loading = false), (state.url = action.payload)
      })
      .addCase(fetchVideoUrl.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default videoUrlReducer.reducer
