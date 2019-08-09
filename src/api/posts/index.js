'use strict'

import controllers from './controllers'
import aclMiddleware from '../../helper/acl-middleware'

const moduleName = 'master-kelas'

export default (app) => {
  app.use(aclMiddleware)
  app.get(`/${moduleName}`, controllers.list)
    .post(`/${moduleName}`, controllers.add)
  app.get(`/${moduleName}/view`, controllers.view)
    .put(`/${moduleName}/edit`, controllers.edit)
    .delete(`/${moduleName}/remove`, controllers.remove)
  return app
}
