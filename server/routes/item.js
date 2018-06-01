const express = require('express');

const Item = require('../db/models/Item');
const router = express.Router();

router.route('/').get((req, res) => {
  return Item.fetchAll({}).then(items => {
    return res.json(items);
  });
});

router.route('/:id').get((req, res) => {
  const id = req.params.id;
  return new Item({ id })
    .fetch({ withRelated: ['condition', 'category', 'status', 'owner'] })
    .then(item => {
      return res.json(item);
    });
});

module.exports = router;
