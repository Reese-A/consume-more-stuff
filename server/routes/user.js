const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../db/models/User');
const router = express.Router();
const saltedRounds = 12;

router.route('/').get((req, res) => {
  return User.fetchAll({})
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route('/:id/items').get((req, res) => {
  const { id } = req.params;
  const page = req.query.page > 0 ? req.query.page : 1;
  const limit = req.query.limit;

  return new User()
    .where({ id })
    .fetch({
      withRelated: [
        {
          items: qb => {
            qb.orderBy('created_at', 'desc');
            qb.limit(limit);
            qb.offset((page - 1) * limit);
          }
        }
      ]
    })
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route('/register').post((req, res) => {
  let { email, password, name } = req.body;

  email = email.trim();
  name = name.trim();

  bcrypt.genSalt(saltedRounds, function(err, salt) {
    if (err) {
      console.log(err);
    }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
      }
      return new User({
        email,
        name,
        password: hash
      })
        .save()
        .then(user => {
          req.login(user, err => {
            if (err) throw new Error(err);
          });
          name = name ? name : null;
          // console.log('REGISTER', req.user);
          return res.json({
            id: user.id,
            name: name
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  // console.log('LOGIN ', req.user);
  return res.json({
    id: req.user.id,
    name: req.user.name
  });
});

router.route('/logout').get((req, res) => {
  // console.log('LOGOUT BEGIN', req.user);
  req.logout();
  // console.log('LOGOUT DONE', req.user);

  if (!req.user) {
    return res.json({
      success: true
    });
  }
  return res.json({
    success: false
  });
});

module.exports = router;
