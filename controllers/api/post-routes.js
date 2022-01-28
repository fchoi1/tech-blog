const { Post, User, Comment } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    !dbPostData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const dbPostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    });
    res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      },
      {
        where: { id: req.params.id }
      }
    );
    !dbPostData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbPostData = await Post.destroy({ where: { id: req.params.id } });
    !dbPostData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
