'use strict'

import Acl from 'acl'
import aclStore from '../helper/acl-store'

const MongodbBackend = Acl.mongodbBackend

export default dbConnection => {
  const backend = new MongodbBackend(dbConnection, 'acl_')
  const acl = new Acl(backend)

  // Set roles
  acl.allow([
    {
      roles: 'admin',
      allows: [
        { resources: '/api/users', permissions: ['get'] },
        { resources: '/api/role', permissions: '*' },
        { resources: '/api/role/:id', permissions: '*' }
      ]
    }
  ])
  aclStore.acl = acl
}
