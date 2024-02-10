// Defines routes for rendering the homepage, individual posts, user dashboard, post editing, and login/signup pages.
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");
    return;
  }
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username', 'id'] },
        {
          model: Comment,
          order: [['comment_date', 'ASC']],
          include: { model: User, attributes: ['username'] },
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('post', { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: User, attributes: ['username'] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  if (!/^[0-9]+$/.test(req.params.id)) {
    res.status(400).json("Error: Improper URL");
    return;
  }
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username', 'id'] }],
    });
    const post = postData.get({ plain: true });
    res.render('edit', { ...post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/newPosts', withAuth, (req, res) => {
  try {
    res.render('newpost', { existingPost: false });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', async (req, res) => {
  res.render('login');
});
router.get('/sign-up', async (req, res) => {
  res.render('signup');
});

module.exports = router;
