import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import metaMaskLogo from 'src/assets/metamask-fox.svg'
import { isUserRegistered } from '@/lib/firestore-helpers'
import { utils } from 'ethers'
import { toast } from 'react-hot-toast'
import {
  generateNonce,
  getPublicAddressFromMetamask,
  getAddressWhichSignedNonce,
  signNonceAndReturnMessage,
} from 'src/utilities'
import { useRouter } from 'next/router'
import { CACC_TO_LOGIN, INVALID_PK } from '../constants'

type Props = {
  xClass?: string
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

  async function handleLoginFlow() {
    const publicAddress = await getPublicAddressFromMetamask()
    if (!publicAddress) return
    const isValid = utils.isAddress(publicAddress)
    const isExistingUser = await isUserRegistered(publicAddress)
    if (!isValid) {
      toast.error(INVALID_PK)
      closeModal()
      return
    }
    if (!isExistingUser) {
      toast.error(CACC_TO_LOGIN)
      router.push(`/create-account?address=${publicAddress}`)
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
      closeModal()
      // return jwt
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
