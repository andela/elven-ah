import { beforeEach } from 'mocha';
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
  firstName: 'simi',
  username: 'simi',
  email: 'testsimi@test.com',
};

const expiresIn = 3600;
let token;
let anotherToken;

describe('Test for Authors Follow', () => {
  describe('login user', () => {
    beforeEach((done) => {
      token = JwtHelper.createToken({ user }, expiresIn);
      done();
    });

    describe('login anotherUser', () => {
      beforeEach((done) => {
        anotherToken = JwtHelper.createToken({ user: anotherUser }, expiresIn);
        done();
      });

      describe('POST /api/user/follow/:id', () => {
        it('should return 401 for trying to follow a user with no token', (done) => {
          chai.request(app)
            .post('/api/user/follow/1')
            .send({
              followerId: user.id,
              followingId: 1,
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
        it('should return 401 for trying to follow a user with an invalid token', (done) => {
          chai.request(app)
            .post('/api/user/follow/1')
            .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
            .send({
              followerId: user.id,
              followingId: 1,
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
        it('should return 400 for trying to follow yourself', (done) => {
          const authorsId = 2;
          chai.request(app)
            .post(`/api/user/follow/${authorsId}`)
            .set('x-access-token', anotherToken)
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql('You can not follow yourself');
              done();
            });
        });
        it('should return 404 for trying to follow a non existing author', (done) => {
          const authorsId = 100;
          chai.request(app)
            .post(`/api/user/follow/${authorsId}`)
            .set('x-access-token', token)
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql('The author You have selected does not exist');
              done();
            });
        });
        it('should return 201 for just following a user', (done) => {
          const authorsId = 2;
          chai.request(app)
            .post(`/api/user/follow/${authorsId}`)
            .set('x-access-token', token)
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql(`You have started following ${anotherUser.firstName}`);
              done();
            });
        });
        it('should return 409 for trying to follow an author you are already following', (done) => {
          const authorsId = 2;
          chai.request(app)
            .post(`/api/user/follow/${authorsId}`)
            .set('x-access-token', token)
            .send({
              followerId: user.id,
              followingId: authorsId,
            })
            .end((err, res) => {
              res.status.should.eql(409);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql(`You are already following ${anotherUser.firstName}`);
              done();
            });
        });
      });
      describe('GET /api/user/follower/', () => {
        it('should return 401 for trying to get list of all your followers with no token', (done) => {
          chai.request(app)
            .get('/api/user/follower')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to get the list of all followers with an invalid token', (done) => {
          chai.request(app)
            .get('/api/user/follower')
            .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
              done();
            });
        });
        it('should return 404 for trying to get the list of all your follower when none follows you', (done) => {
          chai.request(app)
            .get('/api/user/follower')
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql('You currently do not have any follower');
              done();
            });
        });
        it('should return 200 for successfully retrieving the list of all your follower', (done) => {
          chai.request(app)
            .get('/api/user/follower')
            .set('x-access-token', anotherToken)
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql('You are currently being followed by these user');
              done();
            });
        });
      });
      describe('GET /api/user/following/', () => {
        it('should return 401 for trying to get list of the authors you currently with no token', (done) => {
          chai.request(app)
            .get('/api/user/following')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to get the list of the authors you currently follow with an invalid token', (done) => {
          chai.request(app)
            .get('/api/user/following')
            .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
              done();
            });
        });
        it('should return 404 for trying to get the list of all the author you follow when you are not currently following any author', (done) => {
          chai.request(app)
            .get('/api/user/following')
            .set('x-access-token', anotherToken)
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql('You are not currently following any author');
              done();
            });
        });
        it('should return 200 for successfully retrieving the list of all your follower', (done) => {
          chai.request(app)
            .get('/api/user/following')
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql('You currently follow these author');
              done();
            });
        });
      });
      describe('DELETE /api/user/follow/:id', () => {
        it('should return 401 for trying to unfollow an author with no token', (done) => {
          chai.request(app)
            .delete('/api/user/follow/1')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to unfollow an authoe with an invalid token', (done) => {
          chai.request(app)
            .delete('/api/user/follow/1')
            .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
              done();
            });
        });
        it('should return 404 for trying to unfollow an author that you currently do not follow', (done) => {
          const authorsId = 1;
          chai.request(app)
            .delete(`/api/user/follow/${authorsId}`)
            .set('x-access-token', anotherToken)
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('errors').eql('You are not currently following this Author');
              done();
            });
        });
        it('should return 200 for successfully unfollowing an author', (done) => {
          const authorsId = 2;
          chai.request(app)
            .delete(`/api/user/follow/${authorsId}`)
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql(`You have successfully unfollowed user with id ${authorsId}`);
              done();
            });
        });
      });
    });
  });
});
