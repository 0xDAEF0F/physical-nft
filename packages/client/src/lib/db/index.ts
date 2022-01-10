import { initializeApp, getApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { Auth, getAuth } from 'firebase-admin/auth'

let db: Firestore
let auth: Auth

if (typeof window === 'undefined') {
  try {
    getApp()
  } catch {
    initializeApp()
  }
  db = getFirestore()
  auth = getAuth()
}

export { db, auth }
