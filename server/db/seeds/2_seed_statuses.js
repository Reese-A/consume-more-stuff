exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conditions').insert([
        { id: 1, name: 'published' },
        { id: 2, name: 'sold' }
      ]);
    });
};
