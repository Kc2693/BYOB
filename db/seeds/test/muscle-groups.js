
exports.seed = function(knex) {
  return knex('exercises').del()
    .then(() => knex('muscle_groups').del())
    .then(() => {
      return knex('muscle_groups').insert([
        {
          targeted_area: 'Lower',
          muscle_group: 'Abdominals',
          train_with: 'Biceps, Triceps'
        },
        {
          targeted_area: 'Obliques',
          muscle_group: 'Abdominals',
          train_with: 'Biceps, Triceps' 
        }
      ])
    })
    .then(() => {
      return knex('exercises').insert([
        {
          exercise: 'Full Reverse Crunch',
          level: 'Advanced',
          method: 'FW',
          upper_lower_core: 'Core',
          joint: 'M',
          muscle_group_id: 1
        },
        {
          exercise: 'Incline Hip Thrust',
          level: 'Advanced',
          method: 'FW',
          upper_lower_core: 'Core',
          joint: 'M',
          muscle_group_id: 1
        },
        {
          exercise: 'Incline Reverse Crunch',
          level: 'Advanced',
          method: 'FW',
          upper_lower_core: 'Core',
          joint: 'M',
          muscle_group_id: 1
        }
      ]);
    })
    .then(() => console.log('Seeding complete'))
    .catch(error => console.log(`Error seeding data: ${error}`));
};
