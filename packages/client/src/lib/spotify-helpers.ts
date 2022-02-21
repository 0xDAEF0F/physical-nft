import axios, { AxiosRequestConfig } from 'axios'
import to from 'await-to-js'
import qs from 'qs'
import { ArtistDb } from '@/constants/firestore-types'
import { SearchItemRes } from '@/constants/spotify-types'

const spotifyBaseURL = 'https://api.spotify.com/v1' as const

export async function getSpotifyToken() {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
    },
    data: qs.stringify({ grant_type: 'client_credentials' }),
  }
  const [err, res] = await to(axios(config))
  if (err) throw new Error(err.message)
  return ('Bearer ' + res?.data.access_token) as string
}

export async function searchArtistSpotify(stageName: string) {
  const searchURL = `${spotifyBaseURL}/search?q=${stageName}&type=artist`
  const [err, res] = await to(
    axios.get<SearchItemRes>(searchURL, {
      headers: { Authorization: await getSpotifyToken() },
    })
  )
  if (err) throw new Error(err.message)
  const firstResult = res?.data.artists.items[0]
  return {
    spotifyId: firstResult?.id,
    popularity: firstResult?.popularity,
    genres: firstResult?.genres,
  } as ArtistDb
}
