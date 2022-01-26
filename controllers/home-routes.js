const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {page: 'homepage'});
});

router.get('/login', (req, res) => {
  console.log('is signup', req.query.isSignup)
  res.render('login', {page: 'homepage', isSignup: req.query.isSignup});
});

module.exports = router;
