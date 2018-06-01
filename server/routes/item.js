const express = require('express');

const Item = require('../db/models/Item');
const router = express.Router();

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
      img_url: 'http://via.placeholder.com/250x200',
      owner: 1,
      status_id: 1
    };

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
