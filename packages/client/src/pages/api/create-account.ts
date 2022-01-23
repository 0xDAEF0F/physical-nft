import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '@/lib/server'
import to from 'await-to-js'
import {
  createUserNonce,
  isUserInAuthDb,
  isUserInFirestoreDb,
} from '@/lib/server/server-firebase-helpers'
import { utils } from 'ethers'
import {
  REQUEST_METHOD_ERR,
  CREDENTIALS_MISSING,
  CREATE_USER_ERROR,
  DUPLICATE_USER,
  FETCH_USER_DB_ERROR,
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

  const userToCreateAuth = {
    uid: publicAddress,
    email,
    emailVerified: false,
    displayName: username,
    disabled: true,
  }

  const [err2, values2] = await to(
    Promise.all([
      auth.createUser(userToCreateAuth),
      createUserNonce(publicAddress),
    ])
  )
  if (!values2 || err2 instanceof Error)
    return res.status(503).send(CREATE_USER_ERROR)

  return res.status(200).send(values2[1])
}
