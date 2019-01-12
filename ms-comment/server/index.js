const { GraphQLServer } = require('graphql-yoga');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

// Constantss
const PORT = process.env.PORT || 8080;

const comments = [{
  id: 1,
  body: "Comment 1"
}];


const typeDefs = `
type Comment {
  id: Int!
  body: String
}

type Query {
  comments: [Comment]
}
`
const resolvers = {
  Query: {
    comments: async () => comments,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.use(/\/((?!graphql).)*/, bodyParser.urlencoded({ extended: true }));
server.use(/\/((?!graphql).)*/, bodyParser.json());

server.start({ port: 8080, endpoint: '/graphql' },() => console.log(`The server is running on http://localhost:8080`))
