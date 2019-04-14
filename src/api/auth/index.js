'use strict'

import controllers from './controllers'

export default (app) => {
  app.post('/auth/signup', controllers.signup)
  app.post('/auth/login', controllers.login)
  return app
}
