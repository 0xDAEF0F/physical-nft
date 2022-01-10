import Link from 'next/link'
import React from 'react'

type Props = {
  extraClass: string
}

const Logo = ({ extraClass }: Props) => {
  return (
    <Link href='/'>
      <a className={`font-bold text-xl self-center ${extraClass}`}>
        Physical-<span className='text-blue-500'>NFT</span>
      </a>
    </Link>
  )
}

export default Logo
