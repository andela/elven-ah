import {
  beforeEach
} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import JwtHelper from '../helpers/JwtHelper';

chai.should();
chai.use(chaiHttp);

const user = {
  id: 1,
  username: 'unique',
  email: 'testseeder@test.com',
};

const anotherUser = {
  id: 2,
  username: 'simi',
  email: 'testsimi@test.com',
};

const expiresIn = 3600;
let token;
let anotherToken;
const authorsId = 1;

describe('Test for Authors Follow', () => {
  describe('login user', () => {
    beforeEach((done) => {
      token = JwtHelper.createToken({
        user
      }, expiresIn);
      done();
    });

    describe('login anotherUser', () => {
      beforeEach((done) => {
        anotherToken = JwtHelper.createToken({
          user: anotherUser
        }, expiresIn);
        done();
      });

      describe('POST /api/user/follow/:id', () => {
        it('should return 401 for trying to follow a user with no token', (done) => {
          chai.request(app)
            .post('/api/user/follow/1')
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it.only('should return 401 for trying to follow a user with an invalid token', (done) => {
          chai.request(app)
            .post('/api/user/follow/1')
            .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
              done();
            });
        });
        it.only('should return 200 for trying to follow a user with an invalid token', (done) => {
          chai.request(app)
            .post('/api/user/follow/1')
            .set('x-access-token', anotherToken)
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status').to.eql('success');
              res.body.message.should.be.a('array');
              // res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
              done();
            });
        });
      });
    });
  });
});
