import {
  getApp,
  getApps,
  initializeApp,
  cert,
  ServiceAccount,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import serviceAccount from '../../../phys-service-acct.json'

function createFirebaseAdminApp() {
  if (getApps().length === 0) {
    return initializeApp({ credential: cert(serviceAccount as ServiceAccount) })
  } else {
    return getApp()
  }
}
export const app = createFirebaseAdminApp()
export const db = getFirestore()
export const auth = getAuth()
