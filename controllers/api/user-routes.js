const { User } = require('../../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({ attributes: ['username'] });
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: { id: req.params.id },
      attributes: ['username']
    });
    !dbUserData
      ? res.status(404).json({ message: 'No user found with this id' })
      : res.json(dbUserData);
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
    const dbUserData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
