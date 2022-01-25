import React, { useEffect } from 'react'
import EditProfile from '@/components/EditProfile'
import { useAppDispatch } from 'src/app/hooks'
import { setToken } from 'src/features/user/userSlice'

export default function Index() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage?.getItem('token')
    if (token) dispatch(setToken(token))
  }, [])

  return (
    <div>
      <EditProfile />
    </div>
  )
}
