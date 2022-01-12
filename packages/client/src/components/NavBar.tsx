import AppLogo from './Logo'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import HamburgerMenu from './HamburgerMenu'

export default function NavBar() {
  return (
    <>
      <div className='shadow-md sticky h-16'>
        <nav className='flex h-full justify-between align-middle pl-5'>
          <AppLogo extraClass={''} />
          <SearchBar
            placeholder='Search'
            extraClass='hidden sm:flex px-10 xl:pl-40'
          />
          <ul className='items-center hidden lg:flex w-5/12 justify-center'>
            <DivLink to='/Explore' title='Explore' />
            <DivLink to='/Stats' title='Stats' />
            <DivLink
              to='/create-account'
              title='Get Started'
              xClass='whitespace-nowrap'
            />
          </ul>
          <div className='p-6'>
            <HamburgerMenu />
          </div>
        </nav>
      </div>
    </>
  )
}
