'use strict'

import controllers from './controllers'
import aclMiddleware from '../../helper/acl-middleware'

const moduleName = 'role'

export default (app) => {
  app.get(`/${moduleName}`, aclMiddleware, controllers.list)
    .post(`/${moduleName}`, aclMiddleware, controllers.add)
  app.get(`/${moduleName}/one`, aclMiddleware, controllers.read)
    .put(`/${moduleName}/one`, aclMiddleware, controllers.edit)
    .delete(`/${moduleName}/one`, aclMiddleware, controllers.remove)
  return app
}
