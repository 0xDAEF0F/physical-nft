import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import metaMaskLogo from 'src/assets/metamask-fox.svg'

type Props = {
  xClass?: string
}

export default function ConnectWallet({ xClass }: Props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
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
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-50' />
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
                    onClick={closeModal}
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