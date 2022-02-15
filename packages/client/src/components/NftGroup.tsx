import React from 'react'
import NftCard from './NftCard'

const NftGroup = () => {
  return (
    <div className='max-w-2xl mx-auto py-5 px-4 sm:px-6 lg:max-w-7xl lg:px-9'>
      <div className='justify-items-center mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
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
