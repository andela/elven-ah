import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import JwtHelper from '../helpers/JwtHelper';

chai.should();
chai.use(chaiHttp);

const user = {
  username: 'johnny',
  email: 'johnny4life@yandex.com',
};
const expiresIn = 3600;
const userToken = JwtHelper.createToken({ user }, expiresIn);

describe('GET /api/user Tests for user view profile endpoint', () => {
  it('should return 200 when the user is authenticated', (done) => {
    chai.request(app).get('/api/user')
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

  it('should return 401 when the token is not provided', (done) => {
    chai.request(app).get('/api/user')
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
        done();
      });
  });

  it('should return 401 when the token is provided but invalid', (done) => {
    chai.request(app).get('/api/user')
      .set('x-access-token', 'jbsuhiwerkmlko0wod0plewm09o2l3,[pweqick_nkefmc9o4k0ewkl34kew90ew-3iweoo320wep239iuqwd23w')
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
        done();
      });
  });
});

describe('PUT /api/user Tests for user update profile endpoint', () => {
  before(() => {
    chai.request(app).post('/api/auth/signup')
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

  it('should return 401 when the token is not provided', (done) => {
    chai.request(app).put('/api/user')
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
        done();
      });
  });

  it('should return 401 when the token is provided but invalid', (done) => {
    chai.request(app).put('/api/user')
      .set('x-access-token', 'jbsuhiwerkmlko0wod0plewm09o2l3,[pweqick_nkefmc9o4k0ewkl34kew90ew-3iweoo320wep239iuqwd23w')
      .end((req, res) => {
        res.status.should.eql(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
        done();
      });
  });

  it('should return 200 when a user provides valid properties to update their account', (done) => {
    chai.request(app).put('/api/user')
      .set('x-access-token', userToken)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johnny4life@yandex.com',
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

  it('should return 400 when a user does not provide an email', (done) => {
    chai.request(app).put('/api/user')
      .set('x-access-token', userToken)
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('The email field is required.');
        done();
      });
  });

  it('should return 400 when a user provides an image url that is not a valid url', (done) => {
    chai.request(app).put('/api/user')
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
    chai.request(app).put('/api/user')
      .set('x-access-token', userToken)
      .send({
        email: 'janeBlaise@gmail.com',
      })
      .end((req, res) => {
        res.status.should.eql(409);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('email').include('User with the email: janeBlaise@gmail.com already exists.');
        done();
      });
  });
});