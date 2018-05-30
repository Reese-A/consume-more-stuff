const express = require('express');

const Condition = require('../db/models/Condition');
const router = express.Router();

router.route('/').get((req, res) => {
  return Condition.fetchAll({}).then(conditions => {
    return res.json(conditions);
  });
});

module.exports = router;
