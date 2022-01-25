const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'This is a comment made by user 1 on post 1',
    post_id: 1,
    user_id: 1
  },
  {
    comment_text: 'This is a comment made by user 3 on post 1',
    post_id: 1,
    user_id: 3
  },
  {
    comment_text: 'This is a comment made by user 2 on post 2',
    post_id: 2,
    user_id: 2
  },
  {
    comment_text: 'This is a comment made by user 3 on post 1 again back to back',
    post_id: 1,
    user_id: 3
  },
  {
    comment_text: 'This is a comment made by user 5 on post 4',
    post_id: 4,
    user_id: 5
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
