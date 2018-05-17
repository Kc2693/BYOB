
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('muscle_groups', function(table) {
      table.increments('id').primary();
      table.string('muscle_group');
      table.string('targeted_area');
      table.string('train_with');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('exercises', function(table) {
      table.increments('id').primary();
      table.string('exercise');
      table.string('level');
      table.string('method');
      table.string('upper_lower_core');
      table.string('joint');
      table.integer('muscle_group_id').unsigned();
      table.foreign('muscle_group_id')
        .references('muscle_groups.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('exercises'),
    knex.schema.dropTable('muscle_groups')
  ])
};
