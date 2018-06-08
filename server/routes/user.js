const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const faker = require('faker');
const moment = require('moment');

const User = require('../db/models/User');

const isAuthenticated = require('../utilities/isAuthenticated');
const router = express.Router();
const saltedRounds = 12;

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

router.route('/test').get((req, res) => {
  return res.json({ message: process.env.EMAIL });
});

router.route('/register').post((req, res) => {
  let { email, password, name } = req.body;

  email = email.trim();
  name = name.trim();

  bcrypt.genSalt(saltedRounds, (err, salt) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    bcrypt.hash(req.body.password, salt, (err, password) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      const cryptoHash = crypto.createHash('md5');
      cryptoHash.update(`${email}${moment().format()}`);
      const hash = cryptoHash.digest('hex');

      return new User({
        email,
        name,
        password,
        hash,
        verified: false
      })
        .save()
        .then(user => {
          return req.login(user, err => {
            if (err) throw err;
            const { id, name, verified, hash } = user.toJSON();
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);

            const msg = {
              to: process.env.EMAIL,
              from: 'support@cms.com',
              subject: 'Welcome to CMS! Confirm Your Email',
              // text: 'and easy to do anywhere, even with Node.js',
              html: `<a href="http://localhost:3000/user/verify?hash=${hash}&id=${id}">Confirm Email Address</a>`
            };
            sgMail.send(msg);

            return res.json({ id, name, verified });
          });
        })
        .then(user => {})
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    });
  });
});

router.route('/:id/verify').put((req, res) => {
  const { id } = req.params;
  const { hash } = req.body;

  if (!id) return res.json({ user: null, verified: false });

  console.log(req.params);
  console.log(req.body);
  console.log(id, hash);

  return new User()
    .where({ id, hash })
    .save({ verified: true, hash: null }, { method: 'update' })
    .then(user => {
      user = user.toJSON();
      console.log('Found');
      return res.json(user);
    })
    .catch(err => {
      if (err) {
        console.log('Not Found');
        return new User({ id })
          .fetch()
          .then(user => {
            user = user.toJSON();
            const { id, name, verified } = user;
            return res.json({ id, name, verified });
          })
          .catch(err => {
            if (err) return res.json({ user: null, verified: false });
          });
      }
    });
});

router.route('/verify').get((req, res) => {
  const { id } = req.query;
  const { hash } = req.query;

  return new User({ id, hash })
    .fetch()
    .then(user => {
      if (!user) return res.json({ verified: false });

      user = user.toJSON();
      return res.json({ verified: true });
    })
    .catch(err => {
      return res.json({ verified: false });
    });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  console.log(req.user);
  return res.json({
    id: req.user.id,
    name: req.user.name,
    verified: req.user.verified
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
