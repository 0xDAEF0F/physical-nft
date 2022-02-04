// this file intention is to seed the DB.
import { AlbumDb, SongDb } from '@/constants/firestore-types'
import { PublicAddress } from '@/constants/index'
import {
  GetTopAlbumsRes,
  GetTopArtistsRes,
  GetAlbumInfoRes,
} from '@/constants/lastfm-types'
import { User } from '@/constants/schema'
import to from 'await-to-js'
import axios from 'axios'
import {
  flatten,
  flattenDeep,
  map,
  orderBy,
  compact,
  range,
  forEach,
} from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

const lastFmBaseUrl = `https://ws.audioscrobbler.com/2.0`
const lastFmApiQueryParam = `api_key=${process.env.LASTFM_API_KEY}`

async function getTopArtistsByPageLastFM(pages: number) {
  const getTopArtistsUrl = `${lastFmBaseUrl}?method=chart.gettopartists&format=json&${lastFmApiQueryParam}`

  return Promise.all(
    range(1, pages + 1).map(async (i) => {
      const [err, res] = await to(
        axios.get<GetTopArtistsRes>(getTopArtistsUrl + `&page=${i}`)
      )
      if (!res) throw new Error(err?.message)

      return res.data.artists.artist
    })
  )
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
  res.send('Hello World!')
}
