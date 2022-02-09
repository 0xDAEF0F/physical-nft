import { ArtistDb } from '@/constants/firestore-types'
import { CREATE_USER_ERROR, PublicAddress } from '@/constants/index'
import { generateNonce } from '@/utilities/index'
import to from 'await-to-js'
import { flatten, uniqBy } from 'lodash'
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
  const [_, timestamp] = await to(userRef.set({ nonce }))
  if (!timestamp) throw new Error(CREATE_USER_ERROR)
  return nonce
}

export async function updateNonceAndReturnIfSuccess(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const newNonce = generateNonce()
  const [err, timestamp] = await to(userRef.update({ nonce: newNonce }))
  if (!timestamp) throw new Error(err?.message)
  return timestamp
}

export async function getUserData(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const userData = await userRef.get()
  if (userData.exists) return userData
}

export async function createArtist(artist: ArtistDb) {
  const artistQuery = await db
    .collection('artists')
    .where('stageName', '==', artist.stageName)
    .get()
  if (!artistQuery.empty) return 'Artist Exists'
  const [err, ref] = await to(db.collection('artists').add(artist))
  if (!ref) throw new Error(err?.message)
  return ref.id
}

export async function createArtistsBatch(artists: ArtistDb[][]) {
  const batch = db.batch()
  const noDuplicateArr = uniqBy(flatten(artists), 'stageName')
  noDuplicateArr.forEach((artist) => {
    const artistRef = db.collection('artists').doc()
    batch.create(artistRef, artist)
  })
  return batch.commit()
}
