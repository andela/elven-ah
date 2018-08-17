import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('GET /api/articles/:slug Tests an article with the slug', () => {
  it('should return 200 when an article with the slug is found', (done) => {
    chai.request(app).get('/api/articles/unmissable-steps-before-74U33U38N3IHF3')
      .end((req, res) => {
        res.status.should.eql(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('article');
        res.body.article.should.be.a('object');
        res.body.article.should.have.property('id');
        res.body.article.should.have.property('slug');
        res.body.article.should.have.property('userId');
        res.body.article.should.have.property('title');
        res.body.article.should.have.property('categoryId');
        res.body.article.should.have.property('body');
        res.body.article.should.have.property('imageUrl');
        res.body.article.should.have.property('createdAt');
        res.body.article.should.have.property('updatedAt');
        res.body.article.should.have.property('User');
        res.body.article.should.have.property('ratings');
        res.body.article.should.have.property('tags');
        res.body.article.User.should.be.a('object');
        res.body.article.tags.should.be.a('array');
        res.body.article.ratings.should.be.a('array');
        done();
      });
  });

  it('should return 404 when no article with the slug is found', (done) => {
    chai.request(app).get('/api/articles/no-article-with-this-slug-exists-n8u39dnu93u')
      .end((req, res) => {
        res.status.should.eql(404);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('article').include('Article with slug: no-article-with-this-slug-exists-n8u39dnu93u not found.');
        done();
      });
  });
});