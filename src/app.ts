import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import cors from 'cors'
import 'dotenv/config'

import { mongooseConnect } from './utils/mongoUtility.js'

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Library APIs',
      version: '1.0.0',
    },
  }, 
  apis: ['./dist/routes/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 4040, () => console.log(`port running on ${process.env.PORT}`))

import userRoutes from './routes/userRoutes.js'
app.use('/api/users', userRoutes)

import propertyRoutes from './routes/productRoutes.js'
app.use('/api/products', propertyRoutes)

import logRoutes from './routes/logRoutes.js'
app.use('/api/logs', logRoutes)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

mongooseConnect()
