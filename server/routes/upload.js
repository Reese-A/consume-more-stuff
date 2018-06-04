const express = require('express');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const router = express.Router();

const Bucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const IdentityPoolId = process.env.AWS_IDENTITY_POOL_ID;

const credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId
});

// console.log(credentials);

// AWS.config.update({
//   region,
//   credentials
// });

AWS.config.update({
  region
});

// console.log(AWS.config);

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket }
});

s3.listBuckets(function(err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Bucket List', data.Buckets);
  }
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      console.log(Date.now().toString());
      cb(null, Date.now().toString());
    }
  })
});

router.route('/').post(upload.array('file', 1), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  return res.json({ test: 'upload' });
});

module.exports = router;
