type SearchItemRes = {
  artists: {
    href: string
    items: {
      external_urls: {
        spotify: string
      }
      followers: {
        href: any
        total: number
      }
      genres: string[]
      href: string
      id: string
      images: {
        height: number
        url: string
        width: number
      }[]
      name: string
      popularity: number
      type: string
      uri: string
    }[]
    limit: number
    next: string
    offset: number
    previous: any
    total: number
  }
}

export type { SearchItemRes }
