exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, name: 'vehicles' },
        { id: 2, name: 'appliances' },
        { id: 3, name: 'furniture' },
        { id: 4, name: 'electronics' },
        { id: 5, name: 'clothing' }
      ]);
    });
};
