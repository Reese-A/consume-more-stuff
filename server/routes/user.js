const express = require('express');

const User = require('../db/models/User');
const router = express.Router();

router.route('/').get((req, res) => {
  return User.fetchAll({}).then(users => {
    return res.json(users);
  });
});

module.exports = router;
