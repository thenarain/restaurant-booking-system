exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { username: 'john', password: 'password123', email: 'john@example.com' },
          { username: 'jane', password: 'secret456', email: 'jane@example.com' },
        ]);
      });
  };