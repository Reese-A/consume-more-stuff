const express = require('express');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// require('dotenv').config();

const Item = require('../db/models/Item');
const router = express.Router();

// const credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'IDENTITY_POOL_ID'
// });
// const config = new AWS.Config({
//   credentials: myCredentials,
//   region: 'us-west-1'
// });

// const s3 = new AWS.S3(config);

// const Bucket = process.env.AWS_S3_BUCKET_NAME;
// const region = process.env.AWS_S3_BUCKET_REGION;
// const IdentityPoolId = process.env.AWS_IDENTITY_POOL_ID;
// const credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId
// });

// AWS.config.update({
//   region,
//   credentials
// });

// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: { Bucket }
// });

router
  .route('/')
  .get((req, res) => {
    return Item.fetchAll({})
      .then(items => {
        return res.json(items);
      })
      .catch(err => {
        console.log(err);
      });
  })

  .post((req, res) => {
    const {
      description,
      condition_id,
      category_id,
      price,
      make,
      model,
      dimensions,
      notes,
      img_url
    } = req.body;

    const newItem = {
      description,
      condition_id,
      category_id,
      price,
      make,
      model,
      dimensions,
      notes,
      img_url,
      owner: req.user.id,
      status_id: 1
    };

    console.log(req.body);
    console.log(img_url);

    // return res.json({ message: 'In Development' });

    return new Item(newItem)
      .save()
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        console.log(err);
      });
  });

router.route('/:id').get((req, res) => {
  const id = req.params.id;
  return new Item({ id })
    .fetch({ withRelated: ['condition', 'category', 'status', 'owner'] })
    .then(item => {
      return res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
