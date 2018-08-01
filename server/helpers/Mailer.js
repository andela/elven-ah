import { } from 'dotenv/config';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends an email with Sendgrid API
 * @param {object} msg the email params
 * @param {string} msg.to the receiver's email address
 * @param {string} msg.from the sender's email address
 * @param {string} msg.subject the email subject
 * @param {string} msg.text the plain text email body
 * @param {string} msg.html the HTML email body
 * }
 */
const sendMail = (msg) => {
  sgMail.send(msg);
};

export default sendMail;
