import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from 'src/server'
import to from 'await-to-js'
import {
  createUserNonce,
  isUserInAuthDb,
  isUserInFirestoreDb,
} from 'src/server/server-firebase-helpers'
import { utils } from 'ethers'
import {
  REQUEST_METHOD_ERR,
  CREDENTIALS_MISSING,
  CREATE_USER_ERROR,
  DUPLICATE_USER,
  FETCH_USER_DB_ERROR,
  AuthFirebaseUser,
} from '@/constants/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') return res.status(405).send(REQUEST_METHOD_ERR)

  const { username, email, publicAddress } = req.body
  if (!publicAddress || !utils.isAddress(publicAddress) || !username)
    return res.status(400).send(CREDENTIALS_MISSING)

  const [err1, isExistingUserArr] = await to(
    Promise.all([
      isUserInAuthDb(publicAddress),
      isUserInFirestoreDb(publicAddress),
    ])
  )
  if (err1 instanceof Error) return res.status(503).send(FETCH_USER_DB_ERROR)
  if (isExistingUserArr && (isExistingUserArr[0] || isExistingUserArr[1]))
    return res.status(400).send(DUPLICATE_USER)

  const userToCreateAuth: AuthFirebaseUser = !email
    ? {
        uid: publicAddress,
        displayName: username,
        // disabled: true,
      }
    : {
        uid: publicAddress,
        displayName: username,
        email,
        emailVerified: false,
        // disabled: true,
      }

  const [err2, values2] = await to(
    Promise.all([
      auth.createUser(userToCreateAuth),
      createUserNonce(publicAddress),
    ])
  )
  if (!values2 || err2 instanceof Error)
    return res.status(503).send(CREATE_USER_ERROR)

  const [, nonce] = values2
  return res.status(200).send(nonce)
}
