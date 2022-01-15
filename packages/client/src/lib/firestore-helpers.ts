import {
  CREATE_USER_ERROR,
  DUPLICATE_USER,
  FETCH_USER_DB_ERROR,
  PublicAddress,
  User,
} from '../constants'
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
import toast from 'react-hot-toast'

async function createUserDb(userObj: User) {
  const { publicAddress } = userObj
  if (await isUserRegistered(publicAddress)) {
    console.error(DUPLICATE_USER)
    return
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

export { createUserDb, getUserDb, isUserRegistered }
