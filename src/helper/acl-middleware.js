'use strict'
import aclStore from './acl-store'
import auth from '../config/auth'

function aclMiddleware (req, res, next) {
  const acl = aclStore.acl
  const resource = '/api' + req.path
  const userId = req.user ? req.user._id.toString() : 'guest'
  const authorized = () => acl.isAllowed(userId, resource, req.method.toLowerCase(), (err, allowed) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    if (req.user.role === 'admin') {
      // aalow admin to access all resurces
      return next()
    }
    if (!allowed) {
      return res.status(403).send({
        message: 'Insufficient permissions to access resource'
      })
    }
    next()
  })
  auth.authenticate()(req, res, next, authorized)
}

export default aclMiddleware
