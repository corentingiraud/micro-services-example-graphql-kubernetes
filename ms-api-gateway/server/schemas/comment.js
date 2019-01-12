const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');

const getSchema = async () => {
  return makeRemoteExecutableSchema({
    schema: await introspectSchema(
      new HttpLink({ uri: `http://${process.env.URL_MS_COMMENT}:8080/graphql`, fetch })
    ),
    link: new HttpLink({ uri: `http://${process.env.URL_MS_COMMENT}:8080/graphql`, fetch })
  });
}

module.exports = {
  getSchema
}
