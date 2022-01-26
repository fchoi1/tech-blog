const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('dashboard', {loggedIn: req.session.loggedIn});
});

module.exports = router;
