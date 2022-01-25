const { Post } = require('../models');

const postData = [
  {
    title: 'Post #1',
    content: 'This is blog content for post #1',
    user_id: 1
  },
  {
    title: 'Post #2',
    content: 'This is blog content for post #2',
    user_id: 2
  },
  {
    title: 'Post #3',
    content: 'This is blog content for post #3',
    user_id: 1
  },
  {
    title: 'Post #4',
    content: 'This is blog content for post #4',
    user_id: 3
  },
  {
    title: 'Post #5',
    content: 'This is blog content for post #5',
    user_id: 5
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
