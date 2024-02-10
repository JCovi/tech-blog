const { Comment } = require('../models');

const commentData = [
  {
    text: "Good Read",
    comment_date: new Date("2024-01-10T00:00:00"),
    user_id: 3,
    post_id: 2
  },
  {
    text: "keep it up",
    comment_date: new Date("2024-01-20T00:00:00"),
    user_id: 1,
    post_id: 1
  },
  {
    text: "Awesome Read",
    comment_date: new Date("2024-01-12T00:00:00"),
    user_id: 2,
    post_id: 1
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
