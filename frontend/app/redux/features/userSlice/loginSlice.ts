import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const loginAction = createAsyncThunk(
  "user/login",
  async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const response = await api.post(
        "/api/users/login",
        {  email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      const user = response.data.userInfo
      localStorage.setItem("userInformation",JSON.stringify(user))
      return user
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const loginUserReducer = createSlice({
  name: "loginUser",
  initialState: {
    user: null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.user = action.payload)
      })
      .addCase(loginAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default loginUserReducer.reducer
