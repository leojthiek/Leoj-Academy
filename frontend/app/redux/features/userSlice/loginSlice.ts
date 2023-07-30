import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/app/api/api"

const USER_LOCAL_STORAGE_KEY = "userInformation";
const userFromLocalStorage =
  typeof window !== "undefined" ? localStorage.getItem(USER_LOCAL_STORAGE_KEY) : null;

  const initialState = {
    user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
    loading: false,
    error: null as string | unknown,
  };

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
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
      }
      return user
    } catch (error: string | any) {
      console.log(error)
      throw new Error(
        error.response.data.errors || JSON.stringify(error.response.data.errors)
      )
    }
  }
)

 export const logoutAction = createAsyncThunk("user/logout",async()=>{
  try {
    if(typeof window !== "undefined"){
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
    }
    return null
  } catch (error) {
    console.log(error)
  }
})

const loginUserReducer = createSlice({
  name: "loginUser",
  initialState,
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
      .addCase(logoutAction.fulfilled,(state)=>{
        state.user = null
      })
  },
})

export default loginUserReducer.reducer
