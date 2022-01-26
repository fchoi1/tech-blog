const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// middleware auth function
//router.use(withAuth);

router.get('/', async (req, res) => {
  console.log('loggedin', req.session.loggedIn)
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      page: 'homepage',
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  !req.session.loggedIn
    ? res.render('login', { page: 'homepage', isSignup: req.query.isSignup })
    : res.redirect('/dashboard');
});

router.get('/posts/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    if (!dbPostData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    const post = dbPostData.get({ plain: true });
    res.render('single-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
