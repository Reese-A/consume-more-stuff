const faker = require('faker');
const COUNT = 25;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items')
    .del()
    .then(function() {
      //   // Inserts seed entries
      const items = [];
      for (let i = 0; i < COUNT; i++) {
        const item = {};
        item.description = faker.commerce.product();
        item.condition_id = faker.random.number({ min: 1, max: 6 });
        item.category_id = faker.random.number({ min: 1, max: 5 });
        item.status_id = 1;
        item.price = faker.commerce.price();
        item.created_at = faker.date.past(2);
        item.updated_at = item.created_at;
        item.owner = 1;
        item.img_url = faker.image.imageUrl();
        items.push(item);
      }
      return knex('items').insert(items);
      //     {
      //       id: 1,
      //       description: 'Refrigerator of Tears',
      //       condition_id: 1,
      //       category_id: 1,
      //       owner: 1,
      //       status_id: 1,
      //       img_url:
      //         'https://c.shld.net/rpx/i/s/i/spin/10109385/prod_18910213112?hei=1000&wid=1000&op_sharpen=1'
      //     }
      //   ]);
    });
};
