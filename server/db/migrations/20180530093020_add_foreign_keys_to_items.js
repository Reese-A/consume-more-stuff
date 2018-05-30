exports.up = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table
      .integer('condition_id')
      .notNullable()
      .unsigned();
    table
      .foreign('condition_id')
      .references('id')
      .inTable('conditions');
    table
      .integer('category_id')
      .notNullable()
      .unsigned();
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories');
    table
      .integer('status_id')
      .notNullable()
      .unsigned();
    table
      .foreign('status_id')
      .references('id')
      .inTable('statuses');
    table.string('price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('items', table => {
    table.dropColumn('condition');
    table.dropColumn('category');
    table.dropColumn('status');
    table.dropColumn('price');
  });
};
