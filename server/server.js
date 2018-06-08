const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Redis = require('connect-redis')(session);

const routes = require('./routes/_routes');

const User = require('./db/models/User');

const server = express();

const PORT = process.env.PORT || 9001;

require('dotenv').config();

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.use(
  session({
    store: new Redis(),
    secret: 'itsasecret',
    resave: false,
    saveUninitialized: true
  })
);

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id,
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  new User({
    id: user.id
  })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        name: user.name,
        email: user.email
      });
    })
    .catch(err => {
      console.log(err);
      return done(err);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      return new User({
        email: email
      })
        .fetch()
        .then(user => {
          console.log(user);
          user = user.toJSON();

          if (user === null) {
            return done(null, false, {
              message: 'Bad Email or Password'
            });
          } else {
            bcrypt.compare(password, user.password).then(res => {
              if (res) {
                console.log(res);
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Bad Email or Password'
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          return done(err);
        });
    }
  )
);

server.use(express.static('build'));
server.use('/api', routes);

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
