
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../..';
import JwtHelper from '../helpers/JwtHelper';

const { expect } = chai;
chai.use(chaiHttp);

let token = '';
const loggedInUser = 'JohnAwesome';
const anotherUser = 'SweetHeart';
describe('Rating an article', () => {
  before(() => {
    chai.request(app).post('/api/v1/auth/login').send({
      username: loggedInUser,
      password: 'passWord4'
    }).end((err, res) => {
      ({ token } = res.body.user);
    });
  });

  it('should return an error if the user is not logged in', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-second-article-by-other-user/4`)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        done();
      });
  });

  it('should return error if I try to rate my own article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${loggedInUser}/the-first-article-by-the-user/4`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should return error if I try to rate an article that does not exist', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/this-does-not-exist-the-user/5`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should return error if I try to rate an article with string rating', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-first-article-by-another-user/love`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should fail gracefully if there is a database error', async () => {
    const badToken = await JwtHelper.createToken({ user: { id: 20, username: 'randomUser', email: 'random@random.com' } }, '72h');
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-first-article-by-another-user/3`)
      .set('x-access-token', badToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property('message');
      });
  });

  it('should give the rating and return the number of stars', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-first-article-by-another-user/2`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.nested.property('rating.value').to.equal(2);
        done();
      });
  });

  it('should not give a rating more than 5', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-second-article-by-another-user/8`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.nested.property('rating.value').to.equal(5);
        done();
      });
  });

  it('should not give a rating less than 1', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/other-articles-by-other-users/-10`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.nested.property('rating.value').to.equal(1);
        done();
      });
  });

  it('should update my rating if I already rated the article', (done) => {
    chai.request(app)
      .post(`/api/v1/articles/${anotherUser}/the-second-article-by-another-user/3`)
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('status').equal('success');
        expect(res.body).to.have.nested.property('rating.value').to.equal(3);
        done();
      });
  });
});
