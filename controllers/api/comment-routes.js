const { Post, User, Comment } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      include: [
        { model: Post, include: [{ model: User, attributes: ['username'] }] },
        { model: User, attributes: ['username'] }
      ]
    });
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbCommentData = await Comment.findOne({
      include: [
        { model: Post, include: [{ model: User, attributes: ['username'] }] },
        { model: User, attributes: ['username'] }
      ]
    });
    !dbCommentData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  /* Request body:
    {   comment_text: 'some comment text'
        user_id: 1,
        post_id: 1,
    }  */
  try {
    const dbCommentData = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
