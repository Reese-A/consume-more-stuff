const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Redis = require('connect-redis')(session);

const User = require('./db/models/User');

const server = express();
const PORT = process.env.PORT || 9001;

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

server.use(
  session({
    store: new Redis(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
);

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({
    id: user.id
  })
    .fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        name: user.name
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
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      return new User({
        email: email
      })
        .fetch()
        .then(user => {
          user = user.toJSON();
          console.log(user);

          if (user === null) {
            return done(null, false, {
              message: 'bad email or password'
            });
          } else {
            console.log(password, user.password);
            bcrypt.compare(password, user.password).then(res => {
              if (res) {
                console.log(res);
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Bad email or password'
                });
              }
            });
          }
        })
        .catch(err => {
          console.log('error', err);
          return done(err);
        });
    }
  )
);

server.use('/api', routes);

server.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});

module.exports = server;
