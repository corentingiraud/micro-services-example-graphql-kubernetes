const { GraphQLServer } = require('graphql-yoga');
const asyncHandler = require('express-async-handler');
const { checkAll } = require('./check');
const postSchema = require('./schemas/post');
const { getSchema } = require('./schemas/comment');
const { linksTypeDef, linksResolvers } = require('./schemas/links');
const { mergeSchemas } = require('graphql-tools');

const lunch = async () => {
  const commentSchema = await getSchema();
  const globalSchema = mergeSchemas({
    schemas: [
      postSchema,
      commentSchema,
      linksTypeDef
    ],
    resolvers: linksResolvers
  });

  const server = new GraphQLServer({
    schema: globalSchema
  })

  server.get('/check', asyncHandler(checkAll));

  server.start({ port: 8080 },() => console.log(`The server is running on http://localhost:8080`))
}

lunch().catch((e) => {
  console.error(e);
});
