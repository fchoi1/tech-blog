const express = require('express');
const path = require('path');
const routes = require('./controllers');

// Handlebars helper functions
const helpers = require('./utils/helpers');

// Handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

//db
const sequelize = require('./config/connection');

// Session / cookie
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret', // store in .env folder, used to check if session is modified
  cookie: {},
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60 * 5000 // Expires 5 min of inactivity 60 secs * 5000 milli secs
  },
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

// Setup view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Turn on routes, all done in the routes directory
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
