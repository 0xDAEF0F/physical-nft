import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
      <a className='font-bold text-xl self-center ml-5'>
        Physical-<span className='text-blue-500'>NFT</span>
      </a>
    </Link>
  )
}

export default Logo
