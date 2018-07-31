const emails = {
  emailVerification: (email, url) => ({
    to: email,
    from: 'no-reply@authorshaven.com',
    subject: 'Authors\' Haven Email Confirmation',
    html: `
      Hi,
      <br><br>
      You have selected ${email} as your email address for your
      Authors' Haven account.<br>Click the link below to verify this
      email address belongs to you.
      <br><br>
      ${url}
      <br><br>
      Sincerely,<br>
      The Authors' Haven team.
    `,
  }),
};
export default emails;
