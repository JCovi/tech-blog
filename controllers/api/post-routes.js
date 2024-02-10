// Defines an Express router to handle CRUD operations for posts, including creating, updating, and deleting posts, with authentication middleware to ensure only authenticated users can perform these actions.
const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try { 
      const newData = await Post.create({
        post_title: req.body.post_title,
        post_contents: req.body.post_contents,
        user_id: req.session.userId
      });
  
      res.status(200).json(newData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatePost = await Post.update(
        {
          post_title: req.body.post_title,
          post_contents: req.body.post_contents,
          user_id: req.session.userId
        },
        {
          where: {
            id: req.params.id,
          }
        },
      );

      if (!updatePost) {
        res.status(404).json({ message: "No post found with that id!" });
        return;
      }

      res.status(200).json(updatePost);
    } catch(err) {
      res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deleteData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId
            }
        });

        if (!deleteData) {
            res.status(404).json({ message: "No post found with that ID" });
            return;
        }

        res.status(200).json(deleteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
