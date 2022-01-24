import {
  CREATE_USER_ERROR,
  CREDENTIALS_MISSING,
  DUPLICATE_USER,
  FETCH_USER_DB_ERROR,
  INVALID_PK,
  Jwt,
  nextApi,
  REQUEST_METHOD_ERR,
  SIGNED_NONCE_INVALID,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '@/constants/index'
import { User, userSchema } from '@/constants/schema'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getPublicAddressFromMetamask,
  signNonceAndReturnMessage,
} from '../utilities/index'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import UsernameSuggestions from '@/components/UsernameSuggestions'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { logClientErr } from '@/utilities/client-error-handlers'

export default function CreateAccount() {
  const { query } = useRouter()
  const [publicAddress, setPublicAddress] = useState('')

  useEffect(() => {
    if (query.address) {
      setPublicAddress(query.address as string)
    }
  }, [query])

  async function handleCreateAccountFlow(user: User) {
    const res = await axios
      .put<number>(`${nextApi}/create-account`, user)
      .catch((err: AxiosError) => {
        if (err.response?.data === REQUEST_METHOD_ERR)
          logClientErr(err, REQUEST_METHOD_ERR)
        if (err.response?.data === FETCH_USER_DB_ERROR)
          logClientErr(err, FETCH_USER_DB_ERROR)
        if (err.response?.data === DUPLICATE_USER)
          logClientErr(err, DUPLICATE_USER)
        if (err.response?.data === CREATE_USER_ERROR)
          logClientErr(err, CREATE_USER_ERROR)
      })
    if (!res) return
    const nonce = res.data
    const signedMessage = await signNonceAndReturnMessage(nonce)
    if (!signedMessage) return

    const credentials = {
      publicAddress,
      signedMessage,
      nonce,
    }
    const resFromAuth = await axios
      .put<Jwt>(`${nextApi}/auth`, credentials)
      .catch((err: AxiosError) => {
        if (err.response?.data === REQUEST_METHOD_ERR)
          logClientErr(err, REQUEST_METHOD_ERR)
        if (err.response?.data === CREDENTIALS_MISSING)
          logClientErr(err, CREDENTIALS_MISSING)
        if (err.response?.data === INVALID_PK) logClientErr(err, INVALID_PK)
        if (err.response?.data === USER_DOES_NOT_EXIST)
          logClientErr(err, USER_DOES_NOT_EXIST)
        if (err.response?.data === SIGNED_NONCE_INVALID)
          logClientErr(err, SIGNED_NONCE_INVALID)
        if (err.response?.data === USER_UPDATE_ERROR)
          logClientErr(err, USER_UPDATE_ERROR)
      })
    if (!resFromAuth) return

    const jwt = resFromAuth.data
    return toast.success('Success' + jwt)
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
        onSubmit={(user) => handleCreateAccountFlow(user)}
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
