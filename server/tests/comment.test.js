import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import JwtHelper from '../helpers/JwtHelper';
import models from '../models';

const { Article } = models;

chai.should();
chai.use(chaiHttp);
const user = {
  id: 1,
  username: 'unique',
  email: 'testuser@test.com',
};
let token;
let validSlug;

describe('Comment Tests', () => {
  before((done) => {
    token = JwtHelper.createToken({ user }, 3600);
    Article.find({ attributes: ['slug'] }).then((article) => {
      validSlug = article.slug;
    }).catch();
    done();
  });

  describe('Comment creation without a token', () => {
    it('should ask the user to log in', (done) => {
      chai.request(app)
        .post(`/api/articles/${validSlug}/comments`)
        .end((req, res) => {
          res.status.should.eql(401);
          res.body.should.be.an('object').with.property('errors');
          res.body.errors.should.be.an('object').with.property('token').include('You must be logged in to perform this operation');
          done();
        });
    });
  });

  describe('Comment creation with invalid token', () => {
    it('should notify the user of token invalidity, and ask them to log in', (done) => {
      chai.request(app)
        .post(`/api/articles/${validSlug}/comments`)
        .set('x-access-token', 'jsdlkfjsdkfjksdjflksajflk')
        .end((req, res) => {
          res.status.should.eql(401);
          res.body.should.be.an('object').with.property('errors');
          res.body.errors.should.be.an('object').with.property('token').include('Your access token is invalid or expired. Please login again');
          done();
        });
    });
  });

  describe('Comment creation with valid token', () => {
    it('should create the comment', (done) => {
      chai.request(app)
        .post(`/api/articles/${validSlug}/comments`)
        .set('x-access-token', token)
        .send({
          articleSlug: validSlug,
          author: user.username,
          parentId: null,
          body: 'I am a valid comment.',
        })
        .end((req, res) => {
          res.status.should.eql(201);
          res.body.should.be.an('object').with.property('status').eql('success');
          res.body.comment.should.have.property('article').include(validSlug);
          done();
        });
    });
  });

  describe('Get all comments', () => {
    it('should return all comments of an article', (done) => {
      chai.request(app)
        .get(`/api/articles/${validSlug}/comments`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('comments');
          done();
        });
    });
  });

  describe('Get one comment', () => {
    it('should return the comment with the given id', (done) => {
      chai.request(app)
        .get(`/api/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('comment');
          done();
        });
    });
  });

  describe('Update one comment', () => {
    it('should update the comment with the given id', (done) => {
      chai.request(app)
        .put(`/api/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .send({ body: 'UPDATED COMMENT' })
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('data');
          done();
        });
    });
  });

  describe('Delete one comment', () => {
    it('should delete the comment with the given id', (done) => {
      chai.request(app)
        .delete(`/api/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('message').include('Comment deleted.');
          done();
        });
    });
  });
});
