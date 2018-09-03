import { describe, it } from 'mocha';
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

const badToken = 'odcjdcsdkjhshsdADDSKKSDKLKLSDKLSLKKLSDJKJKSJwqjkwkd3ndcjdbm';
const expiresIn = 900;
const paymentReference = 'FLW-MOCK-7c47a1e6a7eecca561c094e902347fd5';
const badPaymentReference = 'FL-MOCK-7c47a1e6a7eecca561c094e902347';

let token;


describe('Premium Account Upgrade', () => {
  describe('login a user', () => {
    beforeEach((done) => {
      token = JwtHelper.createToken({ user }, expiresIn);
      done();
    });

    describe('GET /api/pay', () => {
      it('should fail when no token is provided', (done) => {
        chai.request(app)
          .get('/api/pay')
          .end((err, res) => {
            res.status.should.eql(401);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.be.a('object');
            res.body.errors.should.have.property('token').include('You must be logged in to perform this operation');
            done();
          });
      });
      it('should fail when a bad token is provided', (done) => {
        chai.request(app)
          .get('/api/pay')
          .set('x-access-token', badToken)
          .end((err, res) => {
            res.status.should.eql(401);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.be.a('object');
            res.body.errors.should.have.property('token').include('Your access token is invalid or expired. Please login again');
            done();
          });
      });

      it('should fail when no payment reference is provided', (done) => {
        chai.request(app)
          .get('/api/pay')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('No payment reference provided');
            done();
          });
      });

      it('should fail on empty payment reference', (done) => {
        chai.request(app)
          .get('/api/pay?ref=')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('No payment reference provided');
            done();
          });
      });

      it('should fail on invalid payment reference', (done) => {
        chai.request(app)
          .get(`/api/pay?ref=${badPaymentReference}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('Your upgrade process failed. Kindly contact the helpdesk team.');

            done();
          });
      });

      it('should upgrade user account when provided valid payment reference', (done) => {
        chai.request(app)
          .get(`/api/pay?ref=${paymentReference}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('success');
            res.body.should.have.property('message').to.include('You have been upgraded to a premium account.');
            done();
          });
      });
    });
  });
});
