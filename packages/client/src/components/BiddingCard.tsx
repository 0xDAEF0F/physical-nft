import React from 'react'
import Image from 'next/image'

const songExample = {
  id: 1,
  name: "Hold On, We're Going Home",
  artist: 'Drake',
  owner: '@Drake',
  ownerPpSrc:
    'https://www.cnet.com/a/img/FOblZHSSQ9sBlVbdd0qIxrLRIAI=/940x0/2021/12/13/d319cda7-1ddd-4855-ac55-9dcd9ce0f6eb/unnamed.png',
  ownerPpAlt: 'Drake Profile Picture',
  ownerHref: '#',
  href: '#',
  imageSrc:
    'https://thefader-res.cloudinary.com/private_images/w_1800,c_limit,f_auto,q_auto:best/drake-views-from-the-6-cover-story-interview_ic4ox9/drake.jpg',
  imageAlt: 'Drake album',
  price: '100',
  time: '12h 30m 50s',
}

const BiddingCard = () => {
  return (
    <div className='bg-black rounded-lg transform transition duration-500 hover:scale-105 w-fit '>
      {/* Owner Logo Part */}
      <div key={songExample.id} className='group relative'>
        <div className='flex p-3'>
          <a href={songExample.ownerHref}>
            <div className='flex center items-center hover:text-gray-800'>
              <Image
                className='inline-block h-8 w-8 rounded-full'
                src={songExample.ownerPpSrc}
                alt={songExample.ownerPpAlt}
                width={30}
                height={30}
              />
              <p className='text-md text-gray-200 font-semibold pl-2'>
                {songExample.owner}
              </p>
            </div>
          </a>
        </div>
        <a href={songExample.href}>
          {/* main image part */}
          <Image
            priority
            src={songExample.imageSrc}
            alt={songExample.imageAlt}
            width={350}
            height={350}
            layout='intrinsic'
          />
          {/* Footer Part */}
          <div className='px-5 mt-4 pb-5'>
            <div className='pb-5'>
              <p className='text-xl font-extrabold text-white'>
                {songExample.name}
              </p>
              <p className='text-lg text-white font-light'>
                {songExample.artist}
              </p>
            </div>
            <div className='flex justify-between'>
              <div>
                <p className='text-md text-gray-500'>Current bid</p>
                <p className='text-sm font-medium text-white'>
                  {songExample.price} ETH
                </p>
              </div>
              <div>
                <p className='text-md text-gray-500'>Ending in</p>
                <p className='text-sm font-medium text-white'>
                  {songExample.time}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default BiddingCard
