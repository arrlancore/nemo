'use strict'

import aclStore from '../helper/acl-store'
import { Router } from 'express'
import packageJson from '../../package.json'

const fs = require('fs')
const path = require('path')
const API = '/api'

const sourceApi = path.resolve('./src/api')

export default app => {
  const { acl } = aclStore

  /**
   * Public
   */
  app.get(API, async (req, res) => {
    await setTimeout(async () => {
      res.json({ version: await packageJson.version })
    }, 100)
  })

  let modules = fs.readdirSync(sourceApi)
  for (let i = 0; i < modules.length; i++) {
    let directoryName = modules[i]
    const module = require(path.resolve('./src/api/' + directoryName))
    // console.log(module.default())
    app.use(API, module.default(Router()))
  }
  /**
   * Private
   */
  // applies passport authentication on all following routes
  // app.all('*', auth.authenticate(), (req, res, next) => next())

  // Example endpoint only available for 'admin' role
  app.get(`${API}/adminonly`, acl.middleware(), (req, res) => res.sendStatus(200))

  // Example protected endpoint
  app.get(`${API}/protected`, (req, res) => res.sendStatus(200))

  // Will return error message as a string -> "Insufficient permissions to access resource"
  app.use(acl.middleware.errorHandler('json'))
}
