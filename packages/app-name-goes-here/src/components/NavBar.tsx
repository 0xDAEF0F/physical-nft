import React, { useState } from 'react'
import { Link } from 'react-scroll'
import { Transition } from '@headlessui/react'
import Logo from './Logo'
import { MdSearch } from 'react-icons/md'
import { IoMenu, IoClose } from 'react-icons/io5'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const hamburgerSvg = isOpen ? <IoClose /> : <IoMenu />

  return (
    <div>
      <nav className=' shadow-md fixed w-full z-10'>
        <div className='w-full'>
          <div className='flex items-center h-16 w-full'>
            <div className='flex items-center ml-10  justify-between w-full'>
              <Logo />
              <div className='hidden md:block'>
                <div className='ml-5 flex'>
                  <input
                    type='search'
                    className='form-control px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition focus:text-gray-700 focus:bg-white focus:outline-none rounded-lg'
                    placeholder='Search'
                    aria-label='Search'
                    aria-describedby='button-addon2'
                  />
                  <button
                    className='btn px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-black hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-lg transition duration-150 items-center rounded-lg'
                    type='button'
                    id='button-addon2'
                  >
                    <MdSearch fontSize='large' />
                  </button>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-2 flex items-baseline space-x-4'>
                  <Link
                    activeClass='Explore'
                    to='explore'
                    smooth={true}
                    offset={50}
                    duration={500}
                    className='cursor-pointer text-black font-semibold px-3 py-2 text-md hover:text-blue-600 focus:text-gray-700'
                  >
                    Explore
                  </Link>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-2 flex items-baseline space-x-4'>
                  <Link
                    activeClass='Explore'
                    to='explore'
                    smooth={true}
                    offset={50}
                    duration={500}
                    className='cursor-pointer text-black font-semibold px-3 py-2 text-md hover:text-blue-600 focus:text-gray-700'
                  >
                    Stats
                  </Link>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='mr-10 ml-2 flex items-baseline space-x-4'>
                  <Link
                    activeClass='Stats'
                    to='stats'
                    smooth={true}
                    offset={50}
                    duration={500}
                    className='cursor-pointer text-black font-semibold px-3 py-2 text-md hover:text-blue-600 focus:text-gray-700'
                  >
                    Account
                  </Link>
                </div>
              </div>
            </div>
            <div className='flex md:hidden pr-6'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className=' inline-flex items-center justify-center pl-8 text-gray-500'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {hamburgerSvg}
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {ref => (
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
                <Link
                  href='/explore'
                  activeClass='explore'
                  to='explore'
                  smooth={true}
                  offset={50}
                  duration={500}
                  className='cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  Explore
                </Link>
                <Link
                  href='/stats'
                  activeClass='stats'
                  to='stats'
                  smooth={true}
                  offset={50}
                  duration={500}
                  className='cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  Stats
                </Link>

                <Link
                  href='/account'
                  activeClass='account'
                  to='account'
                  smooth={true}
                  offset={50}
                  duration={500}
                  className='cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  Account
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  )
}
