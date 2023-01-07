import { RequestHandler } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { createRandomId } from '../utils/utils.js'
import User from '../models/userModel.js'
import { addLog } from './logController.js'

export const createUser: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    const { email, password, phone, first_name, last_name, username, department } = req.body
    try {
      const duplicateEmail = await User.findOne({ email: email })

      if (!duplicateEmail) {
        const newUser = {
          user_id: createRandomId(),
          ...req.body,
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const userCreated = await User.create({
          ...newUser,
          password: hashedPassword,
        })

        if (userCreated) {
          const accessToken = jwt.sign(userCreated.toJSON(), process.env.PRIVATE_KEY as string)

          jwt.verify(accessToken, process.env.PRIVATE_KEY as string, async (err, decoded) => {
            res.send({ ...(decoded as any), accessToken: accessToken })
          })
        } else {
          res.status(401).json({ error: 'Use was not created' })
        }
      } else {
        res.status(401).json({ error: 'Email already in use' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const login: RequestHandler = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const accessToken = jwt.sign(user.toJSON(), process.env.PRIVATE_KEY as string)

      jwt.verify(accessToken, process.env.PRIVATE_KEY as string, async (err, decoded) => {
        if (decoded) {
          console.log(decoded)
          const { user_id }: any = decoded

          const log = {
            user_id: user_id,
            model: 'user',
            event_type: 'login',
            item_id: user_id,
          }

          await addLog(log)
          res.send({ ...(decoded as any), accessToken: accessToken })
        }
      })
    } else {
      res.send('No user found or invalid password')
    }
  } catch (err) {
    console.error(err)
  }
}

export const updateUser: RequestHandler = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (req.body) {
    const userDetails = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      agency: req.body.agency,
      phone: req.body.phone,
    }

    try {
      const realtorUpdated = await User.findOneAndUpdate({ user_id: req.body.user_id }, { $set: userDetails })

      if (realtorUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'realtor',
          event_type: 'update',
          item_id: req.body.user_id,
        }

        addLog(log)
        res.send({ ...realtorUpdated, accessToken: token })
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.send(allUsers)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Users' })
  }
}

export const disableUser: RequestHandler = async (req, res) => {
  if (req.params) {
    const { user_id } = req.params
    try {
      const userUpdated: any = await User.findOneAndUpdate({ user_id: user_id }, { $set: { enabled: false } })

      if (userUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'user',
          event_type: 'disable',
          item_id: userUpdated.user_id,
        }

        addLog(log)

        res.status(200).send({ success: `user id ${user_id} has been disabled ` })
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}
