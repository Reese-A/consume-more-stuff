exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'admin@admin',
          password:
            '$2b$12$SkdwoWgVCK7xVTb6auCBM.gjhrscEuqrlY2JDwqbnbNOFpfsJmSRS',
          name: 'admin',
          role_id: 1,
          verified: true
        }
      ]);
    });
};
