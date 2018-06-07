exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'test@test',
          password:
            '$2b$12$gqITdiE6vA1zihqY2XbK7OUUvYlDSoT1HuspE58R5IdvZ4Puo7bMW',
          name: 'test'
        }
      ]);
    });
};
