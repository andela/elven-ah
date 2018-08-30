import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import AuthController from '../controllers/AuthController';

chai.should();
chai.use(chaiHttp);

describe('Test for Passport Authentication', () => {
  it('should return 200 for successful authentication', (done) => {
    chai.request(app).get('/api/auth/mock').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message').to.include('Welcome to Author');
      done();
    });
  });

  it('should return 400 for already used token params or invalid token', (done) => {
    chai.request(app).get('/api/auth/google/callback?code=jhgjkhgkjhglkjhlkjhlk,jh').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('message').eql('This token has already been used. Please login again');
      done();
    });
  });

  it('should return 400 for already used token params or invalid token', (done) => {
    chai.request(app).get('/api/auth/facebook/callback?code=jhgjkhgkjhglkjhlkjhlk,jh').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('message').eql('This token has already been used. Please login again');
      done();
    });
  });

  it('should return 200 if facebook login is successful', async () => {
    const cb = (state, user) => [state, user];
    const accessToken = {};
    const refreshToken = {};
    const err = null;
    const res = {
      body: {},
      status(status) {
        this.status = status;
        return this;
      },
      send(data) {
        this.body = data;
        return this;
      }
    };
    const [, user] = await AuthController.facebookCallback(accessToken, refreshToken, {
      displayName: 'Veracious-lovely',
      name: {
        givenName: 'Veracious',
        familyName: 'Lovely',
      },
      id: 1222227766354545473,
      emails: [{ value: 'veracious@test.com' }],
    }, cb);
    const signup = await AuthController.finishSocialLogin(err, user, res, 'Facebook');
    signup.status.should.eql(201);
    signup.body.should.be.a('object');
    signup.body.should.have.property('status').eql('success');
    signup.body.should.have.property('message');
    signup.body.should.have.property('user');
  });

  it('should return 201 if google login is successful', async () => {
    const cb = (state, user) => [state, user];
    const accessToken = {};
    const refreshToken = {};
    const err = null;
    const res = {
      body: {},
      status(status) {
        this.status = status;
        return this;
      },
      send(data) {
        this.body = data;
        return this;
      }
    };
    const [, user] = await AuthController.googleCallback(accessToken, refreshToken, {
      displayName: 'Veracious-Unbranded',
      name: {
        givenName: 'Veracious',
        familyName: 'Unbranded',
      },
      id: 66776678886666666778,
      emails: [{ value: 'unbranded@test.com' }],
      photos: [{ value: 'http://image.com/test-image' }],
    }, cb);
    const signup = await AuthController.finishSocialLogin(err, user, res, 'Google');
    signup.status.should.eql(201);
    signup.body.should.be.a('object');
    signup.body.should.have.property('status').eql('success');
    signup.body.should.have.property('message');
    signup.body.should.have.property('user');
  });
});
