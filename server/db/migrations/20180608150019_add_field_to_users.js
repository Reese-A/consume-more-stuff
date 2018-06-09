exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table
      .integer('role_id')
      .notNullable()
      .unsigned();
    table
      .foreign('role_id')
      .references('id')
      .inTable('roles');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('role_id');
  });
};
