const express = require('express');
const router = express.Router();

router.route('/').post((req, res) => {
  console.log(req.files);
  return res.json({ test: 'upload' });
});

module.exports = router;
