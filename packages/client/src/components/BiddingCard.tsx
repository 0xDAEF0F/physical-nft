import React from 'react'
import Image from 'next/image'

const songs = [
  {
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
      'https://www.udiscovermusic.com/wp-content/uploads/2018/09/Drake-Nothing-Was-The-Same-deluxe-album-cover-web-optimised-820.jpg',
    imageAlt: 'Drake album',
    price: '100',
    time: '12h 30m 50s',
  },
]

const BiddingCard = () => {
  return (
    <div className='bg-black rounded-lg transform transition duration-500 hover:scale-105'>
      {songs.map((song) => (
        <div key={song.id} className='group relative'>
          <div className='flex p-5'>
            <a href={song.ownerHref}>
              <div className='flex center items-center hover:text-gray-800'>
                <img
                  className='inline-block h-8 w-8 rounded-full'
                  src={song.ownerPpSrc}
                  alt={song.ownerPpAlt}
                  width='100%'
                  height='100%'
                  layout='responsive'
                  objectFit='contain'
                />
                <p className='text-md text-gray-200 font-semibold pl-2'>
                  {song.owner}
                </p>
              </div>
            </a>
          </div>

          <a href={song.href}>
            <div className='w-full min-h-80 bg-gray-100 aspect-w-1 aspect-h-1 overflow-hidden lg:h-50 lg:aspect-none'>
              <img
                src={song.imageSrc}
                alt={song.imageAlt}
                width='100%'
                height='100%'
                layout='responsive'
                objectFit='contain'
              />
            </div>
            <div className='px-5 mt-4 pb-5'>
              <div className='pb-5'>
                <p className='text-xl font-extrabold text-white'>{song.name}</p>
                <p className='text-lg text-white font-light'>{song.artist}</p>
              </div>
              <div className='flex justify-between'>
                <div>
                  <p className='text-md text-gray-500'>Current bid</p>
                  <p className='text-sm font-medium text-white'>
                    {song.price} ETH
                  </p>
                </div>
                <div>
                  <p className='text-md text-gray-500'>Ending in</p>
                  <p className='text-sm font-medium text-white'>{song.time}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  )
}

export default BiddingCard
