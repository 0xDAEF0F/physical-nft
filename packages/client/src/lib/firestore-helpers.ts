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
import to from 'await-to-js'

async function createUser(userObj: User) {
  // const [err, userRef] = await to(addDoc(collection(db, 'users'), userObj))
  const docRefToCreate = doc(db, 'users', userObj.publicAddress)
  const [err, success] = await to(setDoc(docRefToCreate, userObj))
  if (success) return
  if (err) console.error(err)
}

async function fetchUser(pa: PublicAddress) {
  const [err, userSnapshot] = await to(getDoc(doc(db, 'users', pa)))
  if (userSnapshot?.exists()) {
    return userSnapshot.data()
  }
  if (err) {
    console.error(err)
  }
  // const usersRef = collection(db, 'users')
  // const query1 = query(usersRef, where('publicAddress', '==', pa))
  // const [err, querySnapshot] = await to(getDocs(query1))
  // return querySnapshot?.forEach((doc) => {
  //   console.log(doc)
  // })
}

export { createUser, fetchUser }
