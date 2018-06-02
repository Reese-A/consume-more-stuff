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
          return res.json(user);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  return res.json(req.user);
});

router.route('/logout').get((req, res) => {
  req.logout();
  return res.json({
    success: true
  });
});

module.exports = router;
