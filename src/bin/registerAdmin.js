const bcrypt = require('bcryptjs')
const config = require('config')

const { User } = require('../models')

const register = async () => {
  const username = 'admin'
  const admin = await User.findOne({ username })
  if (!admin) {
    const password = config.get('adminPassword')
    const passwordHash = bcrypt.hashSync(password, 10);
    return await new User({
      username,
      password: passwordHash
    }).save()
  }
  console.log('Already admin')
  return {}
}

module.exports = register