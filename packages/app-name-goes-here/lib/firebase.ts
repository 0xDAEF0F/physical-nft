import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'physical-nft.firebaseapp.com',
  projectId: 'physical-nft',
  storageBucket: 'physical-nft.appspot.com',
  messagingSenderId: '443902102630',
  appId: '1:443902102630:web:39cb287781535ba850b1a7',
  measurementId: 'G-XCJMPKK1YL',
}

const firebaseApp = initializeApp(firebaseConfig)

const analytics = getAnalytics(firebaseApp)

export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export default firebaseApp
