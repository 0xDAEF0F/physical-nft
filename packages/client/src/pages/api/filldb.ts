// this file intention is to seed the DB.
import { PublicAddress } from '@/constants/index'
import {
  GetTopAlbumsRes,
  GetTopArtistsRes,
  GetAlbumInfoRes,
} from '@/constants/lastfm-types'
import { User } from '@/constants/schema'
import to from 'await-to-js'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

type UserDb = User & {
  nonce: number
  email?: string
  likes?: string[]
  collection?: string[]
}

type ArtistDb = {
  name: string
  image: string
  albums: AlbumDb[]
  isVerified: boolean
}

type SongDb = {
  name: string
  artist: string[]
  album: string
  likes?: PublicAddress[]
  image?: string
  currentBid?: number
  highestBidder?: PublicAddress
  owner?: PublicAddress
}

type AlbumDb = {
  name: string
  image: string
  released: number
  genre: string[]
  starring?: string[]
}

const lastFmBaseUrl = `https://ws.audioscrobbler.com/2.0`
const lastFmApiQueryParam = `api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}`

async function getTopArtistsArrByPage(page: number) {
  const getTopArtistsUrl = `${lastFmBaseUrl}?method=chart.gettopartists&format=json&${lastFmApiQueryParam}&page=${page}`
  const [_, res] = await to(axios.get<GetTopArtistsRes>(getTopArtistsUrl))
  if (!res) throw new Error('Failed to fetch from API.')
  const artistArrForFirestore = res.data.artists.artist.map((a) => {
    return {
      name: a.name,
      image: a.image[a.image.length - 1]['#text'],
      isVerified: false,
    } as ArtistDb
  })
  return artistArrForFirestore
}
async function getArtistTopAlbumsArrByPage(artist: string, page: number) {
  const getTopAlbumsUrl = `${lastFmBaseUrl}?method=artist.gettopalbums&format=json&${lastFmApiQueryParam}&artist=${artist}&page=${page}`
  const [_, res] = await to(axios.get<GetTopAlbumsRes>(getTopAlbumsUrl))
  if (!res) throw new Error('Failed to fetch from API.')
  const albumArrForFirestore = res.data.topalbums.album.map((a) => {
    // for each album call the artist info to get the genres
    // and release date along with summary
    return {
      name: a.name,
      image: a.image[a.image.length - 1]['#text'],
    } as AlbumDb
  })
  return albumArrForFirestore
}
async function getArtistAlbumSongs(artist: string, album: string) {
  const getAlbumInfo = `${lastFmBaseUrl}?method=album.getinfo&format=json&${lastFmApiQueryParam}&artist=${artist}&album=${album}`
  const [err, res] = await to(axios.get<GetAlbumInfoRes>(getAlbumInfo))
  if (!res) throw new Error('Failed to fetch from API.')
  const songsArrForFirestore = res.data.album.tracks.track.map((a) => {
    return {
      name: a.name,
      // need all artists that starred on the song,
      album,
    } as SongDb
  })
  return songsArrForFirestore
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.send('hello world')
}
