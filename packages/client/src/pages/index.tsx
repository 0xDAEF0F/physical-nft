import React from 'react'
import { auth, googleProvider } from 'lib/firebase'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import TrendingAuction from '@/components/TrendingAuctions'

export default function index() {
  return (
    <div>
      <TrendingAuction />
    </div>
  )
}
