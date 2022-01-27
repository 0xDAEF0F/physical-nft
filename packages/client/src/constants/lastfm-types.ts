export type GetTopArtistsRes = {
  artists: {
    artist: {
      name: string
      playcount: string
      listeners: string
      mbid: string
      url: string
      streamable: string
      image: {
        '#text': string
        size: string
      }[]
    }[]
  }
  '@attr': {
    page: string
    perPage: string
    totalPages: string
    total: string
  }
}

export type GetTopAlbumsRes = {
  topalbums: {
    album: {
      name: string
      playcount: number
      mbid: string
      url: string
      artist: {
        name: string
        mbid: string
        url: string
      }
      image: {
        '#text': string
        size: string
      }[]
    }[]
  }
  '@attr': {
    artist: string
    page: string
    perPage: string
    totalPages: string
    total: string
  }
}

export type GetAlbumInfoRes = {
  album: {
    artist: string
    mbid: string
    tags: {
      tag: {
        url: string
        name: string
      }[]
    }
    playcount: string
    image: {
      size: string
      '#text': string
    }[]

    tracks: {
      track: {
        streamable: {
          fulltrack: string
          '#text': string
        }
        duration: 336
        url: string
        name: string
        string: {
          rank: 1
        }
        artist: {
          url: string
          name: string
          mbid: string
        }
      }[]
    }
    url: string
    name: string
    listeners: string
    wiki: {
      published: string
      summary: string
      content: string
    }
  }
}
