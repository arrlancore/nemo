'use strict'

import service from './services'
// import aclStore from '../../helper/acl-store'

const moduleName = 'role'
module.exports = {
  create,
  update,
  read,
  list,
  remove
}

async function create (req, res) {
  try {
    const data = req.body
    const role = await service.create(data)
    res.send({ data: role, message: 'new ' + moduleName + ' has been successfully created' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function update (req, res) {
  try {
    const data = req.body
    const id = req.params.id
    const role = await service.update(id, data)
    res.send({ data: role, message: moduleName + ' has been successfully updated' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function remove (req, res) {
  try {
    const id = req.params.id
    const role = await service.remove(id)
    res.send({ message: moduleName + ' has been successfully removed', status: role.ok })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function read (req, res) {
  try {
    const id = req.params.id
    const role = await service.read(id)
    res.send({ data: role })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function list (req, res) {
  try {
    const [role, count] = await service.list(req.query)
    res.send({ data: role, count })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}
