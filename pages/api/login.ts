import type{ NextApiRequest, NextApiResponse } from 'next'

export default (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {

  }
  return res.status(405)
}