const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  language: String,
  generation: {
    ref: 'Generation',
    type: ObjectId,
  },
  profileImage: String,
  firstname: String,
  lastname: String,
  nickname: String,
  gender: String,
  birthdate: Date,
  father: {
    ref: 'Profile',
    type: ObjectId,
  },
  mother: {
    ref: 'Profile',
    type: ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

schema.virtual('name').get(function() {
  return `${this.firstname} ${this.lastname}`
})

module.exports = mongoose.model('Profile', schema)
