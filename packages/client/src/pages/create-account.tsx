import { createUserDb, isUserRegistered } from '@/lib/firestore-helpers'
import {
  MessageForUserToSign,
  Nonce,
  PublicAddress,
  SignedMessage,
  User,
  METAMASK_NOT_INSTALLED,
  PK_RETRIEVAL_FAILURE,
  SIGNED_MESSAGE_FAIL,
  SIGN_NONCE_MESSAGE,
} from '@/constants/index'
import React, { useState } from 'react'
import { utils, ethers, providers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { to } from 'await-to-js'
import toast from 'react-hot-toast'
import { generateNonce } from 'src/utilities'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function CreateAccount() {
  const [publicAddress, setPublicAddress] = useState<PublicAddress>('')

  async function createProvider(): Promise<ethers.providers.Web3Provider> {
    const ethereumWindowObject = await detectEthereumProvider()
    return new Promise((res, rej) => {
      if (!ethereumWindowObject) {
        toast.error(METAMASK_NOT_INSTALLED)
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
      return
    }
    await provider.send('eth_requestAccounts', [])
    const [err2, address] = await to(provider.getSigner().getAddress())
    if (!address) {
      console.error(err2)
      toast.error(PK_RETRIEVAL_FAILURE)
      return
    }
    return address
  }

  async function signNonceAndReturnMessage(nonce: Nonce) {
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
      toast.error(SIGNED_MESSAGE_FAIL)
      return
    }
    return signedMessage
  }

  function getAddressWhichSignedNonce(nonce: Nonce, sig: SignedMessage) {
    const completeMessage: MessageForUserToSign = SIGN_NONCE_MESSAGE + nonce
    const pertainingPublicAddress: PublicAddress = utils.verifyMessage(
      completeMessage,
      sig
    )
    return pertainingPublicAddress
  }

  async function createUser(user: User) {
    const wasUserCreated = await createUserDb(user)
    if (wasUserCreated) toast.success('User was created')
    if (!wasUserCreated) toast.error('User could not be created.')
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
      if (isValid) setPublicAddress(publicAddress)
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

  async function handleCreateAccountFlow(user: User) {
    if (!publicAddress) return
    const isValid = utils.isAddress(publicAddress)
    if (!isValid) {
      toast.error('Please provide a valid address.')
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
      await createUser(user)
      // return a jwt
      toast.success('Congrats! You are authenticated.')
    }
  }

  return (
    <div className='mt-10'>
      <h1 className='text-center font-extrabold text-3xl'>
        Please fill out the following form:
      </h1>
      <Formik
        enableReinitialize
        initialValues={{
          publicAddress: publicAddress,
          username: '',
          email: '',
        }}
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
        onSubmit={(values) => handleCreateAccountFlow(values)}
      >
        <Form className='flex-col flex items-center mt-2'>
          <button
            className='bg-black text-white rounded py-2 px-2 ml-2 mt-4 text-xs  shadow-xl mr-3'
            onClick={async (e) => {
              e.preventDefault()
              const address = await getPublicAddressFromMetamask()
              if (address) setPublicAddress(address)
            }}
          >
            fetch my address
          </button>
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
