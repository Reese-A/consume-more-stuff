const express = require('express');
const fs = require('fs');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const Item = require('../db/models/Item');
const isAuthenticated = require('../utilities/isAuthenticated');
const router = express.Router();

const Bucket = process.env.AWS_S3_BUCKET_NAME;
const region = process.env.AWS_S3_BUCKET_REGION;
const IdentityPoolId = process.env.AWS_IDENTITY_POOL_ID;

const credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId
});

AWS.config.update({
  region
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket }
});

const upload = multer({ dest: 'server/store/uploads' });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     acl: 'public-read',
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     metadata: function(req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function(req, file, cb) {
//       cb(null, `${Date.now().toString()}`);
//     }
//   })
// });

router
  .route('/')
  .get((req, res) => {
    const page = req.query.page > 0 ? req.query.page : 1;
    const limit = req.query.limit || 50;
    return new Item()
      .orderBy('created_at', 'desc')
      .fetchPage({ pageSize: limit, page })
      .then(items => {
        return res.json(items);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  })
  .post(
    isAuthenticated,
    upload.array('img_file', 1),
    (req, res, next) => {
      const {
        description,
        condition_id,
        category_id,
        price,
        make,
        model,
        dimensions,
        notes,
        img_file
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
        img_url: 'http://via.placeholder.com/250x200',
        owner: req.user.id,
        status_id: 1
      };

      return new Item(newItem)
        .save()
        .then(item => {
          req.temp = {};
          req.temp.item = item;
          next();
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    },
    (req, res) => {
      return fs.readFile(req.files[0].path, (err, data) => {
        const base64data = new Buffer(data, 'binary');
        s3.upload(
          {
            Key: `users/${req.user.id}/items/${req.temp.item.id}/photos/${
              req.files[0].filename
            }`,
            Body: base64data,
            ACL: 'public-read'
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return new Item({ id: req.temp.item.id })
              .save({ img_url: data.Location }, { method: 'update' })
              .then(item => {
                fs.unlink(req.files[0].path, err => {
                  return res.json(item);
                });
              });
          }
        );
      });
    }
  );

router
  .route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    return new Item({ id })
      .fetch({ withRelated: ['condition', 'category', 'status', 'owner'] })
      .then(item => {
        return res.json(item);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  })
  .put(
    isAuthenticated,
    upload.array('img_file', 1),
    (req, res, next) => {
      const { id } = req.params;
      const {
        description,
        condition_id,
        category_id,
        price,
        make,
        model,
        dimensions,
        img_url,
        notes,
        status_id
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
        status_id
      };

      return new Item({ id })
        .save(newItem, { method: 'update' })
        .then(item => {
          if (Number(req.user.id) !== Number(item.owner)) {
            return res.status(401).json({ message: 'wrong user' });
          }
          req.temp = {};
          req.temp.item = item;
          next();
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    },
    (req, res) => {
      if (!req.files.length) return req.temp.item;

      return fs.readFile(req.files[0].path, (err, data) => {
        const base64data = new Buffer(data, 'binary');
        s3.upload(
          {
            Key: `users/${req.user.id}/items/${req.temp.item.id}/photos/${
              req.files[0].filename
            }`,
            Body: base64data,
            ACL: 'public-read'
          },
          (err, data) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return new Item({ id: req.temp.item.id })
              .save({ img_url: data.Location }, { method: 'update' })
              .then(item => {
                fs.unlink(req.files[0].path, err => {
                  return res.json(item);
                });
              });
          }
        );
      });
    }
  );

module.exports = router;
