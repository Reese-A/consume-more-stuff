const express = require('express');

const Category = require('../db/models/Category');
const router = express.Router();

router.route('/').get((req, res) => {
  return Category.fetchAll({}).then(categories => {
    return res.json(categories);
  });
});

module.exports = router;
