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
  playcount: number
  realName?: string
  image: string
  albums?: string[]
  avatar?: string
  isVerified: boolean
  birthDate?: Date
  nationality?: string
}

type SongDb = {
  mbid: string
  title: string
  duration: number
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
  mbid: string
  name: string
  image: string
  released: number
  genre: string[]
  starring?: string[]
}

export type { SongDb, ArtistDb, AlbumDb, UserDb }
