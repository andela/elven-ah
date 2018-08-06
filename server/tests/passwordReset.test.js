import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

// test and update token
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlYXlvbWlAZ21haWwuY29tIiwiaWF0IjoxNTMzNTkyODkyLCJleHAiOjE1NjUxMjg4OTJ9.NMjImSX1Yh_2JFzhrRtCW_1PVV-V3Cjj4UZBE-e-Fvg';
const updateToken = testToken;

// A bad token
const badToken = 'odcjdcsdkjhshsdADDSKKSDKLKLSDKLSLKKLSDJKJKSJwqjkwkd3ndcjdbm';
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
  it('should pass and send a reset email on email exist', (done) => {
    chai.request(app)
      .post('/api/users/account/password/reset')
      .send({
        email: 'seayomi@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        res.body.should.have.property('message')
          .include('A password reset link has been sent to your email. Please check your email');
        done();
      });
  });
  it('should fail on token not provided on user accessing reset link', (done) => {
    chai.request(app)
      .get('/api/users/account/password/reset')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should fail on bad token provided on user accessing reset link', (done) => {
    chai.request(app)
      .get(`/api/users/account/password/reset?tokenId=${badToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should pass on bad token provided on user accessing reset link', (done) => {
    chai.request(app)
      .get(`/api/users/account/password/reset?tokenId=${badToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should fail on wrong token query parameter on verifying user reset link', (done) => {
    chai.request(app)
      .get(`/api/users/account/password/reset?token=${badToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should pass on verify token query parameter from link sent to mail', (done) => {
    chai.request(app)
      .get(`/api/users/account/password/reset?tokenId=${testToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        done();
      });
  });
  it('should fail on wrong token query parameter on user accessing reset link', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?token=${badToken}`)
      .send({ password: 'Xolatqowb1$', confirmPassword: 'Xolatqowb1$' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should fail on wrong token query parameter on user accessing reset link', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?token=${badToken}`)
      .send({ password: 'Xolatqowb1$', confirmPassword: 'Xolatqowb1$' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('token');
        done();
      });
  });
  it('should pass on successful password update', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: 'Xolatqowb1', confirmPassword: 'Xolatqowb1' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        done();
      });
  });
  it('should fail on password not supplied', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: '', confirmPassword: 'Xolatqowb1' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('password').include('The password field is required.');
        done();
      });
  });
  it('should fail on password and confirm password not matching', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: 'Xolatqowb1', confirmPassword: 'Xolatqowb' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('confirmPassword').include('The confirmPassword and password fields must match.');
        done();
      });
  });
  it('should fail on confirm password not supplied', (done) => {
    chai.request(app)
      .put(`/api/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: 'Xxolatqowb1', confirmPassword: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('confirmPassword');
        done();
      });
  });
});
