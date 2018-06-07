exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table
      .boolean('verified')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('verified');
  });
};
