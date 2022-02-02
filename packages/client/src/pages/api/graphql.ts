import nextConnect from 'next-connect'

const handler = nextConnect()

import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
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
