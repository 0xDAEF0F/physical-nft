import React from 'react'
import ConnectWallet from './ConnectWallet'
import DivLink from './DivLink'
import SearchBar from './SearchBar'

function HamburguerMenu() {
  return (
    <div className='relative z-10'>
      <nav className='static flex flex-col w-full max-h-screen px-6 bg-white overflow-y-auto shadow-md'>
        <ul className='w-full text-center'>
          <li className='mb-3 sm:hidden'>
            <SearchBar
              placeholder={'Search songs, albums, artists and accounts...'}
              extraClass={''}
            />
          </li>
          <li className='mb-3 lg:hidden flex justify-center'>
            <DivLink title={'Explore'} to={'/explore'} xClass='' />
          </li>
          <li className='mb-3 lg:hidden flex justify-center'>
            <DivLink title={'Stats'} to={'/stats'} xClass='' />
          </li>
          <li className='mb-3 lg:hidden flex justify-center'>
            <ConnectWallet xClass='' />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default HamburguerMenu
