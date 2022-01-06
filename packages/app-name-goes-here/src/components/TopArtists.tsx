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

const topArtistsUrl = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&api_key=${process.env.NEXT_PUBLIC_LASTFM_API_KEY}`

export default function TopArtists({ topArtists }: { topArtists: Artist[] }) {
  const artistHtml = (
    <div>
      {topArtists?.map((artist, i) => {
        return (
          <div key={i} className='flex'>
            <p className='mr-3'>{artist.name}</p>
            <p>{Number(artist.playcount).toLocaleString()}</p>
          </div>
        )
      })}
    </div>
  )
  return <div>{artistHtml}</div>
}

export async function fetchArtists() {
  const response = await axios(topArtistsUrl)
  const artists = response.data.artists.artist
  return artists as Artist[]
}
