'use strict'

import service from './services'

const moduleName = 'master-kelas'
module.exports = {
  add,
  edit,
  view,
  list,
  remove
}

async function add (req, res) {
  try {
    const data = req.body
    if (req.user) {
      data.createdBy = req.user._id
    }
    const role = await service.create(data)
    res.send({ data: role, message: 'new ' + moduleName + ' has been successfully created' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function edit (req, res) {
  try {
    const data = req.body
    const { id } = req.query
    if (req.user) {
      data.updatedBy = req.user._id
    }
    const role = await service.update(id, data)
    res.send({ status: role.ok, message: moduleName + ' has been successfully updated' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function remove (req, res) {
  try {
    const { id } = req.query
    const role = await service.remove(id)
    res.send({ message: moduleName + ' has been successfully removed', status: role.ok })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function view (req, res) {
  try {
    const { id } = req.query
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
