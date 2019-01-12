const { GraphQLServer } = require('graphql-yoga');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

// Constantss
const PORT = process.env.PORT || 8080;

const comments = [{
  id: 1,
  body: "Comment 1",
  postId: 1
}, {
  id: 2,
  body: "Comment 2",
  postId: 1
}];

const typeDefs = `
type Comment {
  id: Int!
  body: String,
  postId: ID
}

type Query {
  comments: [Comment]
  commentsByPostId(id: ID!): [Comment]
}
`
const resolvers = {
  Query: {
    comments: async () => comments,
    commentsByPostId: async (obj, args, context, info) => {
      return comments.filter(c => c.postId === +args.id)
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
server.use(/\/((?!graphql).)*/, bodyParser.json());

server.start({ port: 8080, endpoint: '/graphql' },() => console.log(`The server is running on http://localhost:8080`))
