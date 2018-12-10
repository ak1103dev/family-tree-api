const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const config = require('config')

const { User, Profile } = require('../models')

const resolvers = {
  Query: {
    async getProfileList(parent, args, context, info) {
      const { language } = args
      const { isAuthorization } = context
      if (!isAuthorization) {
        throw new ApolloError('UNAUTHORIZATION', 401)
      }
      return await Profile.find({ language })
    },
    async getProfile(parent, args, context, info) {
      const { profileId } = args
      const { isAuthorization } = context
      if (!isAuthorization) {
        throw new ApolloError('UNAUTHORIZATION', 401)
      }
      return await Profile.findOne({ _id: profileId })
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
          userId: user._id
        }
      } catch(err) {
        return err
      }
    },
    createProfile(parent, args, context) {
      const { isAuthorization } = context
      if (!isAuthorization) {
        throw new ApolloError('UNAUTHORIZATION', 401)
      }
      return new Profile(args).save()
    },
    async updateProfile(parent, args) {
      const { _id, ...params } = args
      const { isAuthorization } = context
      if (!isAuthorization) {
        throw new ApolloError('UNAUTHORIZATION', 401)
      }
      const profile = await Profile.findById(_id)
      if (!profile) {
        throw new ApolloError('PROFILE_NOT_FOUND', 404)
      }
      Object.keys(params).map((key) => {
        profile[key] = params[key]
      })
      profile.updatedAt = Date.now()
      return profile.save()
    }
  }
}

module.exports = resolvers
