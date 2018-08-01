import {
  describe, it,
} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

// Test user request API/functions
describe('User request API Tests', () => {
  it('should fail on empty email', (done) => {
    chai.request(app)
      .post('/api/users/account/password/reset')
      .send({
        email: '',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        res.body.errors.should.have.property('email').include('The email field is required.');
        done();
      });
  });
  it('should fail on empty improper email format', (done) => {
    chai.request(app)
      .post('/api/users/account/password/reset')
      .send({
        email: 'yomi@gmail',
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        res.body.errors.should.have.property('email').include('The email format is invalid.');
        done();
      });
  });
  it('should fail on email not found', (done) => {
    chai.request(app)
      .post('/api/users/account/password/reset')
      .send({
        email: 'yomi@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('fail');
        res.body.errors.should.have.property('email')
          .include('The email you provided does not exist, please check again.');
        done();
      });
  });
});
