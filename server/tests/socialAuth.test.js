import { } from 'dotenv/config';
import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// createMockPassport(app);
// connectPassport(app, passport);

chai.should();
chai.use(chaiHttp);

describe('/api/auth/mock', () => {
  it('should return 400 when there is token error', (done) => {
    chai.request(app).get('/api/auth/mock').end((req, res) => {
      res.status.should.eql(400);
      res.body.should.be.a('object');
      // res.body.should.have.property('status').eql('fail');
      // res.body.should.have.property('message').eql('Google Authentication fail');
      done();
    });
  });

  it('should return 200 for successful authentication', (done) => {
    chai.request(app).get('/api/auth/mock').end((req, res) => {
      res.status.should.eql(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('message').eql("Welcome to Author's Haven API");
      done();
    });
  });
});
