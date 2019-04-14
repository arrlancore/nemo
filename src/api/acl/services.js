'use strict'

import User from './models'

export default {
  getUserByEmail,
  create,
  remove
}

function getUserByEmail (email) {
  try {
    return User.findOne({ email })
  } catch (error) {
    throw new Error(error)
  }
}

function create (data) {
  try {
    const newUser = new User(data)
    return newUser.save()
  } catch (error) {
    throw new Error(error)
  }
}

function remove (id) {
  try {
    return User.remove({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}
