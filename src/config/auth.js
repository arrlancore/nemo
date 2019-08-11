'use strict'

import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../api/user/models'
import config from './config'

const GoogleStrategy = require('passport-google-oauth20').Strategy

const authenticate = () => (req, res, next, authorized) => {
  passport.authenticate('jwt', function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err.message
      })
    }
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized, please login first!'
      })
    }
    authorized()
  })(req, res, next)
}

export default {
  initialize: () => passport.initialize(),
  setJwtStrategy,
  authenticate
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
  passport.use(new GoogleStrategy(config.client.google,
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      })
    }
  ))
}
