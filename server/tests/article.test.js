import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import JwtHelper from '../helpers/JwtHelper';
import dashReplace from '../helpers/replaceDash';
import randomString from '../helpers/randomString';

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

const title = 'Ann mary$# is a teacher';
const body = 'There is so much to learn in simulations';
const categoryId = 1;
const tags = 'tech,andela';

describe('Test for Article Request', () => {
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

      describe('POST /api/articles/', () => {
        it('should return 401 for trying to create an article with no token', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to create an article with an invalid token', (done) => {
          chai.request(app)
            .post('/api/articles/')
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
        it('should return 400 for trying to create an article with an empty body with only spaces', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title: 'The golde man',
              body: '     ',
              categoryId: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('body').include('The body field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article with an empty title with only spaces', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title: '    ',
              body: 'lorem ipsiunkdjfl;skdjf;lskdjf;lkdf ',
              categoryId: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('title').include('The title field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article with an empty category with only spaces', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title: 'title',
              body: 'lorem ipsiunkdjfl;skdjf;lskdjf;lkdf ',
              categoryId: '       ',
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('categoryId').include('The categoryId field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article without providing the body field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('body').include('The body field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article without providing the title field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              body,
              categoryId: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('title').include('The title field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article without providing the categoryId field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title: 'title',
              body: 'lorem ipsiunkdjfl;skdjf;lskdjf;lkdf ',
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('categoryId').include('The categoryId field is required.');
              done();
            });
        });
        it('should return 400 for trying to create an article by providing an INTEGER in title field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title: 1,
              categoryId,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('title').include('The title must be a string.');
              done();
            });
        });
        it('should return 400 for trying to create an article by providing an INTEGER in body field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              categoryId,
              body: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('body').include('The body must be a string.');
              done();
            });
        });
        it('should return 400 for trying to create an article by providing a STRING in categoryId field', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 'category',
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId must be an integer.');
              done();
            });
        });
        it('should return 400 if categoryId specified is above the maximum provided', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 100,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId may not be greater than 5.');
              done();
            });
        });
        it('should return 400 if categoryId specified is below the minimum provided', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 0,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId must be at least 1.');
              done();
            });
        });
        it('should return 201 for successfully creating an article', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              body,
              categoryId,
              isAttributed: 'true',
            })
            .end((err, res) => {
              res.status.should.eql(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('message').eql('The article has been created successfully');
              res.body.article.should.have.property('title').eql(title);
              res.body.article.should.have.property('body').eql(body);
              res.body.article.should.have.property('categoryId').eql(1);
              done();
            });
        });
        it('should return 201 for successfully creating an article with tags', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              body,
              categoryId,
              tags,
            })
            .end((err, res) => {
              res.status.should.eql(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('message').eql('The article has been created successfully');
              res.body.article.should.have.property('title').eql(title);
              res.body.article.should.have.property('body').eql(body);
              res.body.article.should.have.property('tags').eql(['tech', 'andela']);
              res.body.article.should.have.property('categoryId').eql(1);
              done();
            });
        });
        it('should return 201 and empty tag array for successfully creating an article without tags', (done) => {
          chai.request(app)
            .post('/api/articles/')
            .set('x-access-token', token)
            .send({
              title,
              body,
              categoryId,
            })
            .end((err, res) => {
              res.status.should.eql(201);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('message').eql('The article has been created successfully');
              res.body.article.should.have.property('title').eql(title);
              res.body.article.should.have.property('body').eql(body);
              res.body.article.should.have.property('tags').eql([]);
              res.body.article.should.have.property('categoryId').eql(1);
              done();
            });
        });
      });

      describe('PUT /api/articles/:slug', () => {
        it('should return 401 for trying to update an article with no token', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to update an article with an invalid token', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
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
        it('should return 400 for trying to update an article by providing an INTEGER in body field', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              title,
              categoryId,
              body: 1,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('body').include('The body must be a string.');
              done();
            });
        });
        it('should return 400 for trying to update an article by providing an INTEGER in title field', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              title: 1,
              categoryId,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.should.have.property('title').include('The title must be a string.');
              done();
            });
        });
        it('should return 400 if categoryId specified is below the minimum provided', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 0,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId must be at least 1.');
              done();
            });
        });
        it('should return 400 for trying to update an article by providing a STRING in CategoryId field', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 'categoryId',
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId must be an integer.');
              done();
            });
        });
        it('should return 400 if the categoryId specified is above the maximum provided', (done) => {
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              title,
              categoryId: 108,
              body,
            })
            .end((err, res) => {
              res.status.should.eql(400);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('error');
              res.body.errors.categoryId[0].should.eql('The categoryId may not be greater than 5.');
              done();
            });
        });
        it('should return 404 for trying to update an article that does not exist', (done) => {
          const slug = `${dashReplace(title)}-${randomString(10)}`;
          chai.request(app)
            .put('/api/articles/slug')
            .set('x-access-token', token)
            .send({
              slug,
              title,
              body,
              categoryId,
              isAttributed: 'true',
            })
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(404);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('The specified article does not exist');
              done();
            });
        });
        it('should return 403 for trying to update an article belongs to another user', (done) => {
          chai.request(app)
            .put('/api/articles/arts-is-wonderful-120794ujhd')
            .set('x-access-token', anotherToken)
            .send({
              title: 'A beautiful sunday morning',
              isAttributed: 'true',
            })
            .end((err, res) => {
              res.status.should.eql(403);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(403);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('You can only update an article that belongs to you');
              done();
            });
        });
        it('should return 200 for successfully updating an article', (done) => {
          chai.request(app)
            .put('/api/articles/arts-is-wonderful-120794ujhd')
            .set('x-access-token', token)
            .send({
              title: 'A beautiful sunday morning',
              isAttributed: 'true',
            })
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql('success');
              res.body.should.have.property('message').eql('The article with slug: arts-is-wonderful-120794ujhd has been updated successfully');
              done();
            });
        });
      });

      describe('DELETE /api/articles/:slug', () => {
        it('should return 401 for trying to create an article with no token', (done) => {
          chai.request(app)
            .delete('/api/articles/slug')
            .end((err, res) => {
              res.status.should.eql(401);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.be.a('object');
              res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
              done();
            });
        });
        it('should return 401 for trying to create an article with an invalid token', (done) => {
          chai.request(app)
            .delete('/api/articles/slug')
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
        it('should return 404 for trying to delete an article that does not exist', (done) => {
          chai.request(app)
            .delete('/api/articles/slug')
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.eql(404);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(404);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('The specified article does not exist');
              done();
            });
        });
        it('should return 403 for trying to delete an article belongs to another user', (done) => {
          chai.request(app)
            .delete('/api/articles/arts-is-wonderful-120794ujhd')
            .set('x-access-token', anotherToken)
            .end((err, res) => {
              res.status.should.eql(403);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(403);
              res.body.should.have.property('success').eql(false);
              res.body.should.have.property('message').eql('You can only delete an article that belongs to you');
              done();
            });
        });
        it('should return 200 for successfully deleting an article', (done) => {
          chai.request(app)
            .delete('/api/articles/arts-is-wonderful-120794ujhd')
            .set('x-access-token', token)
            .end((err, res) => {
              res.status.should.eql(200);
              res.body.should.be.a('object');
              res.body.should.have.property('status').eql(200);
              res.body.should.have.property('success').eql(true);
              res.body.should.have.property('message').eql('Article with slug: arts-is-wonderful-120794ujhd has been successfully deleted');
              done();
            });
        });
      });
    });
  });
});
