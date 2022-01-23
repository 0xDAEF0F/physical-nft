import {
  FETCH_USER_DB_ERROR,
  INVALID_PK,
  PK_RETRIEVAL_FAILURE,
  REQUEST_METHOD_ERR,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '@/constants/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { utils } from 'ethers'
import to from 'await-to-js'
import {
  isUserInAuthDb,
  isUserInFirestoreDb,
  updateNonceAndReturnIfSuccess,
} from '@/lib/server/server-firebase-helpers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') return res.status(405).send(REQUEST_METHOD_ERR)

  let { publicAddress } = req.query
  publicAddress =
    publicAddress instanceof Array ? publicAddress[0] : publicAddress

  if (!publicAddress) return res.status(401).send(PK_RETRIEVAL_FAILURE)
  if (!utils.isAddress(publicAddress)) return res.status(400).send(INVALID_PK)

  const [err, resValues] = await to(
    Promise.all([
      isUserInAuthDb(publicAddress),
      isUserInFirestoreDb(publicAddress),
    ])
  )
  if (err instanceof Error) return res.status(503).send(FETCH_USER_DB_ERROR)
  if (resValues) {
    const [userInAuth, userInFirestoreDb] = resValues
    if (!userInAuth || !userInFirestoreDb)
      return res.status(401).send(USER_DOES_NOT_EXIST)
  }

  const updatedNonce = await updateNonceAndReturnIfSuccess(publicAddress)
  if (!updatedNonce) return res.status(503).send(USER_UPDATE_ERROR)

  return res.status(200).send(updatedNonce)
}
