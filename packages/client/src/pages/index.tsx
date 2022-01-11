import React from 'react'
import { auth, firestore, googleProvider } from '@/lib/db/firebase-web'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import TrendingAuction from '@/components/TrendingAuctions'
import Footer from '@/components/Footer'

export default function index() {
  return (
    <div>
      <TrendingAuction />
      <Footer />
    </div>
  )
}
