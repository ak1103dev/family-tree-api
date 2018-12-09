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
    login(parent, args) {
      const { username, password } = args
      console.log('username', username)
      console.log('password', password)
      return {
        token: 'xxx',
        userId: 'yyy'
      }
    },
    createProfile() {

    },
    updateProfile() {

    }
  }
}

module.exports = resolvers
