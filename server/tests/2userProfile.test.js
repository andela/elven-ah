import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import JwtHelper from '../helpers/JwtHelper';

chai.should();
chai.use(chaiHttp);

const user = {
  username: 'Johnny',
  email: 'johndoe@gmail.com',
};
const expiresIn = 3600;
const userToken = JwtHelper.createToken({ user }, expiresIn);

describe('ALL /api/user', () => {
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
