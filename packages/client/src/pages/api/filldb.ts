import { getTopArtistsByPageLastFM } from '@/lib/lastfm-helpers'
import { NextApiRequest, NextApiResponse } from 'next'
import { createArtistsInBatches } from 'src/server/server-firebase-helpers'
import to from 'await-to-js'
import { flatten } from 'lodash'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  // const [, artists] = await to(getTopArtistsByPageLastFM(1))
  // if (!artists) return res.status(500).send('Error fetching')
  // const [err, resul] = await to(createArtistsInBatches(artists))
  // if (!resul) return res.status(500).send(err?.message)
  // return res.status(200).send(flatten(resul))
  return res.send('hello world!')
}
