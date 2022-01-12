import AppLogo from './Logo'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import HamburgerMenu from './HamburgerMenu'

export default function NavBar() {
  return (
    <div className='shadow-md sticky h-16'>
      <nav className='flex h-full justify-between align-middle pl-5 items-center'>
        <AppLogo extraClass={''} />
        <SearchBar
          placeholder='Search songs, albums, artists and accounts'
          extraClass='hidden sm:flex px-10 xl:pl-40'
        />
        <ul className='hidden lg:flex w-5/12 justify-center'>
          <DivLink to='/Explore' title='Explore' />
          <DivLink to='/Stats' title='Stats' />
          <DivLink
            to='/create-account'
            title='Get Started'
            xClass='whitespace-nowrap'
          />
        </ul>
        <div className='pr-5'>
          <HamburgerMenu />
        </div>
      </nav>
    </div>
  )
}
