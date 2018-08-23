import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Test for User Custom Search', () => {
  it('should return 400 for query parameter not supplied', (done) => {
    chai.request(app).get('/api/search').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message').to.include('Please enter a search keyword');
      done();
    });
  });

  it('should return 400 for an empty query parameter', (done) => {
    chai.request(app).get('/api/search?q=').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message').to.include('Please enter a search keyword');
      done();
    });
  });

  it('should return 400 for an empty query parameter', (done) => {
    chai.request(app).get('/api/search?').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('message').to.include('Please enter a search keyword');
      done();
    });
  });

  it('should return 200 and empty result object array for a search keyword not found', (done) => {
    chai.request(app).get('/api/search?q=hh').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('result');
      res.body.result.should.be.a('object');
      res.body.result.should.have.property('userSearch').eql([]);
      res.body.result.should.have.property('articleSearch').eql([]);
      res.body.result.should.have.property('tagSearch').eql([]);
      done();
    });
  });

  it('should return 200 and empty result object array for a search keyword not found', (done) => {
    chai.request(app).get('/api/search?q=hh').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('result');
      res.body.result.should.be.a('object');
      res.body.result.should.have.property('userSearch').eql([]);
      res.body.result.should.have.property('articleSearch').eql([]);
      res.body.result.should.have.property('tagSearch').eql([]);
      done();
    });
  });

  it('should return 200 and arrays of search results for a search keyword', (done) => {
    chai.request(app).get('/api/search?q=yomi').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('result');
      res.body.result.should.be.a('object');
      res.body.result.userSearch.should.be.a('array');
      res.body.result.articleSearch.should.be.a('array');
      res.body.result.tagSearch.should.be.a('array');
      done();
    });
  });
});
