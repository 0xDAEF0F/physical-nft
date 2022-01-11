import React from 'react'
import BiddingCard from './BiddingCard'

const TrendingAuction = () => {
  return (
    <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-9'>
      <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
        Trending Auctions
      </h2>
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <BiddingCard />
        <BiddingCard />
        <BiddingCard />
        <BiddingCard />
        <BiddingCard />
      </div>
    </div>
  )
}

export default TrendingAuction
