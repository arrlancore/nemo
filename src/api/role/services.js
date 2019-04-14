'use strict'

import Role from './models'

export default {
  create,
  update,
  read,
  remove,
  list
}

function create (data) {
  try {
    const newUser = new Role(data)
    return newUser.save()
  } catch (error) {
    throw new Error(error)
  }
}

function read (id) {
  try {
    return Role.findOne({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}

function list (query) {
  try {
    // filter the list
    let condition = {}
    if (query._id) {
      condition._id = query._id
    }
    if (query.name) {
      condition.name = {
        $regex: new RegExp(query.name)
      }
    }
    if (query.description) {
      condition.description = {
        $regex: new RegExp(query.description)
      }
    }
    // set a custom field selected
    let selected = query.selected || null
    // set options for sorting & pagination
    let options = {
      limit: 25,
      skip: 0,
      sort: 'createdAt'
    }
    if (query.limit) {
      options.limit = Number(query.limit)
    }
    if (query.page) {
      options.skip = (Number(query.page) - 1) * query.limit
    }
    if (query.sort) {
      options.sort = query.sort
    }
    return Promise.all([
      Role.find(condition, selected, options),
      Role.countDocuments(condition)
    ])
  } catch (error) {
    throw new Error(error)
  }
}

function update (id, data) {
  try {
    return Role.updateOne({ _id: id }, { $set: data })
  } catch (error) {
    throw new Error(error)
  }
}

function remove (id) {
  try {
    return Role.remove({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}
