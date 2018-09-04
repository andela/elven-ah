import { } from 'dotenv/config';
import 'chai/register-should';
import Mailer from '../helpers/Mailer';

describe('Mailer test', () => {
  it('should send a mail', async () => {
    const msg = {
      to: 'johnny4life@yandex.com',
      from: 'no-reply@authorshaven.com',
      subject: 'Email confirmation',
      html: '<em>Confirm your email</em>',
    };
    const result = await Mailer.sendMail(msg);
    result.should.be.an('array');
    result[0].should.be.an('object').with.property('statusCode').eql(202);
  });
});
