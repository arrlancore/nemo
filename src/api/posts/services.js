'use strict'

import Post from './models'
const ObjectId = require('mongoose').Types.ObjectId

export default {
  create,
  update,
  read,
  remove,
  list,
  readSlug
}

function create (data) {
  try {
    const newEntry = new Post(data)
    return newEntry.save()
  } catch (error) {
    throw new Error(error)
  }
}

function read (id) {
  try {
    return Post.findOne({ _id: new ObjectId(id) })
      .populate('createdBy', 'fullName')
      .populate('author', 'fullName')
  } catch (error) {
    throw new Error(error)
  }
}

function readSlug (slug) {
  try {
    return Post.findOne({ slug })
      .populate('createdBy', 'fullName')
      .populate('author', 'fullName')
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
    if (query.title) {
      condition.title = {
        $regex: new RegExp(query.title)
      }
    }
    if (query.content) {
      condition.content = {
        $regex: new RegExp(query.content)
      }
    }
    // set a custom field selected
    let selected = query.selected || null
    // set options for sorting & pagination
    let options = {
      limit: 25,
      skip: 0,
      sort: '-createdAt'
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
      Post.find(condition, selected, options)
        .populate('author', 'fullName')
        .populate('createdBy', 'fullName'),
      Post.countDocuments(condition)
    ])
  } catch (error) {
    throw new Error(error)
  }
}

function update (id, data) {
  try {
    return Post.updateOne({ _id: id }, { $set: data })
  } catch (error) {
    throw new Error(error)
  }
}

function remove (id) {
  try {
    return Post.remove({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}
