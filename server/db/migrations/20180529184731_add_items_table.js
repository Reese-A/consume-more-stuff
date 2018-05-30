exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments();
    table.string('description', 100).notNullable();
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
    table
      .integer('owner')
      .notNullable()
      .unsigned();
    table
      .foreign('owner')
      .references('id')
      .inTable('users');
    table.specificType('price', 'money');
    table.string('make');
    table.string('model');
    table.string('dimensions');
    table.text('notes');
    table.string('img_url').notNullable();
    table.timestamp('sold_at');
    table.table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
