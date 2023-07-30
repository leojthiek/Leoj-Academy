import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

export const registerAction = createAsyncThunk(
  "user/register",
  async ({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) => {
    try {
      const response = await api.post(
        "/api/users/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      const user = response.data.user
      return user
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

const registerReducer = createSlice({
  name: "registerUser",
  initialState: {
    user: null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        ;(state.loading = true), (state.error = false)
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.user = action.payload)
      })
      .addCase(registerAction.rejected, (state, action) => {
        ;(state.error = action.error.message), (state.loading = false)
      })
  },
})

export default registerReducer.reducer
