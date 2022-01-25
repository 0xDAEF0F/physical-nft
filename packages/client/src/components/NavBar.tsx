import AppLogo from './Logo'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import HamburgerMenu from './HamburgerMenu'
import ConnectWallet from './ConnectWallet'
import { useAppDispatch, useAppSelector } from 'src/app/hooks'
import { removeToken, selectToken } from 'src/features/user/userSlice'

export default function NavBar() {
  const userJwt = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  const connectWalletOrSignOut = !userJwt ? (
    <ConnectWallet xClass='hidden lg:flex mx-5' />
  ) : (
    <>
      <button
        onClick={() => dispatch(removeToken())}
        className='bg-black p-2 text-white rounded-xl  shadow-xl hidden lg:flex mx-5'
      >
        Logout
      </button>
    </>
  )

  return (
    <div className='shadow-md sticky h-16'>
      <nav className='flex h-full justify-between align-middle pl-5 items-center'>
        <AppLogo extraClass={''} />
        <SearchBar
          placeholder='Search songs, albums, artists and accounts'
          extraClass='hidden sm:flex px-10 xl:pl-40'
        />
        <ul className='hidden lg:flex w-4/12 justify-end'>
          <DivLink to='/Explore' title='Explore' />
          <DivLink to='/Stats' title='Stats' />
        </ul>
        {connectWalletOrSignOut}
        <div className='lg:hidden pr-5'>
          <HamburgerMenu />
        </div>
      </nav>
    </div>
  )
}
