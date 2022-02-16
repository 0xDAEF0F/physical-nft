import React from 'react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import ethereumLogo from 'src/assets/ethereum.svg'
import Link from 'next/link'
import { IoSettings } from 'react-icons/io5'
import Tabs from './Tabs'

function Profile() {
  let publicKey = '0x8a1b5f0ac1c070be13559df36c3426671f2b0885'
  function copy2Clipboard() {
    navigator.clipboard.writeText(publicKey)
    toast.success('Copied to clipboard')
  }

  return (
    <div className=''>
      <div className='flex justify-end m-5'>
        <Link href='/settings'>
          <a
            className={
              'cursor-pointer hover:text-black text-gray-500 py-2 rounded-md text-base font-medium flex justify-between'
            }
          >
            <IoSettings size={30} />
          </a>
        </Link>
      </div>
      <div className='flex justify-center '>
        <div className='flex flex-col text-center'>
          <span>
            <Image
              className='rounded-full ring-2 ring-white bg-black'
              src='https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png'
              alt='Profile picture'
              priority
              width={120}
              height={120}
              layout='intrinsic'
            />
          </span>
          <h2 className='text-2xl font-bold'>@Drake</h2>
          <div className=''>
            <button
              onClick={copy2Clipboard}
              title='Copy'
              className='bg-gray-100 rounded-full p-2 w-52 h-auto'
            >
              <div className='flex justify-between items-center'>
                <Image
                  src={ethereumLogo}
                  alt='MetaMask logo'
                  width={30}
                  height={30}
                ></Image>
                <p className='font-semibold ml-1 text-gray-600 truncate hover:text-black'>
                  {publicKey}
                </p>
              </div>
            </button>
          </div>
          <div className='flex justify-center text-center text-lg mb-4 mt-3'>
            <div className='mr-5 font-semibold'>
              <p>0</p>
              <p className='text-gray-500'>Following</p>
            </div>
            <div className='ml-5 font-semibold'>
              <p>0</p>
              <p className='text-gray-500'>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <Tabs />
    </div>
  )
}

export default Profile
