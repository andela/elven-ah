import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import JwtHelper from '../helpers/JwtHelper';
import models from '../../models';
import CommentController from '../controllers/CommentController';

const { Article } = models;

chai.should();
chai.use(chaiHttp);
const user = {
  id: 2,
  username: 'unique',
  email: 'testseeder@test.com',
};
let token;
let validSlug;

const comments = [
  {
    id: 1,
    parentId: null,
    createdAt: '8/10/2018, 1:03:05 AM',
    updatedAt: '8/10/2018, 1:03:05 AM',
    body: 'Wow! What a lovely story!',
    author: {
      username: 'madeofhuman',
      bio: "There's a thing in the belly of that ship that can't ever die.",
      image: null,
      following: 'true'
    }
  },
  {
    id: 2,
    parentId: 1,
    createdAt: '8/10/2018, 1:11:04 AM',
    updatedAt: '8/10/2018, 1:11:04 AM',
    body: 'I totally agree with you, man!! 🙌🏾🙌🏾',
    author: {
      username: 'madeofhuman',
      bio: "There's a thing in the belly of that ship that can't ever die.",
      image: null,
      following: 'true'
    }
  },
  {
    id: 4,
    parentId: null,
    createdAt: '8/10/2018, 1:16:38 AM',
    updatedAt: '8/10/2018, 1:16:38 AM',
    body: '@madeofhuman what do you think about her students? I feel that for such a group of brilliant lawyers, they acted rather stupidly!',
    author: {
      username: 'madeofhuman',
      bio: "There's a thing in the belly of that ship that can't ever die.",
      image: null,
      following: 'true'
    }
  },
  {
    id: 3,
    parentId: 1,
    createdAt: '8/10/2018, 1:14:26 AM',
    updatedAt: '8/10/2018, 1:14:26 AM',
    body: 'You are so right! I fucking hate Annalise!',
    author: {
      username: 'madeofhuman',
      bio: "There's a thing in the belly of that ship that can't ever die.",
      image: null,
      following: 'true'
    }
  }
];

describe('Comment Tests', () => {
  before((done) => {
    token = JwtHelper.createToken({ user }, 3600);
    Article.findOne({ attributes: ['slug', 'id'] }).then((article) => {
      validSlug = article.slug;
    }).catch();
    done();
  });

  describe('Comment creation without a token', () => {
    it('should ask the user to log in', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${validSlug}/comments`)
        .send({
          body: 'I am a valid comment.',
        })
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
        .post(`/api/v1/articles/${validSlug}/comments`)
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
        .post(`/api/v1/articles/${validSlug}/comments`)
        .set('x-access-token', token)
        .send({
          body: 'I am a valid comment.',
        })
        .end((req, res) => {
          res.status.should.eql(201);
          res.body.should.be.an('object').with.property('status').eql('success');
          res.body.comment.should.have.property('article').include(validSlug);
          res.body.comment.should.have.property('body').include('I am a valid comment.');
          done();
        });
    });

    it('should not create the comment when an invalid slug is provided, or the article does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/articles/invalid-slug-87123/comments')
        .set('x-access-token', token)
        .send({
          body: 'I am a valid comment.',
        })
        .end((req, res) => {
          res.status.should.eql(400);
          res.body.should.be.an('object').with.property('status').eql('fail');
          res.body.should.have.property('message').include('The article slug supplied is invalid.');
          done();
        });
    });
  });

  describe('Comment reply creation with invalid parent id', () => {
    it('should create the comment as a first level comment', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${validSlug}/comments?id=-1`)
        .set('x-access-token', token)
        .send({
          body: 'I am a valid comment.',
        })
        .end((req, res) => {
          res.status.should.eql(201);
          res.body.should.be.an('object').with.property('status').eql('success');
          res.body.comment.should.have.property('article').include(validSlug);
          res.body.comment.should.have.property('parentId').eql(null);
          done();
        });
    });
  });

  describe('Comment creation with valid token but no body', () => {
    it('should throw an error', (done) => {
      chai.request(app)
        .post(`/api/v1/articles/${validSlug}/comments`)
        .set('x-access-token', token)
        .send({
        })
        .end((req, res) => {
          res.status.should.eql(400);
          res.body.should.be.an('object').with.property('status').eql('error');
          res.body.should.have.property('errors');
          res.body.errors.body.should.be.an('array').include('The body field is required.');
          done();
        });
    });
  });

  describe('Get all comments', () => {
    it('should return all comments of an article', (done) => {
      chai.request(app)
        .get(`/api/v1/articles/${validSlug}/comments`)
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
        .get(`/api/v1/articles/${validSlug}/comments/2`)
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
        .put(`/api/v1/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .send({ body: 'UPDATED COMMENT' })
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('comment');
          done();
        });
    });
  });

  describe('Comment update with valid token but no body', () => {
    it('should throw an error', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .send({})
        .end((req, res) => {
          res.status.should.eql(400);
          res.body.should.be.an('object').with.property('status').eql('error');
          res.body.should.have.property('errors');
          res.body.errors.body.should.be.an('array').include('The body field is required.');
          done();
        });
    });
  });

  describe('Comment update with valid token but invalid id', () => {
    it('should throw an error', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${validSlug}/comments/sdsd`)
        .set('x-access-token', token)
        .send({})
        .end((req, res) => {
          res.status.should.eql(400);
          done();
        });
    });
  });

  describe('Delete one comment', () => {
    it('should delete the comment with the given id', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${validSlug}/comments/2`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(200);
          res.body.should.be.an('object').with.property('status').include('success');
          res.body.should.have.property('message').include('Comment deleted.');
          done();
        });
    });

    it('should throw an error when supplied comment id is not a number', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${validSlug}/comments/rer`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(400);
          res.body.should.be.an('object').with.property('status').include('fail');
          res.body.should.have.property('message').include('Please supply a valid comment id.');
          done();
        });
    });

    it('should throw an error when supplied comment id is a number, but does not exist in the db', (done) => {
      chai.request(app)
        .get(`/api/v1/articles/${validSlug}/comments/900`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(404);
          res.body.should.be.an('object').with.property('status').include('fail');
          res.body.should.have.property('message').include('Unable to get the comment with supplied id.');
          done();
        });
    });

    it('should throw an error when supplied comment id is a number, but does not exist in the db', (done) => {
      chai.request(app)
        .put(`/api/v1/articles/${validSlug}/comments/900`)
        .set('x-access-token', token)
        .send({ body: 'UPDATED COMMENT' })
        .end((req, res) => {
          res.status.should.eql(404);
          res.body.should.be.an('object').with.property('status').include('fail');
          res.body.should.have.property('message').include('No comment found, please check the id supplied.');
          done();
        });
    });

    it('should throw an error when no comment with supplied id exists', (done) => {
      chai.request(app)
        .delete(`/api/v1/articles/${validSlug}/comments/900`)
        .set('x-access-token', token)
        .end((req, res) => {
          res.status.should.eql(404);
          res.body.should.be.an('object').with.property('status').include('fail');
          res.body.should.have.property('message').include('No comment with the supplied id found.');
          done();
        });
    });
  });

  describe('Comment nesting test', () => {
    it('should nest comments when supplied an array of comments with children', () => {
      const result = CommentController.nestComments(comments);
      result.should.be.an('array');
      result[0].should.be.an('object').with.property('id').eql(1);
      result[0].should.have.property('replies');
      result[0].replies.should.be.an('array');
      result[0].replies[0].should.be.an('object').with.property('id').eql(2);
    });
  });
});
