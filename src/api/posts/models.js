'use strict'

import mongoose, { Schema } from 'mongoose'
const readingTime = require('reading-time')

const PostSchema = new Schema({
  title: {
    type: String,
    unique: true,
    max: 32,
    required: [true, 'Judul postingan tidak boleh kosong']
  },
  content: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  },
  status: {
    type: [String],
    enum: ['published', 'draft', 'deleted'],
    default: 'draft'
  },
  excerpt: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  featured: {
    type: Boolean,
    default: false
  },
  featuredImage: {
    type: String,
    default: ''
  },
  tags: {
    type: [String]
  },
  readingTime: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
  reactions: {
    type: [Object]
  },
  metas: {
    type: [Object]
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

const cleanText = str => str.replace(/<\/?[^>]+(>|$)/g, '')

function stringToSlug (str) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeiiiioooouuuunc------'

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  return str
}
PostSchema.pre('save', function preSave (next) {
  this.slug = stringToSlug(this.title)
  const content = cleanText(this.content)
  const stats = readingTime(content)
  this.readingTime = stats.text
  if (!this.excerpt) {
    const excerpt = content
    this.excerpt = excerpt.slice(0, 120)
  }
  next()
})

export default mongoose.model('Post', PostSchema)
