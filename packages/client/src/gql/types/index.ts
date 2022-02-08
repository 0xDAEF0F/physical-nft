const typeDefs = [
  `
  type Artist {
    id: ID!
    mbid: ID
    stageName: String!
    realName: String
    isVerified: Boolean!
    albums: [Album!]
    photo: String
    avatar: String
    publicAddress: String
    nationality: String
    birthDate: String
  }

  type Album {
    id: ID!
    mbid: ID
    title: String!
    image: String!
    starring: [Artist!]!
    songs: [Song!]!
    releaseDate: String!
  }

  type Song {
    id: ID!
    mbid: ID
    title: String!
    performers: [Artist!]!
    genre: [String!]!
    releaseDate: String!
    duration: Int!
    album: String
    image: String
    ownerPk: String
    likes: [User]
    bids: [String]
  }

  type User {
    username: String!
    publicAddress: String!
    nonce: Int!
    avatar: String!
    email: String
    likes: [Resource]
    collection: [Song]
  }

  union Resource = Song | Artist | Album

  input NewUserInput {
    username: String!
    publicAddress: String!
    email: String
  }

  input UserCredentials {
    publicAddress: String!
    signedMessage: String!
  }

  type Mutation {
    likeResource(userId: ID!, resourceId: ID!): ID!
    unlikeResource(userId: ID!, resourceId: ID!): ID!
    createUser(input: NewUserInput!): ID!
    authenticateUser(input: UserCredentials): String!
  }

  type Query {
    browseResource(name: String!): [Resource!]
    getSong(id: ID!): Song!
    getArtist(id: ID!): Artist!
    getAlbum(id: ID!): Album!
    isUserRegistered(publicAddress: String!): Boolean!
    getNonce(publicAddress: String!): Int!
    getTopArtists(limit: Int = 10): [Artist!]!
    getSimilarArtists(artistId: ID!): [Artist!]!
  }
`,
]
export default typeDefs
