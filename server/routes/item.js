const express = require('express');

const Item = require('../db/models/Item');
const router = express.Router();

router.route('/').get((req, res) => {
  return Item.fetchAll({}).then(items => {
    return res.json(items);
  });
});

module.exports = router;
