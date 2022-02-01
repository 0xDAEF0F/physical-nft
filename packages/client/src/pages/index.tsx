import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { selectToken, setAuthUserInfo } from 'src/features/user/userSlice'
import { signInWithCustomToken } from 'firebase/auth'
import { auth } from '@/lib/index'
import Profile from '@/components/Profile'

export default function Index() {
  const jwt = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage?.getItem('token')
    if (!token) return
    signInWithCustomToken(auth, token)
      .then((user) => {
        const dataToPersistInReduxStore = {
          token,
          displayName: user.user.displayName,
          email: user.user.email,
          uid: user.user.uid,
        }
        dispatch(setAuthUserInfo(dataToPersistInReduxStore))
      })
      .catch((err) => console.error(err))
  }, [jwt])

  return (
    <div>
      <Profile />
    </div>
  )
}
