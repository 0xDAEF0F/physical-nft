import { getApp, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

function createFirebaseAdminApp() {
  if (getApps().length === 0) {
    return initializeApp()
  } else {
    return getApp()
  }
}
export const app = createFirebaseAdminApp()
export const db = getFirestore()
export const auth = getAuth()
