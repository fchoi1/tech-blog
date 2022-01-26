const withAuth = (req, res, next) => {
  console.log('using middleware and path: ', req.path);
  if (req.path == '/' || req.path == '/login') return next();

  !req.session.loggedIn
    ? res.redirect('/login') //true condition
    : next(); //false condition
};

module.exports = withAuth;
