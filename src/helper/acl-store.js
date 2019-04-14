'use strict'

class AclStore {
  constructor () {
    this._acl = null
  }

  set acl (acl) {
    this._acl = acl
  }

  get acl () {
    return this._acl
  }

  get middleware () {
    return this._acl.middleware()
  }
}

const aclStore = new AclStore()
export default aclStore
