import type { NextApiRequest, NextApiResponse } from 'next'
import { PublicAddress, User } from 'src/constants/clientTypes'
import { db, auth } from '@/lib/db/index'
import { dummyData } from '@/lib/mocks'

function createNonce() {
  return Math.floor(Math.random() * 1000000)
}

export async function addUser(user: User) {
  const docRef = await db.collection('users').add(user)
  return docRef
}

export async function doesUserExist(pa: PublicAddress) {
  const userRef = await db.collection('users').doc(pa)
  const doc = await userRef.get()
  if (!doc.exists) return false
  return true
}

export default async function handleLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userRef = await addUser(dummyData[0])
  res.status(200).send(userRef.id)
}
