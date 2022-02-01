import React from 'react'
import ConnectWallet from './ConnectWallet'
import SearchBar from './SearchBar'
import DivLinkChevron from './DivLinkChevron'

function HamburguerMenu() {
  return (
    <nav className='flex flex-col h-full max-h-screen px-6 bg-white overflow-y-auto shadow-md z-50'>
      <ul>
        <li className='mb-3 sm:hidden'>
          <SearchBar
            placeholder={'Search songs, albums, artists and accounts'}
            extraClass={''}
          />
        </li>
        <li className='mb-3 lg:hidden'>
          <DivLinkChevron title={'Explore'} to={'/explore'} xClass='w-full' />
        </li>
        <li className='mb-3 lg:hidden'>
          <DivLinkChevron title={'Stats'} to={'/stats'} xClass='w-full' />
        </li>
        <li className='mb-3 lg:hidden'>
          <ConnectWallet xClass='w-full' />
        </li>
      </ul>
    </nav>
  )
}

export default HamburguerMenu
