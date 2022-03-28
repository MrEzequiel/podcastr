import type { NextApiRequest, NextApiResponse } from 'next'

import data from '../../../../data.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await sleep(750)
  res.status(200).json(data)
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
