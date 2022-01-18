import {
  CREATE_USER_ERROR,
  DUPLICATE_USER,
  FETCH_USER_DB_ERROR,
  PublicAddress,
  Username,
} from '../constants'
import { User } from '@/constants/schema'
import { db } from './index'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { to } from 'await-to-js'
import {
  Config,
  colors,
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator'

const customConfig: Config = {
  dictionaries: [colors, adjectives, animals],
  separator: '_',
  length: 2,
}

async function createUserDb(userObj: User) {
  const { publicAddress } = userObj
  if (await isUserRegistered(publicAddress)) {
    console.error(DUPLICATE_USER)
    return false
  }
  const docRefToCreate = doc(db, 'users', userObj.publicAddress)
  const [err, _] = await to(setDoc(docRefToCreate, userObj))
  if (err instanceof Error) {
    console.error(CREATE_USER_ERROR, err)
    return false
  }
  return true
}

async function getUserDb(pa: PublicAddress) {
  const [err, userSnapshot] = await to(getDoc(doc(db, 'users', pa)))
  if (userSnapshot?.exists()) {
    return userSnapshot.data()
  }
  if (err instanceof Error) {
    console.error(FETCH_USER_DB_ERROR, err)
  }
}

async function isUsernameAvailable(username: Username) {
  const usernamesRef = collection(db, 'users')
  const query1 = query(usernamesRef, where('username', '==', username))
  const querySnapshot = await getDocs(query1)
  if (querySnapshot.empty) return true
  return false
}

async function areUsernamesAvailable(arr: Username[]) {
  const usernamesRef = collection(db, 'users')
  const query1 = query(usernamesRef, where('username', 'in', arr))
  const querySnapshot = await getDocs(query1)
  if (querySnapshot.empty) return true
  return false
}

async function isUserRegistered(pa: PublicAddress) {
  const userSnapshot = await getDoc(doc(db, 'users', pa))
  if (userSnapshot?.exists()) {
    return true
  }
  return false
}

async function generateUsernameSuggestions() {
  const suggestions = [1, 2, 3, 4, 5].map(() =>
    uniqueNamesGenerator(customConfig)
  )
  if (await areUsernamesAvailable(suggestions)) {
    return suggestions
  }
  return []
}

export {
  createUserDb,
  getUserDb,
  isUserRegistered,
  isUsernameAvailable,
  generateUsernameSuggestions,
}
