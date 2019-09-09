'use strict'

import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    max: 32,
    required: [true, 'Tag name is required']
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  color: {
    type: String
  },
  image: {
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

export default mongoose.model('Tag', TagSchema)
