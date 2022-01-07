import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import AppLogo from './Logo'
import { IoMenu, IoClose } from 'react-icons/io5'
import DivLink from './DivLink'
import SearchBar from './SearchBar'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const hamburgerSvg = isOpen ? <IoClose /> : <IoMenu />

  return (
    <nav className='flex shadow-md fixed w-full justify-between align-middle h-16'>
      <AppLogo />
      <SearchBar placeholder='Search' extraClass='hidden md:flex' />
      <div className='items-center hidden sm:flex pr-5'>
        <DivLink to='/Explore' title='Explore' />
        <DivLink to='/Stats' title='Stats' />
        <DivLink to='/Account' title='Account' />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type='button'
        className='text-gray-500 md:hidden p-6'
        aria-controls='mobile-menu'
        aria-expanded='false'
      >
        {hamburgerSvg}
      </button>
      {/* <Transition
        show={isOpen}
        enter='transition ease-out duration-100 transform'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75 transform'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        {(ref) => (
          <div className='md:hidden text-center' id='mobile-menu'>
            <div
              ref={ref}
              className='bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3'
            >
              <div className='ml-3 flex justify-center'>
                <input
                  type='search'
                  className='form-control pl-5 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition focus:text-gray-700 focus:bg-white focus:outline-none rounded-lg'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='button-addon2'
                />
                <button
                  className='btn px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-black hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-lg transition duration-150 items-center rounded-lg'
                  type='button'
                  id='button-addon2'
                >
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='search'
                    className='w-4'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path
                      fill='currentColor'
                      d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'
                    ></path>
                  </svg>
                </button>
              </div>
              <DivLink to='/Explore' title='Explore' />
              <DivLink to='/Stats' title='Stats' />
              <DivLink to='/Account' title='Account' />
            </div>
          </div>
        )}
      </Transition> */}
    </nav>
  )
}
