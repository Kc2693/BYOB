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
}); 