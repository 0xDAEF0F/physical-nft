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
import toast from 'react-hot-toast'
import { customMessages } from '@/constants/index'
import { generateNonce } from 'src/utilities'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function CreateAccount() {
  const [userObj, setUserObj] = useState<User>()
  const [paUser, setPaUser] = useState<PublicAddress>('')

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

  async function handleLoginFlow() {
    const publicAddress = await getPublicAddressFromMetamask()
    if (!publicAddress) return
    const isValid = utils.isAddress(publicAddress)
    const isExistingUser = await isUserRegistered(publicAddress)
    if (!isValid) {
      toast.error('Please provide a valid address.')
      return
    }
    if (!isExistingUser) {
      toast.error('Create an account first')
      if (isValid) setPaUser(publicAddress)
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
  }

  async function handleCreateAccountFlow() {
    const publicAddress = paUser || (await getPublicAddressFromMetamask())
    if (!publicAddress) return
    const isValid = utils.isAddress(publicAddress)
    if (!isValid) {
      toast.error('Please provide a valid address.')
      return
    }
    // provide a username and optional email
    // check if it's a valid username or if it's taken in db.
    // sign nonce in message to verify address
    // create user in DB
    // return JWT and success
  }

  return (
    <div className='mt-10'>
      <h1 className='text-center font-extrabold text-3xl'>
        Please enter your information:
      </h1>
      <Formik
        initialValues={{ publicAddress: paUser, username: '', email: '' }}
        validationSchema={Yup.object({
          publicAddress: Yup.string()
            .required('Required')
            .test('is valid address', (d) =>
              utils.isAddress(d as PublicAddress)
            )
            .label('public address entered'),
          username: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').optional(),
        })}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <Form className='flex-col flex items-center mt-2'>
          <label htmlFor='publicAddress'>
            your public address is: {paUser}
          </label>
          <Field
            name='publicAddress'
            type='text'
            className='outline block rounded text-center m-5'
            placeholder='public address'
          />
          <ErrorMessage
            name='publicAddress'
            component='p'
            className='text-red-600'
          />
          <Field
            name='username'
            type='text'
            className='outline block rounded text-center m-5'
            placeholder='username'
          />
          <ErrorMessage
            name='username'
            component='p'
            className='text-red-600'
          />
          <Field
            name='email'
            type='text'
            className='outline block rounded text-center m-5'
            placeholder='email'
          />
          <ErrorMessage name='email' component='p' className='text-red-600' />
          <button
            type='submit'
            className='bg-black text-white rounded py-2 px-5 block mt-4 font-semibold shadow-xl mr-3'
          >
            Create account
          </button>
        </Form>
      </Formik>
    </div>
  )
}
