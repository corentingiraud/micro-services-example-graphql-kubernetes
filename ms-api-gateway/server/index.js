const { GraphQLServer } = require('graphql-yoga');
const asyncHandler = require('express-async-handler');
const { checkAll } = require('./check');
const { postQueries } = require('./queries');
const { postMutations } = require('./mutations');

const typeDefs = `
type Post {
  id: Int!
  title: String
  body: String
}

type Query {
  posts: [Post]
  post(id: ID!): Post
}

type Mutation {
  createPost(title: String!, body: String): Post
  deletePost(id: ID!): Boolean,
}
`

const resolvers = {
  Query: {
    posts: async () => postQueries.getAll(),
    post: async (obj, args, context, info) => postQueries.getById(args.id)
  },
  Mutation: {
    createPost: async (obj, args, context, info) => postMutations.create(args),
    deletePost: async (obj, args, context, info) => postMutations.deleteById(args.id)
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.get('/check', asyncHandler(checkAll));

server.start({ port: 8080 },() => console.log(`The server is running on http://localhost:8080`))
