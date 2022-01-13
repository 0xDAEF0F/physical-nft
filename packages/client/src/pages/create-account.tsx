import {
  createFirestoreUser,
  getFirestoreUser,
  isUserRegistered,
} from '@/lib/firestore-helpers'
import React, { useState } from 'react'
import {
  MessageForUserToSign,
  Nonce,
  PublicAddress,
  SignedMessage,
  User,
} from '../constants'
import { utils, ethers, providers, Wallet } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { to } from 'await-to-js'
import toast, { Toaster } from 'react-hot-toast'
import { customMessages } from '@/constants/index'
import { generateNonce } from 'src/utilities'

export default function CreateAccount() {
  const [userObj, setUserObj] = useState<User>()

  async function createProvider(): Promise<ethers.providers.Web3Provider> {
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

  async function getPublicAddressFromMetamask() {
    const [err, provider] = await to(createProvider())
    if (!provider) {
      console.error(err)
      toast.error(customMessages.metamaskNotInstalled)
      return
    }
    if (provider) {
      await provider.send('eth_requestAccounts', [])
      const [err2, address] = await to(provider.getSigner().getAddress())
      if (!address) {
        console.error(err2)
        toast.error(customMessages.publicKeyRetrievalFailed)
        return
      }
      return address
    }
  }

  async function signNonceAndReturnMessage(nonce: Nonce) {
    const [err, provider] = await to(createProvider())
    if (!provider) {
      console.error(err)
      toast.error(customMessages.metamaskNotInstalled)
      return
    }
    const signer = provider.getSigner()
    const [err2, signedMessage] = await to(
      signer.signMessage(customMessages.signNonceMessage + nonce)
    )
    if (!signedMessage) {
      console.error(err2)
      toast.error(customMessages.signedMessageFailed)
      return
    }
    return signedMessage
  }

  function getAddressWhichSignedNonce(nonce: Nonce, sig: SignedMessage) {
    const completeMessage: MessageForUserToSign =
      customMessages.signNonceMessage + nonce
    const pertainingPublicAddress: PublicAddress = utils.verifyMessage(
      completeMessage,
      sig
    )
    return pertainingPublicAddress
  }

  async function createUser(user: User) {
    const wasUserCreated = await createFirestoreUser(user)
    if (wasUserCreated) toast.success('User was created')
  }

  async function getUser() {
    const [err, userAddress] = await to(getPublicAddressFromMetamask())
    if (err) console.error(err)
    const [err2, userObject] = await to(
      getFirestoreUser(userAddress as PublicAddress)
    )
    if (err2) console.error(err2)
    if (userObject) setUserObj(userObject as User)
    if (!userObj) {
      toast.error('An account can not be fetched.')
    }
  }

  return (
    <div className='mt-10'>
      <h1 className='text-center font-extrabold text-3xl'>
        Please enter your information:
      </h1>
      <form className='flex-col flex items-center'>
        <h3 className='mt-5 text-lg font-semibold'>Your public address is:</h3>
        <input
          type='text'
          placeholder='Name'
          className='outline block rounded text-center m-5'
        />
        <input
          type='text'
          placeholder='Email'
          className='outline rounded block text-center mb-3'
        />
      </form>
      <div className='flex justify-center'>
        <button className='bg-black text-white rounded py-2 px-5 block mt-4 font-semibold shadow-xl mr-3'>
          Create account
        </button>
        <button
          onClick={async () => {
            const publicAddress = await getPublicAddressFromMetamask()
            if (!publicAddress) return
            const isValid = utils.isAddress(publicAddress)
            const isExistingUser = await isUserRegistered(publicAddress)
            if (!isValid) {
              toast.error('Please provide a valid address.')
              return
            }
            if (!isExistingUser) {
              // redirect to sign in
              toast.error('Create an account first')
              return
            }
            const nonce = generateNonce()
            const signedMessage = await signNonceAndReturnMessage(nonce)
            if (!signedMessage) return
            const addressWhichSignedTheNonce = getAddressWhichSignedNonce(
              nonce,
              signedMessage
            )
            if (addressWhichSignedTheNonce === publicAddress) {
              toast.success('Congrats! You are authenticated.')
              // return jwt
            }
          }}
          className='bg-black text-white rounded py-2 px-5 block mt-4 font-semibold shadow-xl'
        >
          Login
        </button>
      </div>
    </div>
  )
}
