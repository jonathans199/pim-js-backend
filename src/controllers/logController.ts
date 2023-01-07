import { RequestHandler } from 'express'

import Log from '../models/logsModel.js'

interface Tlog {
  user_id: string
  model: string
  event_type: string
  item_id: string | number
}

export const addLog = async (args: Tlog) => {
  await Log.create({ user_id: args.user_id, model: args.model, eventType: args.event_type, itemId: args.item_id })
}

export const getLogs: RequestHandler = async (req, res) => {
  try {
    const allLogs = await Log.find()
    res.send(allLogs)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Logs' })
  }
}
 