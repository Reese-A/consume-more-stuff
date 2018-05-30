exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          id: 1,
          description: 'Refrigerator of Tears',
          condition_id: 1,
          category_id: 1,
          owner: 1,
          status_id: 1,
          img_url:
            'https://c.shld.net/rpx/i/s/i/spin/10109385/prod_18910213112?hei=1000&wid=1000&op_sharpen=1'
        }
      ]);
    });
};
