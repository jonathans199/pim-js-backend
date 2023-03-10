import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import Realtor from '../models/userModel.js'

export const auth: RequestHandler = (req, res, next) => {
  const token: string | undefined = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).send({ error: 'you must be logged in' })
  }

  jwt.verify(token, process.env.PRIVATE_KEY as string, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'you must be logged in' })
    }

    if (decoded) {
      const { user_id }: any = decoded
      const realtorFound = await Realtor.findOne({ user_id: user_id })
      if (realtorFound) next()
    }
  })
}
