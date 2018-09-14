import { } from 'dotenv/config';
import Auth from '../helpers/copyleaks/Auth';
import Scanner from '../helpers/copyleaks/Scan';
import Mailer from '../helpers/Mailer';
import emails from '../helpers/emailMessages';

/**
 * Run a plagiarism check on an article if unattributed,
 * checking for a >= 50% match.
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next calls the next middleware
 */
const plagiarismCheck = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next();
  if (req.body.isAttributed !== 'true') {
    try {
      const scanner = new Scanner(Auth.accesstoken);
      const { body } = req.body;
      const processId = await scanner.uploadScan(body);
      const response = await scanner.checkResult(processId);
      const foundIn = response.results.filter(occurrence => occurrence.totalMatchedPercents >= 50);
      if (foundIn.length >= 1) {
        return res.status(451).send({
          status: 'error',
          message: `The article cannot be created because more than 50% of the content was found elsewhere.
        Please attribute your sources and check the 'I have attributed all relevant sources' button to continue.`
        });
      }
      next();
    } catch (err) {
      const msg = emails.copyleaksCreditExhaustion(process.env.SITE_ADMIN_EMAIL);
      Mailer.sendMail(msg);
      return res.status(599).send({
        status: 'error',
        message: 'The article cannot be created at the moment, please try again later.',
      });
    }
  }
  next();
};

export default plagiarismCheck;
