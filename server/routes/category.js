const express = require('express');

const Category = require('../db/models/Category');
const router = express.Router();

router.route('/').get((req, res) => {
  return Category.fetchAll({}).then(categories => {
    return res.json(categories);
  });
});

router.route('/:name').get((req, res) => {
  const name = req.params.name;
  return new Category({ name })
    .fetch({ withRelated: 'items' })
    .then(category => {
      return res.json(category);
    });
});

module.exports = router;
