import React from 'react'
import NftCard from './NftCard'

const NftGroup = () => {
  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-5 lg:max-w-full lg:px-7'>
      <div className='justify-items-center mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:gap-x-8 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-9'>
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
      </div>
    </div>
  )
}

export default NftGroup
