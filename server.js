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

app.get('/api/v1/muscle-groups/:id', (request, response) => {
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

app.post('/api/v1/exercises', (request, response) => {
    const exercise = request.body;

  for (let requiredParameter of ['exercise', 'level', 'method', 'upper_lower_core', 'joint', 'muscle_group_id']) {
    if (!exercise[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a ${requiredParameter} property.`});
    }
  }

  database('exercises').insert(exercise, 'id')
    .then(exercise => response.status(201).json({ id: exercise[0]}))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/muscle-groups', (request, response) => {
    const muscleGroup = request.body;

  for (let requiredParameter of ['muscle_group', 'targeted_area', 'train_with']) {
    if (!muscleGroup[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a ${requiredParameter} property.`});
    }
  }

  database('muscle_groups').insert(muscleGroup, 'id')
    .then(muscleGroup => response.status(201).json({ id: muscleGroup[0]}))
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/exercises/:id', (request, response) => {
  database('exercises').where('id', request.params.id).update({...request.body})
  .then(exercise => response.status(200).json({message: 'Updated exercise'}))
  .catch(error => response.status(500).json({error}));
});

app.patch('/api/v1/muscle-groups/:id', (request, response) => {
  database('muscle_groups').where('id', request.params.id).update({...request.body})
  .then(exercise => response.status(200).json({message: 'Updated muscle group'}))
  .catch(error => response.status(500).json({error}));
});

app.delete('/api/v1/exercises', (request, response) => {
  const id = request.body.id

  if (!id) {
    return response
      .status(422)
      .send({ error: `You're missing an id property.` });
  }

  database('exercises').where('id', id).del()
    .then(exercise => response.status(200).json({ message: `Deleted exercise with id ${request.body.id}`}))
    .catch(error => response.status(500).json({ error }))
});

app.delete('/api/v1/muscle-groups', (request, response) => {
  const id = request.body.id

  if (!id) {
    return response
      .status(422)
      .send({ error: `You're missing an id property.` });
  }

  database('muscle_groups').where('id', id).del()
    .then(muscleGroup => response.status(200).json({ message: `Deleted muscle group with id ${request.body.id}`}))
    .catch(error => {
      if (error.code === '23503') {
        return response.status(500).json({ error: 'Please delete associated exercises before deleting muscle group'});
      } else {
        return response.status(500).json({error});
      }
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;