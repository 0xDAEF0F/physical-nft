import {
  CREDENTIALS_MISSING,
  INVALID_PK,
  Nonce,
  PK_RETRIEVAL_FAILURE,
  PublicAddress,
  REQUEST_METHOD_ERR,
  SignedMessage,
  SIGNED_NONCE_INVALID,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '@/constants/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/server'
import { getAddressWhichSignedNonce, generateNonce } from '@/utilities/index'
import { utils } from 'ethers'

async function getUserData(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const userData = await userRef.get()
  if (userData.exists) return userData
}

async function updateNonceAndReturnIfSuccess(pa: PublicAddress) {
  const userRef = db.collection('users').doc(pa)
  const newNonce = generateNonce()
  const timestamp = await userRef.update({ nonce: newNonce })
  if (timestamp) return newNonce
}

interface CustomNextApiReq extends NextApiRequest {
  query: { publicAddress: PublicAddress[] | PublicAddress }
  body: {
    publicAddress: PublicAddress
    nonce: Nonce
    signedMessage: SignedMessage
  }
}

export default async function handler(
  req: CustomNextApiReq,
  res: NextApiResponse<Nonce | string>
) {
  if (req.method === 'GET') {
    let { publicAddress } = req.query
    publicAddress =
      publicAddress instanceof Array ? publicAddress[0] : publicAddress
    if (!publicAddress) return res.status(401).send(PK_RETRIEVAL_FAILURE)
    if (!utils.isAddress(publicAddress)) return res.status(400).send(INVALID_PK)
    const docData = await getUserData(publicAddress)
    if (!docData) return res.status(401).send(USER_DOES_NOT_EXIST)
    const updatedNonce = await updateNonceAndReturnIfSuccess(publicAddress)
    if (!updatedNonce) return res.status(503).send(USER_UPDATE_ERROR)
    return res.status(200).send(updatedNonce)
  }
  if (req.method === 'PUT') {
    const { publicAddress, signedMessage, nonce } = req.body
    if (!publicAddress || !signedMessage || !nonce)
      return res.status(401).send(CREDENTIALS_MISSING)
    const addressSignedNonce = getAddressWhichSignedNonce(nonce, signedMessage)
    if (addressSignedNonce === publicAddress) {
      const updatedNonce = await updateNonceAndReturnIfSuccess(publicAddress)
      if (!updatedNonce) return res.status(503).send(USER_UPDATE_ERROR)
      return res.status(200).send('AUTHORIZED')
    }
    return res.status(401).send(SIGNED_NONCE_INVALID)
  }
  return res.status(401).send(REQUEST_METHOD_ERR)
}
