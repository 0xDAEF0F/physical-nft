import { createSlice } from '@reduxjs/toolkit'
import type { AppState } from '../../app/store'

export type Theme = 'light' | 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggleTheme: (state) => {
      if (state === 'light') {
        return 'dark'
      }
      return 'light'
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state: AppState) => state.theme

export default themeSlice.reducer
