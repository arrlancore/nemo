'use strict'

import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler } from '../helper/error-handler'
import { loggerDevelopment, loggerProduction } from '../helper/logger'
export default app => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use((req, res, next) => {
    res.setError = errorHandler
    next()
  })
  if (process.env.NODE_ENV === 'prod') {
    app.use(loggerProduction())
  } else {
    app.use(loggerDevelopment())
  }
}
