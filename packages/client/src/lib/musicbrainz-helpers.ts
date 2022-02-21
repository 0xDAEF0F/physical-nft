// @ts-ignore
import { MusicBrainz, createContext, baseSchema } from 'graphbrainz'
import { to } from 'await-to-js'
import { graphql } from 'graphql'

const client = new MusicBrainz()
const context = createContext({ client })

const artistQuery = (mbid: string) =>
  `
      {
        lookup {
          artist(mbid: ${mbid}) {
            name
            country
            lifeSpan {
              begin
              end
              ended
            }
            theAudioDb {
              biography
            }
            discogs {
              realName
            }
          }
        }
      }
    `

// info required from API:
// lifeSpan, real name, country, biography
export async function lookupArtistByMbid(mbid: string) {
  const [err, result] = await to(
    graphql({
      schema: baseSchema,
      source: artistQuery(mbid),
      contextValue: context,
    })
  )
  if (!result) throw new Error(err?.message)
  return result
}
