import React from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'

function Footer() {
  return (
    <footer className='w-full sm:px-6 border-t'>
      <div className='px-6 py-8 font-normal'>
        <div className='flex flex-col md:flex-row'>
          <div className='flex-1 pt-10'>
            <Logo extraClass={''} />
          </div>
          <div className='flex-1 pt-10'>
            <div className='grid gap-2 content-start'>
              <a
                href='/helpcenter'
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Help Center'
              >
                Help Center
              </a>
              <a
                href='/blog'
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Blog'
              >
                Blog
              </a>
              <a
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                href='/privacy'
              >
                Privacy
              </a>
            </div>
          </div>
          <div className='flex-1 pt-10'>
            <div className='grid gap-2 content-start'>
              <a
                href=''
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Discord'
              >
                Discord
              </a>
              <a
                href=''
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Facebook'
              >
                Facebook
              </a>
              <a
                href=''
                className=' antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Instagram'
              >
                Instagram
              </a>
              <a
                href=''
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Reddit'
              >
                Reddit
              </a>
              <a
                href=''
                className='antialiased ease-in-out transition-all duration-150 overflow-ellipsis whitespace-nowrap font-light'
                target='_blank'
                title='Twitter'
              >
                Twitter
              </a>
            </div>
          </div>
          <div className='flex-1 pt-10'>
            <div className='grid gap-2 content-start'>
              <div className='px-4 pt-3 pb-4 -mx-4 border-gray-400'>
                <div className='max-w-xl mx-auto'>
                  <h2 className='text-xl text-left inline-block font-semibold text-gray-800'>
                    Join Our Newsletter
                  </h2>
                  <form action='#' className='mt-2'>
                    <div className='flex items-center'>
                      <SearchBar
                        placeholder={'Your email address'}
                        extraClass={''}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='mt-10  antialiased font-light'>
          © 2022 Physical-NFT Inc.
        </p>
      </div>
    </footer>
  )
}

export default Footer
