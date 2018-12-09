const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  language: String,
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

module.exports = mongoose.model('Profile', schema)
