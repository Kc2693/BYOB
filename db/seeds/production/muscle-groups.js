/* eslint-disable no-console */
const exerciseData = require('../../data/exercises.json');
const muscleGroupData = require('../../data/muscle-group.json');

exports.seed = function(knex, Promise) {
  return knex('exercises').del()
    .then(() => knex('muscle_groups').del())
    .then(() => {
      return knex('muscle_groups').insert(muscleGroupData);
    })
    .then(() => {
      let exercisePromises = [];

      exerciseData.forEach(exercise => {
        let muscleGroup = exercise.targeted_area;

        exercisePromises.push(createExercise(knex, exercise, muscleGroup));
      });

      return Promise.all(exercisePromises);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`));
};

const createExercise = (knex, exercise, muscleGroup) => {
  return knex('muscle_groups').where('targeted_area', muscleGroup).first()
    .then(muscleGroupRecord => {
      return knex('exercises').insert({
        exercise: exercise.exercise,
        level: exercise.level,
        method: exercise.method,
        upper_lower_core: exercise.upper_lower_core,
        joint: exercise.joint,
        muscle_group_id: muscleGroupRecord.id
      });
    });
};
