const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schemas/typeDefs')
const resolvers = require('./schemas/resolvers')
const registerAdmin = require('./bin/registerAdmin')

registerAdmin()

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server
