const express = require('express');

const Status = require('../db/models/Status');
const router = express.Router();

router.route('/').get((req, res) => {
  return Status.fetchAll({}).then(statuses => {
    return res.json(statuses);
  });
});

module.exports = router;
