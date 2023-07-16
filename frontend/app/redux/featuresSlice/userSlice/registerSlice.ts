import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/baseApi"

export const registerUserAction = createAsyncThunk(
  "users/register",
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
        `/api/users/register`,
        {
          username,
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      // const userInfo = response.data.user
      // localStorage.setItem("userInformation", JSON.stringify(userInfo))

      return  response.data.user
    } catch (error: string | any) {
      throw new Error(error.response.data.errors || JSON.stringify(error.response.data.errors))
    }
  }
)

const registerUserReducer = createSlice({
  name: "registerUser",
  initialState: {
    user: null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.user = action.payload)
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        ;(state.loading = false), (state.error = action.error.message)
      })
  },
})

export default registerUserReducer.reducer
