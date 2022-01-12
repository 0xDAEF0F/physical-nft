import { createFirestoreUser, getFirestoreUser } from '@/lib/firestore-helpers'
import { useState } from 'react'
import { dummyData } from 'src/mocks'
import { PublicAddress, User } from '../constants'
import { getDefaultProvider, ethers, providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { to } from 'await-to-js'
import toast from 'react-hot-toast'

export default function CreateAccount() {
  const [userObj, setUserObj] = useState<User>()

  async function requestPublicAddressFromMetamask() {
    const ethereumWindowObject = await detectEthereumProvider()
    if (!ethereumWindowObject) throw new Error('Please install Metamask.')

    const provider = new providers.Web3Provider(
      ethereumWindowObject as ethers.providers.ExternalProvider
    )
    await provider.send('eth_requestAccounts', [])
    const [err, address] = await to(provider.getSigner().getAddress())
    if (err) throw new Error('Was not able to retrieve address, try again.')
    if (address) return address as PublicAddress
  }

  async function createUser(user: User) {
    const wasUserCreated = await createFirestoreUser(user)
    if (wasUserCreated) {
      toast.success('User was created')
    }
  }

  async function getUser() {
    const [err, userAddress] = await to(requestPublicAddressFromMetamask())
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
      <button onClick={getUser}>Get Account</button>
      <div>
        <h1>user:</h1>
        <p>{'' || userObj?.email}</p>
        <p>{'' || userObj?.nonce}</p>
        <p>{'' || userObj?.publicAddress}</p>
      </div>
    </div>
  )
}
