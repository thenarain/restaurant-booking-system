exports.up = function (knex) {
    return knex.schema.createTable('tables', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('capacity').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tables');
  };