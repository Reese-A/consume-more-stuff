exports.up = function(knex, Promise) {
  return knex.schema.alterTable('items', table => {
    table.dropColumn('condition');
    table.dropColumn('category');
    table.dropColumn('status');
    table.dropColumn('price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', table => {
    table
      .integer('condition')
      .notNullable()
      .unsigned();
    table
      .foreign('condition')
      .references('id')
      .inTable('conditions');
    table
      .integer('category')
      .notNullable()
      .unsigned();
    table
      .foreign('category')
      .references('id')
      .inTable('categories');
    table
      .integer('status')
      .notNullable()
      .unsigned();
    table
      .foreign('status')
      .references('id')
      .inTable('statuses');
    table.specificType('price', 'money');
  });
};
