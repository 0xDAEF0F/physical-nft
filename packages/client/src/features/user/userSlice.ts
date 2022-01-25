import { AuthFirebaseUser } from '@/constants/index'
import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../app/store'

export type UserAuth = Pick<
  AuthFirebaseUser,
  'displayName' | 'email' | 'uid'
> & {
  token: string
}

const initialState = {
  token: '',
  displayName: '',
  email: '',
  uid: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUserInfo: (_, action) => {
      return action.payload
    },
    removeToken: (state) => {
      state.token = ''
    },
    setNewToken: (state, action) => {
      state.token = action.payload
    },
    clearUserInfo: () => {
      return initialState
    },
  },
})

export const { setAuthUserInfo, removeToken, setNewToken, clearUserInfo } =
  userSlice.actions

export const selectToken = (state: AppState) => state.user.token
export const selectUsername = (state: AppState) => state.user.displayName

export default userSlice.reducer
