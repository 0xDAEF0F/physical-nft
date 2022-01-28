import React from 'react'
import Logo from './Logo'

function Footer() {
  return (
    <footer className='relative border-t'>
      <div className='static w-full px-6 py-8 flex flex-col md:flex-row overflow-y-auto'>
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
              <div className='max-w-2xl mx-auto'>
                <h2 className='text-xl text-left inline-block font-semibold text-gray-800'>
                  Join Our Newsletter
                </h2>
                <div className='flex'>
                  <input
                    className='w-full focus:outline-none focus:text-gray-600 p-2 border rounded-l-lg'
                    placeholder='Your email address'
                  />
                  <button className='text-white bg-blue-500 rounded-r-lg text-center bg-blue-00 py-2 px-4 inline-flex items-center focus:outline-none float-right justify-center whitespace-nowrap'>
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='mt-10  antialiased font-light'>© 2022 Physical-NFT Inc.</p>
    </footer>
  )
}

export default Footer
