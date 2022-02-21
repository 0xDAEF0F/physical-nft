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

type MetaArtist = {
  realName?: string
  description?: string
  gender?: 'Male' | 'Female'
  lifeSpan?: {
    begin: Date
    end?: Date
    ended: boolean
  }
  nationality?: string
}

type ArtistDb = {
  mbid?: string
  stageName: string
  spotifyId?: string
  genres?: string[]
  popularity?: number
  image: string
  albums?: string[]
  avatar?: string
  isVerified: boolean
  meta: MetaArtist
}

type SongDb = {
  mbid: string
  title: string
  duration: number
  artist: string[]
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
