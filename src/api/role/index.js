'use strict'

import controllers from './controllers'
// import aclStore from '../../helper/acl-store'
import permit from '../../config/policy'

const moduleName = 'role'

export default (app) => {
  // const protectAllResource = aclStore.middleware
  app.use(permit)
  app.get(`/${moduleName}`, controllers.list)
    .post(`/${moduleName}`, controllers.create)
  app.get(`/${moduleName}/:id`, controllers.read)
    .put(`/${moduleName}/:id`, controllers.read)
    .delete(`/${moduleName}/:id`, controllers.read)
  return app
}
