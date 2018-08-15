import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('GET /api/articles Tests a list of paginated articles', () => {
  it('should return 200 when the articles are paginated', (done) => {
    chai.request(app).get('/api/articles?limit=2&offset=0')
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('articles').with.lengthOf(2);
        res.body.articles.should.be.a('array');
        res.body.articles[0].should.have.property('slug');
        res.body.articles[0].should.have.property('userId');
        res.body.articles[0].should.have.property('title');
        res.body.articles[0].should.have.property('categoryId');
        res.body.articles[0].should.have.property('body');
        res.body.articles[0].should.have.property('imageUrl');
        res.body.articles[0].should.have.property('createdAt');
        res.body.articles[0].should.have.property('updatedAt');
        res.body.articles[0].should.have.property('User');
        res.body.articles[0].should.have.property('tags');
        res.body.articles[0].should.have.property('ratings');
        res.body.articles[0].User.should.be.a('object');
        res.body.articles[0].tags.should.be.a('array');
        res.body.articles[0].ratings.should.be.a('array');
        done();
      });
  });

  it('should return 400 when the limit is not an integer', (done) => {
    chai.request(app).get('/api/articles?limit=uj')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('limit').include('The limit must be an integer.');
        done();
      });
  });

  it('should return 400 when the limit is a negative integer', (done) => {
    chai.request(app).get('/api/articles?limit=-2')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('limit').include('The limit must be at least 0.');
        done();
      });
  });

  it('should return 400 when the offset is not an integer', (done) => {
    chai.request(app).get('/api/articles?limit=2&offset=er')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('offset').include('The offset must be an integer.');
        done();
      });
  });

  it('should return 400 when the offset is a negative integer', (done) => {
    chai.request(app).get('/api/articles?limit=2&offset=-2')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('offset').include('The offset must be at least 0.');
        done();
      });
  });

  it('should return 404 when the offset and limit finds no article', (done) => {
    chai.request(app).get('/api/articles?limit=0&offset=0')
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('articles').include('No articles found.');
        done();
      });
  });
});

describe('GET /api/users/:username/articles Tests a list of paginated articles which belongs to a given', () => {
  it('should return 200 when there are articles that belongs to the author and the articles are paginated', (done) => {
    chai.request(app).get('/api/users/1/articles?limit=2&offset=0')
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('articles');
        res.body.articles.should.be.a('array');
        res.body.articles[0].should.have.property('slug');
        res.body.articles[0].should.have.property('userId');
        res.body.articles[0].should.have.property('title');
        res.body.articles[0].should.have.property('categoryId');
        res.body.articles[0].should.have.property('body');
        res.body.articles[0].should.have.property('imageUrl');
        res.body.articles[0].should.have.property('createdAt');
        res.body.articles[0].should.have.property('updatedAt');
        res.body.articles[0].should.have.property('User');
        res.body.articles[0].should.have.property('tags');
        res.body.articles[0].should.have.property('ratings');
        res.body.articles[0].User.should.be.a('object');
        res.body.articles[0].tags.should.be.a('array');
        res.body.articles[0].ratings.should.be.a('array');
        done();
      });
  });

  it('should return 400 when the userId is not a number', (done) => {
    chai.request(app).get('/api/users/ij/articles?limit=2')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('userId').include('userId must be a number.');
        done();
      });
  });

  it('should return 400 when the limit is not an integer', (done) => {
    chai.request(app).get('/api/users/1/articles?limit=uj')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('limit').include('The limit must be an integer.');
        done();
      });
  });

  it('should return 400 when the limit is a negative integer', (done) => {
    chai.request(app).get('/api/users/1/articles?limit=-2')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('limit').include('The limit must be at least 0.');
        done();
      });
  });

  it('should return 400 when the offset is not an integer', (done) => {
    chai.request(app).get('/api/users/1/articles?limit=2&offset=er')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('offset').include('The offset must be an integer.');
        done();
      });
  });

  it('should return 400 when the offset is a negative integer', (done) => {
    chai.request(app).get('/api/users/1/articles?limit=2&offset=-2')
      .end((req, res) => {
        res.status.should.eql(400);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('offset').include('The offset must be at least 0.');
        done();
      });
  });

  it('should return 404 when no articles where found for the user', (done) => {
    chai.request(app).get('/api/users/200/articles?limit=0&offset=0')
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('fail');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('articles').include('Articles not found for user with userId: 200.');
        done();
      });
  });
});
