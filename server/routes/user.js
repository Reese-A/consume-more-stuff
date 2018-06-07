const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const User = require('../db/models/User');
const isAuthenticated = require('../utilities/isAuthenticated');
const router = express.Router();
const saltedRounds = 12;

router.route('/email-test').get((req, res) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'cyruswu.email@gmail.com',
    from: 'cms@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  sgMail.send(msg);
});

router.route('/:id/items').get(isAuthenticated, (req, res) => {
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
      return res.json(err);
    });
});

router
  .route('/:id/password')
  .put(passport.authenticate('local'), isAuthenticated, (req, res) => {
    const id = Number(req.params.id);
    const userId = Number(req.user.id);
    if (id !== userId) {
      return res.status(401).json({ message: 'wrong user' });
    }
    let { password, newPassword } = req.body;
    bcrypt.genSalt(saltedRounds, function(err, salt) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      bcrypt.hash(newPassword, salt, function(err, hash) {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        password = hash;
        return new User({ id })
          .save({ password }, { method: 'update' })
          .then(user => {
            console.log(user);
            return res.json({
              success: true
            });
          })
          .catch(err => {
            console.log(err);
            return res.json(err);
          });
      });
    });
  });

router.route('/register').post((req, res) => {
  let { email, password, name } = req.body;

  email = email.trim();
  name = name.trim();

  bcrypt.genSalt(saltedRounds, function(err, salt) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return new User({
        email,
        name,
        password: hash
      })
        .save()
        .then(user => {
          return req.login(user, err => {
            if (err) throw err;
            name = name ? name : null;
            return res.json({ id: user.id, name: name });
          });
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    });
  });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name
  });
});

router.route('/logout').get((req, res) => {
  req.logout();
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
