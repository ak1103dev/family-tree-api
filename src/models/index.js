const config = require('config')
const mongoose = require('mongoose')

const User = require('./user')
const Profile = require('./profile')

mongoose.Promise = global.Promise
mongoose.connect(config.get('mongoUrl'))

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
	return this.toString()
}

module.exports = {
  User,
  Profile,
}
