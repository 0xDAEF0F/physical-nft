import { CREATE_USER_ERROR, PublicAddress } from '@/constants/index'
import { generateNonce } from '@/utilities/index'
import to from 'await-to-js'
import { db, auth } from './index'

export async function isUserInFirestoreDb(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const userData = await userRef.get()
  if (userData.exists) return true
  return false
}

export async function isUserInAuthDb(pa: PublicAddress) {
  const [_, userRecord] = await to(auth.getUser(pa))
  if (userRecord) return true
  return false
}

export async function createUserNonce(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const nonce = generateNonce()
  const timestamp = await userRef.set({ nonce })
  if (!timestamp) throw new Error(CREATE_USER_ERROR)
  return nonce
}

export async function updateNonceAndReturnIfSuccess(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const newNonce = generateNonce()
  const timestamp = await userRef.update({ nonce: newNonce })
  if (timestamp) return newNonce
}

export async function getUserData(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const userData = await userRef.get()
  if (userData.exists) return userData
}
