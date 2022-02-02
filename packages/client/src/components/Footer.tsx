import React from 'react'
import DivLink from './DivLink'
import Logo from './Logo'

function Footer() {
  return (
    <footer className='border-t mt-20'>
      <div className='w-full px-6 py-8 flex flex-col md:flex-row'>
        <div className='flex-1 pt-10'>
          <Logo extraClass={''} />
        </div>
        <div className='flex-1 pt-10'>
          <div className='grid gap-2 justify-start'>
            <DivLink
              title={'Help Center'}
              to={'/helpcenter'}
              xClass='whitespace-nowrap font-light'
            />

            <DivLink
              title={'Blog'}
              to={'/blog'}
              xClass='whitespace-nowrap font-light'
            />

            <DivLink
              title={'Privacy'}
              to={'/privacy'}
              xClass='whitespace-nowrap font-light'
            />
          </div>
        </div>
        <div className='flex-1 pt-10'>
          <div className='grid gap-2 justify-start'>
            <a href='' className='font-light' target='_blank' title='Discord'>
              Discord
            </a>
            <a href='' className='font-light' target='_blank' title='Facebook'>
              Facebook
            </a>
            <a href='' className='font-light' target='_blank' title='Instagram'>
              Instagram
            </a>
            <a href='' className='font-light' target='_blank' title='Reddit'>
              Reddit
            </a>
            <a href='' className='font-light' target='_blank' title='Twitter'>
              Twitter
            </a>
          </div>
        </div>
        <div className='flex-1 pt-10'>
          <div className='grid gap-2 content-start'>
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
      <p className='ml-5 my-10  antialiased font-light'>
        © 2022 Physical-NFT Inc.
      </p>
    </footer>
  )
}

export default Footer
