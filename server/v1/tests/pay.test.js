import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
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
const oldPaymentReference = 'FLW-MOCK-7c47a1e6a7eecca561c094e902347fd5';
const paymentReference = 'FLW-MOCK-7a0fc50b9d1cbdc6389a31b9f2416c11';
const paymentReference2 = 'FLW-MOCK-ead540c457bd401e015ab6af8d0778a6';
const badPaymentReference = 'FL-MOCK-7c47a1e6a7eecca561c094e902347';

let token;


describe('Premium Account Upgrade', () => {
  describe('login a user', () => {
    beforeEach((done) => {
      token = JwtHelper.createToken({ user }, expiresIn);
      done();
    });

    describe('GET /api/v1/pay', () => {
      it('should fail when no token is provided', (done) => {
        chai.request(app)
          .get('/api/v1/pay')
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
          .get('/api/v1/pay')
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
          .get('/api/v1/pay')
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
          .get('/api/v1/pay?ref=')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('No payment reference provided');
            done();
          });
      });

      it('should fail on used payment reference for the article subscription process', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${oldPaymentReference}&type=${'article'}&aId=${1}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('This payment reference has already been used');

            done();
          });
      });

      it('should fail on used payment reference for the account upgrade subscription process', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${oldPaymentReference}&type=${'upgrade'}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('This payment reference has already been used');

            done();
          });
      });

      it('should fail on invalid payment reference', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${badPaymentReference}&type=${'upgrade'}`)
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
          .get(`/api/v1/pay?ref=${paymentReference}&type=${'upgrade'}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('success');
            res.body.should.have.property('message').to.include('Your account has been successfully ugraded to premium account');
            done();
          });
      });

      it('should fail on an empty article Id with invalid payment reference for the article subscription', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${badPaymentReference}&type=${'article'}&aId=`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('Article Id cannot be empty!');

            done();
          });
      });

      it('should fail on an INVLAID article Id provided with valid payment reference for the article subscription', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${paymentReference2}&type=${'article'}&aId=${'inval'}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('Please supply a valid article id.');

            done();
          });
      });

      it('should fail on an empty article Id with valid payment reference for the article subscription', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${paymentReference2}&type=${'article'}&aId=`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('Article Id cannot be empty!');

            done();
          });
      });

      it('should pass on an article Id provided with valid payment reference for the article subscription', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${paymentReference2}&type=${'article'}&aId=${2}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('success');
            res.body.should.have.property('message').to.include('You have been successfully subscribed to this article');

            done();
          });
      });

      it('should fail on invalid payment reference for the article subscription', (done) => {
        chai.request(app)
          .get(`/api/v1/pay?ref=${badPaymentReference}&type=${'article'}&aId=${1}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('status').equal('fail');
            res.body.should.have.property('message').to.include('Your subscription for this article failed. Kindly contact our helpdesk team.');

            done();
          });
      });
    });
  });
});
