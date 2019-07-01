'use strict'

import controllers from './controllers'
import passport from 'passport'

export default (app) => {
  app.post('/auth/signup', controllers.signup)
  app.post('/auth/login', controllers.login)
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }))
  return app
}
