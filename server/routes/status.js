const express = require('express');

const Status = require('../db/models/Status');
const router = express.Router();

router.route('/').get((req, res) => {
  return Status.fetchAll({})
    .then(statuses => {
      return res.json(statuses);
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
