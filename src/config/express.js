'use strict'

import bodyParser from 'body-parser'
import helmet from 'helmet'
import passport from 'passport'
// import cookieSession from 'cookie-session'
import cors from 'cors'
// import auth from './auth'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { errorHandler } from '../helper/error-handler'
import { loggerDevelopment, loggerProduction } from '../helper/logger'
import config from './config'
const MongoStore = require('connect-mongo')(session)

function userAuthenticate (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err) {
      return next(new Error(err))
    }
    if (user) {
      req.user = user
    }
    next()
  })(req, res, next)
}

function userSession (dbConnec) {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    store: new MongoStore({
      mongooseConnection: dbConnec.connection,
      collection: config.sessionCollection
    })
  })
}

export default async (app, db) => {
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(helmet())
  app.use(cors())
  app.use(cookieParser())
  app.use((req, res, next) => {
    res.setError = errorHandler
    next()
  })
  app.use(userAuthenticate)
  let dbConnec = await db
  app.use(userSession(dbConnec))
  if (process.env.NODE_ENV === 'prod') {
    app.use(loggerProduction())
  } else {
    app.use(loggerDevelopment())
  }
}
