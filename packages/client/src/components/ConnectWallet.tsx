import {
  CACC_TO_LOGIN,
  CREDENTIALS_MISSING,
  INVALID_PK,
  Jwt,
  JWT_CREATION_ERROR,
  nextApi,
  Nonce,
  PK_RETRIEVAL_FAILURE,
  REQUEST_METHOD_ERR,
  SIGNED_MESSAGE_FAIL,
  SIGNED_NONCE_INVALID,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
} from '../constants'
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
import axios, { AxiosError } from 'axios'
import { logClientErr } from '@/utilities/client-error-handlers'
import { useAppDispatch } from 'src/app/hooks'
import { setNewToken } from 'src/features/user/userSlice'

type Props = {
  xClass?: string
}

export default function ConnectWallet({ xClass }: Props) {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  async function handleLoginFlow() {
    const publicAddress = await getPublicAddressFromMetamask()
    if (!publicAddress) return toast.error(PK_RETRIEVAL_FAILURE)

    const getResponse = await axios
      .get<Nonce>(`${nextApi}/get-nonce`, {
        params: { publicAddress },
      })
      .catch((err: AxiosError) => {
        if (err.response?.data === REQUEST_METHOD_ERR)
          logClientErr(err, REQUEST_METHOD_ERR)
        if (err.response?.data === PK_RETRIEVAL_FAILURE)
          logClientErr(err, PK_RETRIEVAL_FAILURE)
        if (err.response?.data === INVALID_PK) {
          logClientErr(err, INVALID_PK)
        }
        if (err.response?.data === USER_UPDATE_ERROR)
          logClientErr(err, USER_UPDATE_ERROR)
        if (err.response?.data === USER_DOES_NOT_EXIST) {
          logClientErr(err, CACC_TO_LOGIN)
          router.push(`/create-account?address=${publicAddress}`)
        }
      })
    if (!getResponse) return

    const nonce = getResponse.data
    const signedMessage = await signNonceAndReturnMessage(nonce)
    if (!signedMessage) {
      toast.error(SIGNED_MESSAGE_FAIL)
      return
    }
    const resFromApiAuth = await axios
      .put<Jwt>(`${nextApi}/auth`, {
        publicAddress,
        nonce,
        signedMessage,
      })
      .catch((err: AxiosError) => {
        if (err.response?.data === REQUEST_METHOD_ERR)
          logClientErr(err, REQUEST_METHOD_ERR)
        if (err.response?.data === SIGNED_NONCE_INVALID)
          logClientErr(err, SIGNED_NONCE_INVALID)
        if (err.response?.data === USER_UPDATE_ERROR)
          logClientErr(err, USER_UPDATE_ERROR)
        if (err.response?.data === CREDENTIALS_MISSING)
          logClientErr(err, CREDENTIALS_MISSING)
        if (err.response?.data === JWT_CREATION_ERROR)
          logClientErr(err, JWT_CREATION_ERROR)
      })
    if (!resFromApiAuth) return

    const jwt = resFromApiAuth?.data
    localStorage.setItem('token', jwt)
    dispatch(setNewToken(jwt))
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className={`cursor-pointer bg-blue-600 text-white block px-4 py-2 rounded-full text-base font-medium whitespace-nowrap ${xClass}`}
      >
        Connect Wallet
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 overflow-y-auto'
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
                    className='bg-gradient-to-r from-orange-500 to-orange-300 py-4 px-4 rounded-lg transform transition duration-500 hover:scale-105 w-full focus:outline-none'
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
