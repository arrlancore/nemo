'use strict'

import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Role name is required']
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  updatedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

export default mongoose.model('Role', RoleSchema)
