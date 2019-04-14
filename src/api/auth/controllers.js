'use strict'

import services from '../user/services'
import aclStore from '../../helper/acl-store'

export default {
  login,
  signup
}

async function login (req, res) {
  try {
    console.log(req.body)
    const { email, password } = req.body
    const notfoundMessage = 'email or password is incorrect'
    const user = await services.getUserByEmail(email)

    if (!user) throw new Error(notfoundMessage)
    await user.authenticate(password, isMatch => {
      if (!isMatch) {
        return res.status(401).send({ message: notfoundMessage })
      }
      user.password = undefined
      user.generateToken(user, token => {
        res.status(201).json({ token, data: user })
      })
    })
  } catch (error) {
    res.status(400).send(res.setError(error))
  }
}

async function signup (req, res) {
  try {
    const { email, password } = req.body
    const user = await services.create({ email, password })
    await aclStore.acl.addUserRoles(user._id.toString(), user.role, err => {
      if (err) {
        throw new Error(err)
      }
      return res.send({ message: `User ${user.email} successfully created` })
    })
  } catch (error) {
    res.status(500).send(res.setError(error))
  }
}
