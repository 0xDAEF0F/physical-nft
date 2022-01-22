import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import metaMaskLogo from 'src/assets/metamask-fox.svg'
import { toast } from 'react-hot-toast'
import {
  getPublicAddressFromMetamask,
  signNonceAndReturnMessage,
} from 'src/utilities'
import { useRouter } from 'next/router'
import {
  CACC_TO_LOGIN,
  CREDENTIALS_MISSING,
  INVALID_PK,
  Nonce,
  PK_RETRIEVAL_FAILURE,
  PublicAddress,
  REQUEST_METHOD_ERR,
  SignedMessage,
  SIGNED_MESSAGE_FAIL,
  SIGNED_NONCE_INVALID,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '../constants'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type Props = {
  xClass?: string
}
const authApi = 'http://localhost:3000/api/auth'
interface MyReqConfig extends AxiosRequestConfig {
  params?: {
    publicAddress: PublicAddress
  }
  data?: {
    nonce: Nonce
    publicAddress: PublicAddress
    signedMessage: SignedMessage
  }
}
interface MyApiResGet extends AxiosResponse {
  data: Nonce
}
interface MyApiResPut extends AxiosResponse {
  data: string
}

export default function ConnectWallet({ xClass }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  function handleInvalidAddress(err: AxiosError) {
    console.error(err)
    toast.error(INVALID_PK)
  }

  function handleNoAddress(err: AxiosError) {
    console.error(err)
    toast.error(PK_RETRIEVAL_FAILURE)
  }

  function handleUserDoesNotExist(
    err: AxiosError,
    publicAddress: PublicAddress
  ) {
    console.error(err)
    toast.error(CACC_TO_LOGIN)
    closeModal()
    router.push(`/create-account?address=${publicAddress}`)
  }

  function handleUserCouldNotBeUpdated(err: AxiosError) {
    console.error(err)
    toast.error(USER_UPDATE_ERROR)
  }

  function handleInvalidSignedNonce(err: AxiosError) {
    console.error(err)
    toast.error(SIGNED_NONCE_INVALID)
  }

  function handleMissingCredentials(err: AxiosError) {
    console.error(err)
    toast.error(CREDENTIALS_MISSING)
  }

  function handleInvalidReqMethod(err: AxiosError) {
    console.error(err)
    toast.error(REQUEST_METHOD_ERR)
  }

  async function handleLoginFlow() {
    const publicAddress = await getPublicAddressFromMetamask()
    if (!publicAddress) return toast.error(PK_RETRIEVAL_FAILURE)

    const getResponse = await axios
      .get<string, MyApiResGet, MyReqConfig>(authApi, {
        params: { publicAddress },
      })
      .catch((err: AxiosError) => {
        if (err.response?.data === PK_RETRIEVAL_FAILURE) handleNoAddress(err)
        if (err.response?.data === USER_DOES_NOT_EXIST)
          handleUserDoesNotExist(err, publicAddress)
        if (err.response?.data === INVALID_PK) handleInvalidAddress(err)
        if (err.response?.data === USER_UPDATE_ERROR)
          handleUserCouldNotBeUpdated(err)
        if (err.response?.data === REQUEST_METHOD_ERR)
          handleInvalidReqMethod(err)
        return
      })
    if (!getResponse) return

    const nonce = getResponse.data
    const signedMessage = await signNonceAndReturnMessage(nonce)
    if (!signedMessage) {
      toast.error(SIGNED_MESSAGE_FAIL)
      return
    }
    const resFromApiAuth = await axios
      .put<string, MyApiResPut>(authApi, {
        publicAddress,
        nonce,
        signedMessage,
      })
      .catch((err: AxiosError) => {
        if (err.response?.data === SIGNED_NONCE_INVALID)
          handleInvalidSignedNonce(err)
        if (err.response?.data === USER_UPDATE_ERROR)
          handleUserCouldNotBeUpdated(err)
        if (err.response?.data === CREDENTIALS_MISSING)
          handleMissingCredentials(err)
        if (err.response?.data === REQUEST_METHOD_ERR)
          handleInvalidReqMethod(err)
        return
      })

    const jwt = resFromApiAuth?.data
    if (jwt) {
      closeModal()
      return toast.success(`Token: ${resFromApiAuth?.data}`)
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className={`cursor-pointer bg-blue-600 text-white hover:text-white block px-4 py-2 rounded-full text-base font-medium whitespace-nowrap mx-5 ${xClass}`}
      >
        Connect Wallet
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <Dialog.Overlay className='fixed inset-0 backdrop-blur-md backdrop-brightness-50' />
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-sm p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h1'
                  className='text-3xl font-semibold leading-10 text-gray-900'
                >
                  Connect your wallet
                </Dialog.Title>
                <div className='mt-10'>
                  <button
                    className='bg-gradient-to-r from-orange-500 to-orange-300 py-4 px-4 rounded-lg transform transition duration-500 hover:scale-105 w-full'
                    type='button'
                    onClick={handleLoginFlow}
                  >
                    <div className='justify-between items-center flex'>
                      <p className='text-xl text-white font-semibold'>
                        MetaMask
                      </p>
                      <Image
                        src={metaMaskLogo}
                        alt='MetaMask logo'
                        width={30}
                        height={30}
                      ></Image>
                    </div>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
