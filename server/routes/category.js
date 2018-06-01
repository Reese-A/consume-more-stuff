const express = require('express');

const Category = require('../db/models/Category');
const Item = require('../db/models/Item');
const router = express.Router();

router.route('/').get((req, res) => {
  return Category.fetchAll({}).then(categories => {
    return res.json(categories);
  });
});

router.route('/items').get((req, res) => {
  console.log(req.query.limit);
  const limit = req.query.limit;
  return Category.fetchAll().then(categories => {
    const promises = categories.map(category => {
      return new Category({ id: category.id }).fetch({
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
  });
});

router.route('/:name').get((req, res) => {
  const name = req.params.name;
  return new Category({ name })
    .fetch({ withRelated: 'items' })
    .then(category => {
      return res.json(category);
    });
});

module.exports = router;
