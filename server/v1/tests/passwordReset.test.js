import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import JwtHelper from '../helpers/JwtHelper';

chai.should();

chai.use(chaiHttp);

const emailToken = JwtHelper.createToken({ email: 'seayomi@gmail.com' }, 1800);

const updateToken = JwtHelper.createToken({ email: 'seayomi@gmail.com' }, 900);

const badToken = 'odcjdcsdkjhshsdADDSKKSDKLKLSDKLSLKKLSDJKJKSJwqjkwkd3ndcjdbm';
describe('Password reset', () => {
  it('should fail on empty email', (done) => {
    chai.request(app)
      .post('/api/v1/users/account/password/reset')
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
  it('should fail on invalid email format', (done) => {
    chai.request(app)
      .post('/api/v1/users/account/password/reset')
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
      .post('/api/v1/users/account/password/reset')
      .send({
        email: 'yomi@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('error');
        done();
      });
  });
  it('should pass and send a reset email if email exist', (done) => {
    chai.request(app)
      .post('/api/v1/users/account/password/reset')
      .send({
        email: 'seayomi@gmail.com',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        res.body.should.have.property('message')
          .include('A password reset link has been sent to your email. Please check your email');
        done();
      });
  });
  it('should fail if there is no reset token in the link', (done) => {
    chai.request(app)
      .get('/api/v1/users/account/password/reset')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('should fail on bad token provided when a user access the password reset link', (done) => {
    chai.request(app)
      .get(`/api/v1/users/account/password/reset?tokenId=${badToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        done();
      });
  });
  it('should fail on wrong token query parameter on verifying user reset link', (done) => {
    chai.request(app)
      .get(`/api/v1/users/account/password/reset?token=${badToken}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        done();
      });
  });
  it('should pass for a valid token query parameter from reset password link sent to email', (done) => {
    chai.request(app)
      .get(`/api/v1/users/account/password/reset?tokenId=${emailToken}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        done();
      });
  });
  it('should fail on wrong token query parameter while a user access the reset link', (done) => {
    chai.request(app)
      .put(`/api/v1/users/account/password/reset?token=${badToken}`)
      .send({ password: 'Xolatqowb1$', confirmPassword: 'Xolatqowb1$' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        done();
      });
  });
  it('should pass on successful password update', (done) => {
    chai.request(app)
      .put(`/api/v1/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: 'Xolatqowb1', confirmPassword: 'Xolatqowb1' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal('success');
        done();
      });
  });
  it('should fail on empty password', (done) => {
    chai.request(app)
      .put(`/api/v1/users/account/password/reset?tokenId=${updateToken}`)
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
      .put(`/api/v1/users/account/password/reset?tokenId=${updateToken}`)
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
      .put(`/api/v1/users/account/password/reset?tokenId=${updateToken}`)
      .send({ password: 'Xxolatqowb1', confirmPassword: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errors.should.have.property('confirmPassword');
        done();
      });
  });
});
