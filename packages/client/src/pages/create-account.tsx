import { createUserDb } from '@/lib/firestore-helpers'
import {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  INVALID_PK,
  PublicAddress,
} from '@/constants/index'
import { User, userSchema } from '@/constants/schema'
import React, { useEffect, useState } from 'react'
import { utils } from 'ethers'
import toast from 'react-hot-toast'
import {
  generateNonce,
  getAddressWhichSignedNonce,
  getPublicAddressFromMetamask,
  signNonceAndReturnMessage,
} from '../utilities/index'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import UsernameSuggestions from '@/components/UsernameSuggestions'
import { useRouter } from 'next/router'

export default function CreateAccount() {
  const { query } = useRouter()
  const [publicAddress, setPublicAddress] = useState('')

  useEffect(() => {
    if (query.address) {
      setPublicAddress(query.address as string)
    }
  }, [query])

  async function createUser(user: User) {
    const wasUserCreated = await createUserDb(user)
    if (wasUserCreated) toast.success(CREATE_USER_SUCCESS)
    if (!wasUserCreated) toast.error(CREATE_USER_ERROR)
  }

  async function handleCreateAccountFlow(user: User) {
    if (!publicAddress) return
    const isValid = utils.isAddress(publicAddress)
    if (!isValid) {
      toast.error(INVALID_PK)
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
        validationSchema={userSchema}
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
          <ErrorMessage name='username'>
            {(msg) => <UsernameSuggestions>{msg}</UsernameSuggestions>}
          </ErrorMessage>
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
