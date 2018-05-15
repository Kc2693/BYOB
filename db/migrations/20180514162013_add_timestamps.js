
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('exercises', function (table) {
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('exercises'),
  ])
};
