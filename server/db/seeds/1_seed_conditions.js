exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('conditions').insert([
        { id: 1, name: 'new' },
        { id: 2, name: 'like new' },
        { id: 3, name: 'excellent' },
        { id: 4, name: 'good' },
        { id: 5, name: 'fair' },
        { id: 6, name: 'poor' }
      ]);
    });
};
