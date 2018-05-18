const chai = require('chai');
const server = require('../server');
const chaiHttp = require('chai-http');
const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);
chai.should();

describe('Client Routes', () => {
  it('should return the home page', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.rollback().then(() => {
        database.migrate.latest().then(() => {
          return database.seed.run().then(() => {
            done();
          });
        });
      });
    });
  });

  it('GET muscle groups should return all the muscle groups', done => {
    chai.request(server)
      .get('/api/v1/muscle-groups')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('muscle_group');
        response.body[0].muscle_group.should.equal('Abdominals');
        response.body[0].should.have.property('targeted_area');
        response.body[0].targeted_area.should.equal('Lower');
        response.body[0].should.have.property('train_with');
        response.body[0].train_with.should.equal('Biceps, Triceps');
        done();
      });
  });

  it('GET exercises should return all the exercises', done => {
    chai.request(server)
      .get('/api/v1/exercises')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('exercise');
        response.body[0].exercise.should.equal('Full Reverse Crunch');
        response.body[0].should.have.property('level');
        response.body[0].level.should.equal('Advanced');
        response.body[0].should.have.property('method');
        response.body[0].method.should.equal('FW');
        response.body[0].should.have.property('upper_lower_core');
        response.body[0].upper_lower_core.should.equal('Core');
        response.body[0].should.have.property('joint');
        response.body[0].joint.should.equal('M');
        done();
      });
  });

  it('GET exercises with query of level should exercises with level', done => {
    chai.request(server)
      .get('/api/v1/exercises?level=Advanced')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('exercise');
        response.body[0].exercise.should.equal('Full Reverse Crunch');
        response.body[0].should.have.property('level');
        response.body[0].level.should.equal('Advanced');
        response.body[0].should.have.property('method');
        response.body[0].method.should.equal('FW');
        response.body[0].should.have.property('upper_lower_core');
        response.body[0].upper_lower_core.should.equal('Core');
        response.body[0].should.have.property('joint');
        response.body[0].joint.should.equal('M');
        done();
      });
  });
  
  it('GET muscle groups by id should return a single muscle group', done => {
    const muscleGroupId = 1;

    chai.request(server)
      .get(`/api/v1/muscle-groups/${muscleGroupId}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('muscle_group');
        response.body[0].muscle_group.should.equal('Abdominals');
        response.body[0].should.have.property('targeted_area');
        response.body[0].targeted_area.should.equal('Lower');
        response.body[0].should.have.property('train_with');
        response.body[0].train_with.should.equal('Biceps, Triceps');
        done();
      });
  });

  it('GET muscle groups by id should return an error if no id in db', done => {
    const muscleGroupId = 3;

    chai.request(server)
      .get(`/api/v1/muscle-groups/${muscleGroupId}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.have.property('error');
        response.body.error.should
          .equal('Could not find muscle group with id 3');
        done();
      });
  });

  it('GET exercises by id should return a single exercise', done => {
    const exerciseId = 1;

    chai.request(server)
      .get(`/api/v1/exercises/${exerciseId}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('exercise');
        response.body[0].exercise.should.equal('Full Reverse Crunch');
        response.body[0].should.have.property('level');
        response.body[0].level.should.equal('Advanced');
        response.body[0].should.have.property('method');
        response.body[0].method.should.equal('FW');
        response.body[0].should.have.property('upper_lower_core');
        response.body[0].upper_lower_core.should.equal('Core');
        response.body[0].should.have.property('joint');
        response.body[0].joint.should.equal('M');
        done();
      });
  });

  it('GET exercises by id should return an error if no id in db', done => {
    const exerciseId = 5;

    chai.request(server)
      .get(`/api/v1/exercises/${exerciseId}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.have.property('error');
        response.body.error.should.equal('Could not find exercise with id 5');
        done();
      });
  });

  it('POST exercises should create a new exercise', done => {
    chai.request(server)
      .post('/api/v1/exercises')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        exercise: 'Lying Hip Thrust',
        level: 'Advanced',
        method: 'FW',
        upper_lower_core: 'Core',
        joint: 'M',
        muscle_group_id: '1'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      });
  });

  it('POST exercises should not create an exercise w/ missing data ', done => {
    chai.request(server)
      .post('/api/v1/exercises')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        exercise: 'Lying Hip Thrust',
        level: 'Advanced',
        method: 'FW',
        upper_lower_core: 'Core',
        joint: 'M'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('error');
        response.body.error.should
          .equal(`You're missing a muscle_group_id property.`);
        done();
      });
  });

  it('POST muscle_groups should create a new muscle group', done => {
    chai
      .request(server)
      .post("/api/v1/muscle-groups")
      // eslint-disable-next-line
      .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ")
      .send({
        targeted_area: "Latissimus Dorsi",
        muscle_group: "Back",
        train_with: "Chest"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an("object");
        response.body.should.have.property("id");
        response.body.id.should.equal(3);
        done();
      });
  });

  it('POST muscle grp will not create muscle grp w/ missing data ', done => {
    chai.request(server)
      .post('/api/v1/muscle-groups')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        targeted_area: 'Obliques',
        muscle_group: 'Abdominals'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('error');
        response.body.error.should
          .equal(`You're missing a train_with property.`);
        done();
      });
  });

  it('POST authenticate should return a token', done => {
    chai
      .request(server)
      .post('/authenticate')
      .send({
        email: 'charlos@turing.io',
        appName: 'Charlos'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('token');
        done();
      });
  });

  it('POST authenticate should not return a token if missing data', done => {
    chai.request(server)
      .post('/authenticate')
      .send({})
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('message');
        response.body.message.should
          .equal(`Invalid request, must supply email and appName`);
        done();
      });
  });

  it('Patch exercises should update an exercise', done => {
    const exerciseId = 1;

    chai.request(server)
      .patch(`/api/v1/exercises/${exerciseId}`)
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        level: 'Beginner'
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Updated exercise');
        done();
      });
  });

  it('Patch muscle groups should update a muscle group', done => {
    const muscleGroupId = 1;

    chai.request(server)
      .patch(`/api/v1/muscle-groups/${muscleGroupId}`)
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        targeted_area: 'Total'
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Updated muscle group');
        done();
      });
  });

  it('DELETE exercise should remove an exercise from database', done => {
    chai.request(server)
      .delete('/api/v1/exercises')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        id: 1
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Deleted exercise with id 1');
        done();
      });
  });

  it('DELETE exercise should not remove an exercise w/ missing data', done => {
    chai.request(server)
      .delete('/api/v1/exercises')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({})
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('error');
        response.body.error.should.equal(`You're missing an id property.`);
        done();
      });
  });

  it('DELETE muscle group should remove a muscle group from database', done => {
    chai.request(server)
      .delete('/api/v1/muscle-groups')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        id: 2
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Deleted muscle group with id 2');
        done();
      });
  });

  it('DELETE muscle grp should not remove muscle grp w/ missing data', done => {
    chai.request(server)
      .delete('/api/v1/muscle-groups')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({})
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('error');
        response.body.error.should.equal(`You're missing an id property.`);
        done();
      });
  });

  it('DELETE muscle grp should error w/ del muscle grp w/ exercises', done => {
    chai.request(server)
      .delete('/api/v1/muscle-groups')
      // eslint-disable-next-line 
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZG9AdHVyaW5nLmlvIiwiYXBwTmFtZSI6IkFsZG8iLCJpYXQiOjE1MjY1OTczNjEsImV4cCI6MTUyNjc3MDE2MX0.zxEQrmWb3xxO04xpWgTayaKsk-8ZWdu1EDRx1vLTTbQ')
      .send({
        id: '1'
      })
      .end((err, response) => {
        response.should.have.status(500);
        response.body.should.have.property('error');
        response.body.error.should
          .equal(`Please delete associated exercises first`);
        done();
      });
  });
}); 