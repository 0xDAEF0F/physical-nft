import {
  MessageForUserToSign,
  Nonce,
  PublicAddress,
  SignedMessage,
  SIGN_NONCE_MESSAGE,
} from '@/constants/index'
import detectEthereumProvider from '@metamask/detect-provider'
import { utils, ethers, providers } from 'ethers'
import { to } from 'await-to-js'

export function generateNonce(): Nonce {
  return Math.floor(Math.random() * 10000000)
}

export async function createProvider(): Promise<ethers.providers.Web3Provider> {
  const ethereumWindowObject = await detectEthereumProvider()
  return new Promise((res, rej) => {
    if (!ethereumWindowObject) {
      rej('Metamask not installed in browser.')
    }
    const provider = new providers.Web3Provider(
      ethereumWindowObject as ethers.providers.ExternalProvider
    )
    res(provider)
  })
}

export async function getPublicAddressFromMetamask() {
  const [err, provider] = await to(createProvider())
  if (!provider) {
    console.error(err)
    return
  }
  await provider.send('eth_requestAccounts', [])
  const [err2, address] = await to(provider.getSigner().getAddress())
  if (!address) {
    console.error(err2)
    return
  }
  return address
}

export function getAddressWhichSignedNonce(nonce: Nonce, sig: SignedMessage) {
  const completeMessage: MessageForUserToSign = SIGN_NONCE_MESSAGE + nonce
  const pertainingPublicAddress: PublicAddress = utils.verifyMessage(
    completeMessage,
    sig
  )
  return pertainingPublicAddress
}

export async function signNonceAndReturnMessage(nonce: Nonce) {
  const [err, provider] = await to(createProvider())
  if (!provider) {
    console.error(err)
    return
  }
  const signer = provider.getSigner()
  const [err2, signedMessage] = await to(
    signer.signMessage(SIGN_NONCE_MESSAGE + nonce)
  )
  if (!signedMessage) {
    console.error(err2)
    return
  }
  return signedMessage
}
