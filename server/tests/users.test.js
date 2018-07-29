
import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '..';
import JwtHelper from '../helpers/JwtHelper';

const { expect } = chai;
chai.use(chaiHttp);


let token = '';
describe('Creating and verifying JWT tokens', () => {
  const user = {
    email: 'agada@test.com',
    username: 'Awesome',
  };
  const expiringIn = 3600;

  it('It should create a token and return it', (done) => {
    token = JwtHelper.createToken({ user }, expiringIn);
    expect(token).to.be.a('string');
    done();
  });

  it('It should verify a token and return the payload', (done) => {
    const payload = JwtHelper.verifyToken(token);
    expect(payload).to.be.an('object');
    done();
  });

  it('It should verify a token and return a payload with user object', (done) => {
    const payload = JwtHelper.verifyToken(token);
    expect(payload).to.have.property('user');
    expect(payload).to.have.nested.property('user.email');
    done();
  });
});


describe('Accessing authenticate-only routes', () => {
  it('It should return error if token is not supplied', (done) => {
    chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        done();
      });
  });

  it('it should return error if invalid token is supplied', (done) => {
    const invalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwidXNlcm5hbWUiOiJBbmRlbGEiLCJlbWFpbCI6ImFuZGVsYUB0ZXN0cy5jb20ifSwiaWF0IjoxNTMyODc5MDE1LCJleHAiOjE1MzU0NzEwMTV9.y0w4bC53q0DQZh__6G0LNhyFw_HJaeVp2eN1E8YrJO0';
    chai.request(server)
      .get('/api/users')
      .set('x-access-token', invalid)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.have.property('errors');
        done();
      });
  });

  it('it should return a user if a valid token is supplied', (done) => {
    chai.request(server)
      .get('/api/users')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('user');
        done();
      });
  });
});
