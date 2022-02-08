import nextConnect from 'next-connect'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from 'src/gql/types'
import resolvers from 'src/gql/resolvers'

const handler = nextConnect()
const DEV = process.env.VERCEL_ENV === 'development' ? true : false

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

handler.use(
  graphqlHTTP({
    schema,
    graphiql: DEV,
  })
)

export default handler
