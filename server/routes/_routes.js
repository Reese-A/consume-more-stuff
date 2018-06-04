const express = require('express');

const condition = require('./condition');
const category = require('./category');
const status = require('./status');
const upload = require('./upload');
const item = require('./item');
const user = require('./user');

const router = express.Router();

router.use('/condition', condition);
router.use('/category', category);
router.use('/status', status);
router.use('/upload', upload);
router.use('/item', item);
router.use('/user', user);

module.exports = router;
