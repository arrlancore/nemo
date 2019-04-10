import express from 'express'
import mongoose from 'mongoose'
import config from './config/config'
import expressConfig from './config/express'
import auth from './config/auth'
import routesConfig from './config/routes'
import aclConfig from './config/acl'

const app = express()

// initialize express
expressConfig(app)

app.use(auth.initialize())
auth.setJwtStrategy()
// mongoose.set('useFindAndModify', false)
mongoose.connect(
  config.db,
  config.dbOptions,
  err => {
    if (err) {
      console.log(`[MongoDB] Failed to connect. ${err}`)
    } else {
      console.log(`[MongoDB] connected: ${config.db}`)
      authorizationSetup()
    }
  }
)

app.listen(config.apiPort, () => {
  console.log(`[Server] listening on port ${config.apiPort}`)
})

process.on('unhandledRejection', function (reason, p) {
  console.log('[ERROR] unhandledRejection error:\n', p)
  console.dir(reason)
  console.log(reason.stack)
})

function authorizationSetup () {
  aclConfig(mongoose.connection.db)

  // initialize api
  routesConfig(app)
}

export default app
