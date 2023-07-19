exports.up = function (knex) {
    return knex.schema.createTable('bookings', function (table) {
      table.increments('id').primary();
      table.integer('table_id').unsigned().notNullable();
      table.foreign('table_id').references('tables.id').onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.date('date').notNullable();
      table.time('start_time').notNullable();
      table.time('end_time').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('bookings');
  };