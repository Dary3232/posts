import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        // login user
    },
    logout: (state) => {
        //logout user
    },
    registerUser: (state, action) => {
        //register user 
    }
  },
})


export const { login, logout, registerUser } = authSlice.actions

export default authSlice.reducer