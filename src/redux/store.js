import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postsSlice'
import authSlice from './slices/authSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authSlice
  },
})