const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('config')

const { User, Profile } = require('../models')

const resolvers = {
  Query: {
    async getProfileList(parent, args, context, info) {
      console.log('parent', parent)
      console.log('args', args)
      console.log('context', context)
      console.log('info', info)
      const { language } = args
      return await Profile.find({ language }).lean()
    },
    async getProfile(parent, args, context, info) {
      const { language, profileId } = args
      return await Profile.findOne({ _id: profileId, language }).lean()
    }
  },
  Mutation: {
    async login(parent, args) {
      const { username, password } = args
      try {
        const user = await User.findOne({ username }).lean()
        if (!user) {
          throw new ApolloError('LOGIN_FAILED', 401)
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
          throw new ApolloError('LOGIN_FAILED', 401)
        }
        const expiresIn = 24 * (60 * 60)
        const expirationDate = Math.floor(Date.now() / 1000) + expiresIn // 1 day
        const token = jwt.sign(
          { userId: user._id, exp: expirationDate },
          config.get('jwtSecret')
          // { expiresIn }
        )
        return {
          token,
          userId: user._id.toString()
        }
      } catch(err) {
        return err
      }
    },
    createProfile() {

    },
    updateProfile() {

    }
  }
}

module.exports = resolvers
