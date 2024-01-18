const { Comment } = require('../models');

const commentData = [
  {
    "text": "Good Read",
    "comment_date": "January 10th 2024",
    "user_id": 3,
    "post_id": 2
  },
  {
    "text": "keep it up",
    "comment_date": "January 20th 2024",
    "user_id": 1,
    "post_id": 1
  },
  {
    "text": "Awesome Read",
    "comment_date": "January 12th 2024",
    "user_id": 2,
    "post_id": 1
  },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

