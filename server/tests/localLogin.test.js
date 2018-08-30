import { } from 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('User Login', () => {
  it('Should return forbidden error if user is not verified', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'janedoe@mail.com',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(403);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('message');
      done();
    });
  });

  it('Should login a user with email and password', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'johndoe@mail.com',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('user');
      done();
    });
  });

  it('Should login a user with username and password', (done) => {
    chai.request(app).post('/api/auth/login').send({
      username: 'Sweetheart',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(200);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('user');
      done();
    });
  });

  it('Should return validation errors if invalid username is used', (done) => {
    chai.request(app).post('/api/auth/login').send({
      username: 'Jan',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('Should return validation errors if invalid email is used', (done) => {
    chai.request(app).post('/api/auth/login').send({
      username: 'johndoe@',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('Should return validation errors if invalid password is used', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'sweetie@mail.com',
      password: 'passord4'
    }).end((err, res) => {
      res.status.should.eql(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('Should return validation errors if no password is supplied', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'sweetie@mail.com',
    }).end((err, res) => {
      res.status.should.eql(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('errors');
      done();
    });
  });

  it('Should return not found errors if a user with the supplied email/username is not found', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'invalid@invalid.com',
      password: 'passWord4'
    }).end((err, res) => {
      res.status.should.eql(404);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('message');
      done();
    });
  });

  it('Should return unauthenticated error if the password is wrong', (done) => {
    chai.request(app).post('/api/auth/login').send({
      email: 'sweetie@mail.com',
      password: 'passWord44'
    }).end((err, res) => {
      res.status.should.eql(401);
      res.body.should.be.an('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('message');
      done();
    });
  });
});
