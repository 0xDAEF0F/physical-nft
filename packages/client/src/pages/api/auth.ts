import {
  CREDENTIALS_MISSING,
  INVALID_PK,
  REQUEST_METHOD_ERR,
  SIGNED_NONCE_INVALID,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '@/constants/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAddressWhichSignedNonce } from '@/utilities/index'
import {
  isUserInAuthDb,
  isUserInFirestoreDb,
  updateNonceAndReturnIfSuccess,
} from '@/lib/server/server-firebase-helpers'
import { utils } from 'ethers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') return res.status(401).send(REQUEST_METHOD_ERR)

  const { publicAddress, signedMessage, nonce } = req.body
  if (!publicAddress || !signedMessage || !nonce)
    return res.status(401).send(CREDENTIALS_MISSING)

  if (!utils.isAddress(publicAddress)) return res.status(400).send(INVALID_PK)

  if (
    !(await isUserInAuthDb(publicAddress)) ||
    !(await isUserInFirestoreDb(publicAddress))
  )
    return res.status(401).send(USER_DOES_NOT_EXIST)

  const signerAddress = getAddressWhichSignedNonce(nonce, signedMessage)
  if (signerAddress !== publicAddress)
    return res.status(401).send(SIGNED_NONCE_INVALID)

  const updatedNonce = await updateNonceAndReturnIfSuccess(publicAddress)
  if (!updatedNonce) return res.status(503).send(USER_UPDATE_ERROR)

  return res.status(200).send('AUTHORIZED')
}
