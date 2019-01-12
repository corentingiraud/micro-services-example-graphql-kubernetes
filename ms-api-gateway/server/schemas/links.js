const linksTypeDef = `
extend type Post {
  comments: [Comment],
}

extend type Comment {
  post: Post
}
`;

const linksResolvers = mergeInfo => ({
  Post: {
    comments: {
      fragment: 'fragment PostFragment on Post { id }',
      resolve(parent, args, context, info) {
        return mergeInfo.delegate(
          'query',
          'commentsByPostId',
          {
            id: parent.id,
            // limit: args.limit ? args.limit : null,
          },
          context,
          info,
        );
      }
    }
  },
  Comment: {
    post: {
      fragment: 'fragment CommentFragment on Comment { id }',
      resolve(parent, args, context, info) {
        return mergeInfo.delegate(
          'query',
          'postByCommentId',
          {
            id: parent.id,
          },
          context,
          info,
        );
      }
    }
  }
});

module.exports = {
  linksTypeDef,
  linksResolvers,
};
