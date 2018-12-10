const { ApolloServer } = require('apollo-server');
const config = require('config')
const jwt = require('jsonwebtoken')

const typeDefs = require('./schemas/typeDefs')
const resolvers = require('./schemas/resolvers')
const registerAdmin = require('./bin/registerAdmin')

registerAdmin()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => {
    const { req } = ctx
    const token = req.headers.authorization || '';
    if (!token) {
      return ctx
    }
    const data = jwt.verify(token, config.get('jwtSecret'))
    if ((data.exp * 1000) < Date.now()) {
      return { isAuthorization: false }
    }
    return { isAuthorization: true, user: data };
  },
});

module.exports = server
