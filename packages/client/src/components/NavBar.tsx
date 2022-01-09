import AppLogo from './Logo'
import DivLink from './DivLink'
import SearchBar from './SearchBar'
import HamburgerMenu from './HamburgerMenu'

export default function NavBar() {
  return (
    <>
      <nav className='flex shadow-md sticky w-full justify-between align-middle h-16'>
        <AppLogo />
        <SearchBar placeholder='Search' extraClass='hidden md:flex' />
        <div className='items-center hidden md:flex pr-5'>
          <DivLink to='/Explore' title='Explore' />
          <DivLink to='/Stats' title='Stats' />
          <DivLink to='/create-account' title='Get Started' xClass='' />
        </div>
        <HamburgerMenu />
      </nav>
    </>
  )
}
