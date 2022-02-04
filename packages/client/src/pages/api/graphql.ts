import nextConnect from 'next-connect'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const handler = nextConnect()
const schema = buildSchema(`
  type Artist {
    id: ID!
    stageName: String!
    realName: String
    isVerified: Boolean!
    albums: [Album!]
    photo: String
    avatar: String
    publicAddress: String
    nationality: String
    birthDate: Date
  }

  type Album {
    id: ID!
    title: String!
    image: String!
    starring: [Artist!]!
    songs: [Song!]!
    releaseDate: Date!
  }

  type Song {
    id: ID!
    title: String!
    performers: [Artist!]!
    genre: [String!]!
    releaseDate: Date!
    album: String
    image: String
    ownerPk: String
    likes: [User]
    bids: [Bid]
  }

  type User {
    username: String!
    publicAddress: String!
    nonce: Nonce!
    avatar: String!
    email: String
    likes: [Resource]
    collection: [Song]
  }

  """
  Change this
  """
  type Bid = String

  type Date = String
  type Nonce = Int
  type JWT = String

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
    authenticateUser(input: UserCredentials): JWT!
    """
    All blockchain related functions pending
    """
  }

  type Query {
    browseResource(name: String!): [Resource!]
    isUserRegistered(publicAddress: String!): Boolean!
    getNonce(): Nonce!
    getTopArtists(limit: Int = 10): [Artist!]!
    getSimilarArtists(songId: ID!): [Artist!]!
    getArtist(id: ID!): Artist!
    getSong(id: ID!): Song!
    getAlbum(id: ID!): Album!
  }
`)

const root = {
  browseResource: () => {
    return 'browse here'
  },
  getTopArtists: () => {
    return 'artists here'
  },
}

const DEV = process.env.VERCEL_ENV === 'development' ? true : false
handler.use(
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: DEV,
  })
)

export default handler
