import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('Test for Passport Authentication', () => {
  it('should return 200 for successful authentication', (done) => {
    chai.request(app).get('/api/auth/mock').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('message').eql("Welcome to Author's Haven API");
      done();
    });
  });

  it('should return 400 for already used token params or invalid token', (done) => {
    chai.request(app).get('/api/auth/google/callback?code=jhgjkhgkjhglkjhlkjhlk,jh').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql(400);
      res.body.should.have.property('success').eql(false);
      res.body.should.have.property('message').eql('TokenError: The token has already been used');
      done();
    });
  });
});
