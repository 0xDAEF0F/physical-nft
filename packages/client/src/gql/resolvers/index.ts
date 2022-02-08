const resolvers = {
  Query: {
    browseResource: () => {
      return 'browse here'
    },
    isUserRegistered: () => {
      return true
    },
    getTopArtists: () => {
      return 'artists here'
    },
    getNonce: () => {
      return 10
    },
    getArtist: () => {
      return null
    },
    getSong: () => {
      return
    },
    getAlbum: () => {
      return
    },
    Mutation: {
      likeResource: () => {
        return
      },
      unlinkeResource: () => {
        return
      },
      createUser: () => {
        return
      },
      authenticateUser: () => {
        return
      },
    },
  },
}

export default resolvers
