exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('statuses').insert([
        { id: 1, name: 'published' },
        { id: 2, name: 'sold' },
        { id: 3, name: 'deleted' }
      ]);
    });
};
