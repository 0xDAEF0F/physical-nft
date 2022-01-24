import { FirebaseOptions, getApp, initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'physical-nft.firebaseapp.com',
  projectId: 'physical-nft',
  storageBucket: 'physical-nft.appspot.com',
  messagingSenderId: '443902102630',
  appId: '1:443902102630:web:39cb287781535ba850b1a7',
  measurementId: 'G-XCJMPKK1YL',
}

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

if (location.host.includes('localhost')) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export default firebaseApp
