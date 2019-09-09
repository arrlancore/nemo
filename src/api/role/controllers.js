'use strict'

import service from './services'
// import aclStore from '../../helper/acl-store'

const moduleName = 'role'
module.exports = {
  add,
  edit,
  read,
  list,
  remove
}

async function add (req, res) {
  try {
    const data = req.body
    if (req.user) {
      data.createdBy = req.user._id
      data.author = req.user._id
    }
    const response = await service.create(data)
    res.send({ data: response, message: 'new ' + moduleName + ' has been successfully created' })
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
    const response = await service.update(id, data)
    res.send({ status: response.ok, message: moduleName + ' has been successfully updated' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function remove (req, res) {
  try {
    const { id } = req.query
    const data = await service.remove(id)
    res.send({ message: moduleName + ' has been successfully removed', status: data.ok })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function read (req, res) {
  try {
    const { id } = req.query
    const viewData = await service.read(id)
    if (viewData) return res.send(viewData)
    res.status(404).send({ message: 'Data not found' })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function list (req, res) {
  try {
    const [data, count] = await service.list(req.query)
    res.send({ data, count })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}
