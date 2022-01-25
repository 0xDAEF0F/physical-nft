import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../app/store'

export type UserAuth = {
  token: string
}

const initialState = {
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    removeToken: (state) => {
      state.token = ''
    },
  },
})

export const { setToken, removeToken } = userSlice.actions

export const selectToken = (state: AppState) => state.user.token

export default userSlice.reducer
