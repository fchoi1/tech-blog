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

// POST /api/users/login
router.post('/login', async (req, res) => {
  const dbUserData = await User.findOne({
    where: { username: req.body.username }
  });

  if (!dbUserData) {
    res.status(400).json({ message: 'No username found!' });
    return;
  }
  const validPassword = dbUserData.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: 'Incorrect Password' });
    return;
  }
  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    res.json({ user: dbUserData, message: 'You are now logged in' });
  });
});

// POST /api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy( () => {
      res.status(204).end(); // 204 no content, success nothing to do
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
