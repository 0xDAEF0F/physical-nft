import { createFirestoreUser, getFirestoreUser } from '@/lib/firestore-helpers'
import React, { useState } from 'react'
import { dummyData } from 'src/mocks'
import { Nonce, PublicAddress, User } from '../constants'
import { getDefaultProvider, ethers, providers, Signer, Wallet } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { to } from 'await-to-js'
import toast from 'react-hot-toast'
import { customMessages } from '@/constants/index'

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

  async function signNonce(nonce: Nonce) {
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
    // Not yet sure, return signed nonce or what?
    console.log(signedMessage)
  }

  async function validateSignedMessage() {}

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
    <div>
      {/* <button onClick={getUser}>Get Account</button> */}
      <button onClick={() => signNonce(192387419237)}>Get Account</button>
      <div>
        <h1>user:</h1>
        <p>{'' || userObj?.email}</p>
        <p>{'' || userObj?.nonce}</p>
        <p>{'' || userObj?.publicAddress}</p>
      </div>
    </div>
  )
}
