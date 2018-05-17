const chai = require('chai');
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the home page', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      })
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      })
  });
})

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

  it('GET muscle groups by id should return an error if muscle group is not found', done => {
    const muscleGroupId = 3;

    chai.request(server)
      .get(`/api/v1/muscle-groups/${muscleGroupId}`)
      .end((err, response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.have.property('error');
        response.body.error.should.equal('Could not find muscle group with id 3');
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

  it('GET exercises by id should return an error if exercise is not found', done => {
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

  it('POST exercises should not create an exercise with missing data ', done => {
    chai.request(server)
      .post('/api/v1/exercises')
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
        response.body.error.should.equal(`You're missing a muscle_group_id property.`);
        done();
      });
  });

  it('POST muscle_groups should create a new muscle group', done => {
    chai
      .request(server)
      .post('/api/v1/muscle-groups')
      .send({
        targeted_area: 'Obliques',
        muscle_group: 'Abdominals',
        train_with: 'Biceps, Triceps'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(2);
        done();
      });
  });

  it('POST muscle groups should not create a muscle group with missing data ', done => {
    chai.request(server)
      .post('/api/v1/muscle-groups')
      .send({
        targeted_area: 'Obliques',
        muscle_group: 'Abdominals'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.should.have.property('error');
        response.body.error.should.equal(`You're missing a train_with property.`);
        done();
      });
  });

  it('Patch exercises should update an exercise', done => {
    const exerciseId = 1;

    chai.request(server)
      .patch(`/api/v1/exercises/${exerciseId}`)
      .send({
        level: 'Beginner'
      })
      .end((err, response) => {
        response.should.have.status(202);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('message');
        response.body.message.should.equal('Updated exercise');
        done();
      });
  });
}); 