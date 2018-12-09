const config = require('config')
const mongoose = require('mongoose')

const User = require('./user')

mongoose.Promise = global.Promise
mongoose.connect(config.get('mongoUrl'))

module.exports = {
  User,
  AccessToken,
}
