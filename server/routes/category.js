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
      return res.json(err);
    });
});

router.route('/items').get((req, res) => {
  const limit = req.query.limit;
  return Category.fetchAll()
    .then(categories => {
      const promises = categories.map(category => {
        return new Category({ id: category.id }).fetch({
          withRelated: [
            {
              items: qb => {
                qb.whereNot({ status_id: 3 });
                qb.whereNot({ status_id: 2 });
                qb.orderBy('created_at', 'desc');
                qb.limit(limit);
              }
            }
          ]
        });
      });

      return Promise.all(promises).then(data => {
        return res.json(data);
      });
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    });
});

router.route('/:name').get((req, res) => {
  const name = req.params.name;
  const page = req.query.page > 0 ? req.query.page : 1;
  const limit = req.query.limit;

  return new Category()
    .where({ name })
    .fetch({
      withRelated: [
        {
          items: qb => {
            qb.whereNot({ status_id: 3 });
            qb.whereNot({ status_id: 2 });

            qb.orderBy('created_at', 'desc');
            qb.limit(limit);
            qb.offset((page - 1) * limit);
          }
        }
      ]
    })
    .then(category => {
      return res.json(category);
    })
    .catch(err => {
      console.log(err);
      return res.json(err);
    });
});

module.exports = router;
