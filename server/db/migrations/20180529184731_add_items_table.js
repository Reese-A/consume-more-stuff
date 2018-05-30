exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments();
    table.text('description').notNullable();
    table
      .integer('category')
      .notNullable()
      .unsigned();
    table.foreign('category');
  });
};

exports.down = function(knex, Promise) {};
