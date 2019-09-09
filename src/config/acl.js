'use strict'

import Acl from 'acl'
import aclStore from '../helper/acl-store'

const MongodbBackend = Acl.mongodbBackend

export default dbConnection => {
  const backend = new MongodbBackend(dbConnection, 'acl_')
  const acl = new Acl(backend)

  // allow some routes
  const roleRoutes = '/api/role'
  const userRoutes = '/api/users'

  // Set roles
  acl.allow([
    {
      roles: 'admin',
      allows: [
        ...generateAdminCrudRoute(userRoutes),
        ...generateAdminCrudRoute(roleRoutes),
        { resources: `${roleRoutes}/:id`, permissions: ['get'] }
      ]
    }
  ])

  // acl.removeAllow('admin', '/api/role', '*', (err) => { if (err) console.log('errr', err) })
  // acl.removeAllow('admin', '/api/role/:id', 'get', (err) => { if (err) console.log('errr', err) })

  function generateAdminCrudRoute (routes) {
    return [
      { resources: `${routes}`, permissions: ['*'] },
      { resources: `${routes}/view`, permissions: ['get'] },
      { resources: `${routes}/edit`, permissions: ['put'] },
      { resources: `${routes}/remove`, permissions: ['delete'] }
    ]
  }
  aclStore.acl = acl
}
