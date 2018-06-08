exports.up = function(knex, Promise) {
  return knex.schema.createTable('verify', table => {
    table.increments();
    table
      .string('hash')
      .notNullable()
      .unique();
    table.timestamp('expires_at').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('verify');
};
