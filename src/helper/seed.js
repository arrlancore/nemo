import aclStore from './acl-store'

const { ObjectId } = require('mongodb')
const { createHash } = require('crypto')

// Returns a predictable ObjectId based on input name
const getObjectId = name => {
  const hash = createHash('sha1').update(name, 'utf8').digest('hex')

  return new ObjectId(hash.substring(0, 24))
}

const getObjectIds = names => {
  return names.map(name => getObjectId(name))
}

const mapToEntities = names => {
  return names.map(name => {
    const id = getObjectId(name)
    return {
      id,
      name
    }
  })
}

const userData = {
  _id: getObjectId('user1'),
  role: 'admin',
  roles: ['admin'],
  email: 'admin@abc.com',
  username: 'admin@abc.com',
  firstName: 'admin',
  lastName: 'super',
  phone: '123',
  password: 'Password2019',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'confirmed'
}

const roleData = [
  {
    _id: getObjectId('role1'),
    name: 'admin',
    description: 'user admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: getObjectId('user1')
  },
  {
    _id: getObjectId('role2'),
    name: 'user',
    description: 'normal user',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: getObjectId('user1')
  }
]

async function removeCollections (collections) {
  const keys = Object.keys(collections)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    await collections[key].drop()
  }
}

async function seedingCollections (listCollections) {
  try {
    for (let i = 0; i < listCollections.length; i++) {
      const { model, data } = listCollections[i]
      if (data[0]) {
        for (let x = 0; x < data.length; x++) {
          const selectOne = data[x]
          const collection = model(selectOne)
          await collection.save()
        }
      } else {
        const collection = model(data)
        await collection.save()
      }
    }
    console.log('[SEED] db has been completed')
  } catch (error) {
    console.log('error: ', error)
  }
}

async function startSeed (databaseConnected) {
  // b3daa77b4c04a9551b8781d0
  const db = await databaseConnected
  await removeCollections(db.connections[0].collections)

  const User = db.models.User
  const Role = db.models.Role

  seedingCollections([
    {
      model: User,
      data: userData
    },
    {
      model: Role,
      data: roleData
    }
  ])

  if (userData) {
    await aclStore.acl.addUserRoles(userData._id.toString(), userData.role, err => {
      if (err) {
        throw new Error(err)
      }
    })
  }
}

module.exports = {
  mapToEntities,
  getObjectId,
  getObjectIds,
  startSeed
}
