const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Token {
    token: String
    userId: ID
  }

  type Parent {
    _id: ID
    name: String
  }

  type Profile {
    _id: ID
    name: String
    nickname: String
    profileImage: String
    gender: String
    birthdate: Date
    father: Parent
    mother: Parent
  }

  type Query {
    getProfileList(language: String!): [Profile]
    getProfile(language: String!, profileId: ID!): Profile
  }

  type Mutation {
    login(username: String!, password: String!): Token
    createProfile(
      language: String!,
      firstname: String!,
      lastname: String!,
      nickname: String!,
      profileImage: String!,
      gender: String!,
      birthdate: Date!,
      father: ID!,
      mother: ID!,
    ) : Profile
    updateProfile(
      firstname: String!,
      lastname: String!,
      nickname: String!,
      profileImage: String!,
      gender: String!,
      birthdate: Date!,
      father: ID!,
      mother: ID!,
    ) : Profile
  }
`

module.exports = typeDefs
