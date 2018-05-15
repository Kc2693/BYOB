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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
