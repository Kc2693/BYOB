const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/api/v1/muscle-groups', (request, response) => {
  database('muscle_groups').select()
    .then(muscleGroups => response.status(200).json(muscleGroups))
    .catch(error => response.status(500).json(error))
});

app.get('/api/v1/exercises', (request, response) => {
  database('exercises').select()
    .then(exercises => response.status(200).json(exercises))
    .catch(error => response.status(500).json(error))
});

app.get('/api/v1/muscle-group/:id', (request, response) => {
  database('muscle_groups').where('id', request.params.id)
    .then(muscleGroup => {
      if (muscleGroup.length) {
        response.status(200).json(muscleGroup);
      } else {
        response.status(404).json({
          error: `Could not find muscle group with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/exercises/:id', (request, response) => {
  database('exercises').where('id', request.params.id)
    .then(exercise => {
      if (exercise.length) {
        response.status(200).json(exercise);
      } else {
        response.status(404).json({
          error: `Could not find exercise with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
