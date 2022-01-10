import type { NextApiRequest, NextApiResponse } from 'next'
import { utils } from 'ethers'
import { initializeApp, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { dummyData } from '../../../lib/mocks'
import { PublicAddress, User } from 'src/constants/clientTypes'

function createFirebaseApp() {
  try {
    return getApp()
  } catch {
    return initializeApp()
  }
}
createFirebaseApp()
const db = getFirestore()

function createNonce() {
  return Math.floor(Math.random() * 1000000)
}

export async function addUser(user: User) {
  const userRef = await db.collection('users').add(user)
}

async function doesUserExist(pa: PublicAddress) {
  const userRef = await db.collection('users').doc(pa)
  const doc = await userRef.get()
  if (!doc.exists) return false
  return true
}

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { publicKey } = req.body
  const nonce = createNonce()
}
