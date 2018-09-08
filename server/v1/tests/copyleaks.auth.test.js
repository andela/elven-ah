import { describe, it, before } from 'mocha';
import { } from 'dotenv/config';
import 'chai/register-should';
import Auth from '../helpers/copyleaks/Auth';
import emails from '../helpers/emailMessages';

describe('Copyleaks authentication test', () => {
  let result = Auth.login();
  before(async () => {
    result = await Auth.login();
  });
  it('should log in successfully to the API when correct credentials are supplied', async () => {
    result.should.be.an('object').with.property('access_token');
    result.should.be.an('object').with.property('.issued');
    result.should.be.an('object').with.property('.expires');
  });
  it('should return an access token when the get accesstoken function is called', async () => {
    const getAccesstoken = Auth.accesstoken;
    getAccesstoken.should.be.a('string');
  });
  it('should send an email to the site admin when the Copyleaks credits have expired', async () => {
    const copyleaksCreditExhaustionMail = emails.copyleaksCreditExhaustion();
    copyleaksCreditExhaustionMail.should.be.an('object').with.property('subject').include('Copyleaks Credit Exhaustion');
    copyleaksCreditExhaustionMail.should.be.an('object').with.property('html').include('Our Copyleaks credits have finished');
  });
});
