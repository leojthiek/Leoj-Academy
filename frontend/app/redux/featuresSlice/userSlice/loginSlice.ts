import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/baseApi"

export const loginAction = createAsyncThunk(
  "users/login",
  async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const response = await api.post(
        `/api/users/login`,
        {
          email,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      const {user,token} = response.data
      console.log(response.data.user)
      localStorage.setItem("userInformation", JSON.stringify(user,token))

      return {user,token}
    } catch (error: string | any) {
      throw new Error(error.response.data.errors || JSON.stringify(error.response.data.errors))
    }
  }
)

const loginReducer = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null as string | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true
        state.error = false
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        ;(state.loading = false), (state.user = action.payload.user)
      })
      .addCase(loginAction.rejected, (state, action) => {
        ;(state.loading = false), (state.error = action.error.message)
      })
  },
})

export default loginReducer.reducer
