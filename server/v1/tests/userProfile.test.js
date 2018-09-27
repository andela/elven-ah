import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import JwtHelper from '../helpers/JwtHelper';

chai.should();
chai.use(chaiHttp);

const user = {
  id: 1,
  username: 'JohnAwesome',
  email: 'johndoe@mail.com',
};
const expiresIn = 3600;
const userToken = JwtHelper.createToken({ user }, expiresIn);

describe('GET /api/v1/users/:username Tests for user view profile endpoint', () => {
  it('should return 200 when the user is authenticated', (done) => {
    chai.request(app).get('/api/v1/users/JohnAwesome')
      .set('x-access-token', userToken)
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('bio');
        res.body.user.should.have.property('image');
        done();
      });
  });
  it('should return a user profile', (done) => {
    chai.request(app).get('/api/v1/users/Sweetheart')
      .set('x-access-token', userToken)
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        done();
      });
  });

  it('should return 401 when the token is not provided', (done) => {
    chai.request(app).get('/api/v1/users/JohnAwesome')
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return 404 when a non-existent username is supplied', (done) => {
    chai.request(app).get('/api/v1/users/jjahhshg')
      .set('x-access-token', userToken)
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').include('User with the supplied username does not exist.');
        done();
      });
  });
});

describe('PUT /api/v1/users/:username Tests for user update profile endpoint', () => {
  before(() => {
    chai.request(app).post('/api/v1/auth/signup')
      .send({
        firstName: 'Jane',
        lastName: 'Blaise',
        username: 'Jane',
        email: 'janeBlaise@gmail.com',
        password: 'Twilight3',
        confirmPassword: 'Twilight3',
      })
      .end();
  });

  it('should return 200 when a user provides valid properties to update their account', (done) => {
    chai.request(app).put('/api/v1/users/JohnAwesome')
      .set('x-access-token', userToken)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        username: 'JohnAwesome',
        bio: `John Doe was born in 1977 when he arrived in Los Angeles. 
        His previous life in Tennessee, 
        Wisconsin & Baltimore was a great & fertile time but 
        new music and social changes led him to events that created a life in art.`,
        image: 'https://www.image.com/example/image/john'
      })
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('firstName');
        res.body.user.should.have.property('lastName');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('bio');
        res.body.user.should.have.property('image');
        done();
      });
  });

  it('should return 409 if I try to update the profile of another user', (done) => {
    chai.request(app).put('/api/v1/users/unique')
      .set('x-access-token', userToken)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        username: 'JohnAwesome',
        bio: `John Doe was born in 1977 when he arrived in Los Angeles. 
        His previous life in Tennessee, 
        Wisconsin & Baltimore was a great & fertile time but 
        new music and social changes led him to events that created a life in art.`,
        image: 'https://www.image.com/example/image/john'
      })
      .end((req, res) => {
        res.status.should.eql(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return 400 when a user does not provide an email or username', (done) => {
    chai.request(app).put('/api/v1/users/JohnAwesome')
      .set('x-access-token', userToken)
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The email field is required.');
        res.body.errors.should.have.property('username').include('The username field is required.');
        done();
      });
  });

  it('should return 400 when a user provides an image url that is not a valid url', (done) => {
    chai.request(app).put('/api/v1/users/JohnAwesome')
      .set('x-access-token', userToken)
      .send({
        email: 'samuel@test.com',
        image: 'googl-za-co',
      })
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('image').include('The image format is invalid.');
        done();
      });
  });

  it('should return 409 when a user provides an email that belongs to another user', (done) => {
    chai.request(app).put('/api/v1/users/JohnAwesome')
      .set('x-access-token', userToken)
      .send({
        email: 'johndoe@mail.com',
        username: 'oyomi'
      })
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        done();
      });
  });
});
