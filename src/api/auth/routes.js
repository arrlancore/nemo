'use strict'

import express from 'express'
import controllers from './controllers'

export default () => {
  const router = express.Router()

  router.route('/auth/signup').post(controllers.signup)

  router.route('/auth/login').post(controllers.login)

  return router
}
