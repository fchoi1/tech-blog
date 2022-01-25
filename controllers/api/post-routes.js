const { Post, User } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    !dbPostData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  /* Request body:
    {   username: 'someuser'
        password: 'somepassword'
    }  */
  try {
    const dbPostData = await Post.create(req.body);
    req.session.save(() => {
      req.session.user_id = dbPostData.id;
      req.session.username = dbPostData.username;
      req.session.loggedIn = true;
      res.json(dbPostData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
