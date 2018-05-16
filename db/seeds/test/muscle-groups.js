
exports.seed = function(knex, Promise) {
  return knex('exercises').del()
    .then(() => knex('muscle_groups').del())
    .then(() => {
      return Promise.all([
        knex('muscle_groups').insert({
          targeted_area: 'Lower',
          muscle_group: 'Abdominals',
          train_with: 'Biceps, Triceps'
        }, 'id')
        .then(muscleGroup => {
          return knex("exercises").insert([
            {
              exercise: "Full Reverse Crunch",
              level: "Advanced",
              method: "FW",
              upper_lower_core: "Core",
              joint: "M",
              muscle_group_id: muscleGroup[0]
            },
            {
              exercise: "Incline Hip Thrust",
              level: "Advanced",
              method: "FW",
              upper_lower_core: "Core",
              joint: "M",
              muscle_group_id: muscleGroup[0]
            },
            {
              exercise: "Incline Reverse Crunch",
              level: "Advanced",
              method: "FW",
              upper_lower_core: "Core",
              joint: "M",
              muscle_group_id: muscleGroup[0]
            }
          ]);
        })
        .then(() => console.log('Seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
