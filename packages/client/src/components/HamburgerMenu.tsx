import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { IoMenu } from 'react-icons/io5'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import ConnectWallet from './ConnectWallet'

export default function HamburgerMenu() {
  return (
    <Menu as='div' className=''>
      <Menu.Button as='button' className=''>
        <IoMenu size={25} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute text-center ml-auto mr-auto right-0 mt-1 rounded-md shadow-md ring-opacity-5 w-full'>
          <div className='px-1 py-1'>
            <Menu.Item>
              <SearchBar
                placeholder={'Search'}
                extraClass={'flex justify-center sm:hidden px-10'}
              />
            </Menu.Item>
          </div>
          <div className='px-1 py-1 '>
            <Menu.Item>
              <DivLink title='Explore' to='/explore' />
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              <DivLink title='Stats' to='/stats' />
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              <ConnectWallet xClass='w-full' />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
