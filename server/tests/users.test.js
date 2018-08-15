
import chai from 'chai';
import chaiHttp from 'chai-http';
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

  it('should create a token and return it', (done) => {
    token = JwtHelper.createToken({ user }, expiringIn);
    expect(token).to.be.a('string');
    done();
  });

  it('should verify a token and return the payload', (done) => {
    const payload = JwtHelper.verifyToken(token);
    expect(payload).to.be.an('object');
    done();
  });

  it('should verify a token and return a payload with user object', (done) => {
    const payload = JwtHelper.verifyToken(token);
    expect(payload).to.have.property('user');
    expect(payload).to.have.nested.property('user.email');
    done();
  });
});
