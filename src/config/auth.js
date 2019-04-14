'use strict'

import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../api/user/models'
import config from './config'

export default {
  initialize: () => passport.initialize(),
  setJwtStrategy
}

function setJwtStrategy () {
  const opts = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.jwt.secret,
    passReqToCallback: false
  }
  const strategy = new passportJwt.Strategy(opts, (jwtPayload, done) => {
    const _id = jwtPayload.id
    User.findOne({ _id }, (err, user) => {
      if (err) done(err, false)
      done(null, user || false)
    })
  })
  passport.use(strategy)
}
