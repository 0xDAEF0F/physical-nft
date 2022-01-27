import AppLogo from './Logo'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import { IoMenu, IoClose } from 'react-icons/io5'
import ConnectWallet from './ConnectWallet'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { selectToken, clearUserInfo } from 'src/features/user/userSlice'
import HamburgerMenu from './HamburgerMenu'
import { useState } from 'react'

export default function NavBar() {
  const userJwt = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  function logout() {
    if (!window) return
    localStorage.clear()
    dispatch(clearUserInfo())
  }

  const connectWalletOrSignOut = !userJwt ? (
    <ConnectWallet xClass='hidden lg:flex mx-5' />
  ) : (
    <>
      <button
        onClick={logout}
        className='bg-black p-2 text-white rounded-xl  shadow-xl hidden lg:flex mx-5'
      >
        Logout
      </button>
    </>
  )

  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }
  function openMenu() {
    setIsOpen(true)
  }

  const HamburgerIconOrCancel = !isOpen ? (
    <button onClick={openMenu} className='flex items-center' type='button'>
      <IoMenu size={30} />
    </button>
  ) : (
    <>
      <button onClick={closeMenu} className='flex items-center' type='button'>
        <IoClose size={30} />
      </button>
    </>
  )

  return (
    <div>
      <nav className='shadow-md sticky h-16'>
        <div className='flex h-full justify-between align-middle pl-5 items-center sticky'>
          <AppLogo extraClass={''} />
          <SearchBar
            placeholder='Search songs, albums, artists and accounts'
            extraClass='hidden sm:flex px-10 xl:pl-40'
          />
          <ul className='hidden lg:flex w-4/12 justify-end'>
            <DivLink to='/explore' title='Explore' />
            <DivLink to='/stats' title='Stats' />
          </ul>
          {connectWalletOrSignOut}
          <div className='lg:hidden mr-5'>{HamburgerIconOrCancel}</div>
        </div>
      </nav>
      {isOpen ? <HamburgerMenu /> : null}
    </div>
  )
}
