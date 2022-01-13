import { PublicAddress, User } from '../constants'
import { auth, db } from './index'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { to } from 'await-to-js'

async function createFirestoreUser(userObj: User) {
  const docRefToCreate = doc(db, 'users', userObj.publicAddress)
  const [err, _] = await to(setDoc(docRefToCreate, userObj))
  if (err instanceof Error) {
    console.error('User could not be created.', err)
    return false
  }
  return true
}

async function getFirestoreUser(pa: PublicAddress) {
  const [err, userSnapshot] = await to(getDoc(doc(db, 'users', pa)))
  if (userSnapshot?.exists()) {
    return userSnapshot.data()
  }
  if (err instanceof Error) {
    console.error('Could not fetch user.', err)
  }
  // Code to query database
  // const usersRef = collection(db, 'users')
  // const query1 = query(usersRef, where('publicAddress', '==', pa))
  // const [err, querySnapshot] = await to(getDocs(query1))
  // return querySnapshot?.forEach((doc) => {
  //   console.log(doc)
  // })
}

async function isUserRegistered(pa: PublicAddress) {
  const userSnapshot = await getDoc(doc(db, 'users', pa))
  if (userSnapshot?.exists()) {
    return true
  }
  return false
}

export { createFirestoreUser, getFirestoreUser, isUserRegistered }
