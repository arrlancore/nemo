'use strict'

export default (app) => {
  app.get(`/acl`, (req, res) => { res.send('<div>hello</div>') })
  return app
}
