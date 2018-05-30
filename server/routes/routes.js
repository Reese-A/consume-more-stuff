const express = require('express');

const category = require('./category');
const condition = require('./condition');
const item = require('./item');
const status = require('./status');
const user = require('./user');

const router = express.Router();

router.use('/category', category);
router.use('/condition', condition);
router.use('/item', item);
router.use('/status', status);
router.use('/user', user);

module.exports = router;
