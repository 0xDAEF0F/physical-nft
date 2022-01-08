import axios from 'axios'

export type Artist = {
  name: string
  playcount: string
  listeners: string
  url: string
  mbid: string
  image: {
    size: string
    '#text': string
  }[]
}

const getTopArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}`

export async function fetchArtists() {
  const response = await axios(getTopArtistsUrl)
  const artists: Artist[] = response.data.artists.artist
  return artists
}

export default function TopArtists({ topArtists }: { topArtists: Artist[] }) {
  const artistHtml = (
    <div className='pt-6 -z-10'>
      {topArtists?.map((artist, i) => {
        return (
          <div key={i} className='block'>
            <p className='inline'>{artist.name}</p>
            <p className='inline ml-3'>
              Playcount: {Number(artist.playcount).toLocaleString()}
            </p>
          </div>
        )
      })}
    </div>
  )
  return <div>{artistHtml}</div>
}
