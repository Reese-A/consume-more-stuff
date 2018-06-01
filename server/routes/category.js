const express = require('express');

const Category = require('../db/models/Category');
const Item = require('../db/models/Item');
const router = express.Router();

router.route('/').get((req, res) => {
  return Category.fetchAll({})
    .then(categories => {
      return res.json(categories);
    })
    .catch(err => {
      console.log(err);
    });
});

router.route('/items').get((req, res) => {
  console.log(req.query.limit);
  const limit = req.query.limit;
  return Category.fetchAll()
    .then(categories => {
      const promises = categories.map(category => {
        return new Category({
          id: category.id
        }).fetch({
          withRelated: [
            {
              items: qb => {
                qb.limit(limit);
              }
            }
          ]
        });
      });

      Promise.all(promises).then(data => {
        return res.json(data);
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.route('/:id').get((req, res) => {
  const id = req.params.id;
  const page = req.query.page;
  const limit = req.query.limit;
  return new Item()
    .where({ category_id: id })
    .orderBy('created_at', 'desc')
    .fetchPage({ pageSize: limit, page })
    .then(items => {
      return res.json(items);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
