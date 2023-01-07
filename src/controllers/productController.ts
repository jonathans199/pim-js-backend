import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils.js'
import Product from '../models/productModel.js'
import { addLog } from './logController.js'

export const addProduct: RequestHandler = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    try {
      const duplicateProduct = await Product.findOne({ product_id: req.body.product_id })
      if (duplicateProduct) {
        return res.status(401).json({ error: 'product already in system' })
      }

      const newProduct = {
        product_id: createRandomId(),
        created_by: req.body.created_by.user_id,
        ...req.body,
      }

      const productCreated = await Product.create(newProduct)

      if (productCreated) {
        const log = {
          user_id: req.body.created_by.user_id,
          model: 'product',
          event_type: 'new',
          item_id: productCreated.product_id,
        }
        await addLog(log)
        res.send('product created')
      } else {
        res.status(401).json({ error: 'product was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data or HTTP method' })
    }
  }
}

export const updateProduct: RequestHandler = async (req, res) => {
  if (req.body) {
    try {
      await Product.findOneAndUpdate({ product_id: req.body.product_id }, { $set: req.body })
      const productUpdated = await Product.findOne({ product_id: req.body.product_id })

      if (productUpdated) {
        const log = {
          user_id: req.body.realtorId,
          model: 'product',
          event_type: 'updated',
          item_id: productUpdated.product_id,
        }

        addLog(log)
        res.send(productUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const allProducts = await Product.find()
    res.send(allProducts)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all Products' })
  }
}

export const disableProduct: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const { product_id } = req.params
    const productUpdated = await Product.findOneAndUpdate({ product_id: product_id }, { $set: { enabled: false } })

    if (productUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'product',
        event_type: 'disabled',
        item_id: productUpdated.product_id,
      }

      addLog(log)
      res.status(200).send({ success: `Product id ${product_id} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
