'use strict'

import controllers from './controllers'
import aclMiddleware from '../../helper/acl-middleware'

const moduleName = 'post'
const publicModuleName = 'v1/public/post'

export default (app) => {
  app.get(`/${publicModuleName}`, controllers.list)
  app.get(`/${publicModuleName}/read`, controllers.readBySlug)
  app.get(`/${moduleName}`, aclMiddleware, controllers.list)
    .post(`/${moduleName}`, aclMiddleware, controllers.add)
  app.get(`/${moduleName}/one`, aclMiddleware, controllers.read)
    .put(`/${moduleName}/one`, aclMiddleware, controllers.edit)
    .delete(`/${moduleName}/one`, aclMiddleware, controllers.remove)
  return app
}
