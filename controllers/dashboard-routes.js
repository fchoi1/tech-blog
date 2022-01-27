const { Post, User, Comment } = require('../models');

const router = require('express').Router();

// GET /dashboard/
router.get('/', async (req, res) => {
  try {
    const dbPostdata = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }]
        },
        { model: User, attributes: ['username'] }
      ]
    });
    const posts = dbPostdata.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const dbPostdata = await Post.findOne({
      where: { id: req.params.id },

      include: [
        {
          model: Comment,
          include: { model: User, attributes: ['username'] }
        },
        { model: User, attributes: ['username'] }
      ]
    });
    const post = dbPostdata.get({ plain: true });
    res.render('edit-post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
