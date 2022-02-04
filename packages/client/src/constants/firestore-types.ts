import { PublicAddress } from './index'

type Bid = {
  publicAddress: PublicAddress
  amount: number
  expiration?: Date
}

type UserDb = {
  publicAddress: PublicAddress
  username: string
  email?: string
  avatar?: string
  collection?: SongDb[]
  likes?: string[]
  nonce: number
}

type ArtistDb = {
  mbid: string
  stageName: string
  realName?: string
  image: string
  albums?: AlbumDb[]
  avatar?: string
  isVerified: boolean
  birthDate?: Date
  nationality?: string
}

type SongDb = {
  mbid: string
  title: string
  artist: string[]
  genre: string[]
  album: string
  likes?: PublicAddress[]
  image?: string
  bids?: Bid[]
  currentBid?: Bid
  ownerPk?: PublicAddress
}

type AlbumDb = {
  name: string
  image: string
  released: number
  genre: string[]
  mbid: string
  starring?: string[]
}

export type { SongDb, ArtistDb, AlbumDb, UserDb }
