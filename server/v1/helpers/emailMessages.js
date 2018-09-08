// The email messages needed by the application
const emails = {
  emailVerification: (email, url) => ({
    to: email,
    from: 'no-reply@authorshaven.com',
    subject: "Authors' Haven Email Confirmation",
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
      `
  }),
  passwordReset: (email, passwordResetUrl, name) => ({
    to: email,
    from: 'no-reply@authorshaven.com',
    subject: "Authors' Haven Password Reset Request",
    html: `
            Hi, ${name},
            <br><br>
            You requested a password reset for your Authors' Haven account
            <br>Click the link below to reset your password. This link is Valid for
            thirty (30) minutes.
            <br><br>
            ${passwordResetUrl}
            <br><br>
            <strong>
            If you did not request this change, ignore this message and your password
            will not be changed.
            </strong>
            <br>
            Cheers,
            <br><br>
            Sincerely,<br>
            The Authors' Haven team.
          `
  }),
  passwordResetConfirmation: (email, name) => ({
    to: email,
    from: 'no-reply@authorshaven.com',
    subject: 'Author\'s Haven password changed successfully',
    html: `
            Hi, ${name},
            <br><br>
            Your Authors' Haven password has been changed successfully. You can login now with
            your new password to continue enjoy great articles.
            <br>
            Cheers!
            <br><br>
            <br><br>
            Sincerely,<br>
            The Authors' Haven team.
          `
  }),
  copyleaksCreditExhaustion: email => ({
    to: email,
    from: 'admin@authorshaven.com',
    subject: 'Copyleaks Credit Exhaustion',
    html: `
        Hi,
        <br><br>
        Our Copyleaks credits have finished. We could either change the email again,
        or maybe actually try shelling out a few bucks for the premium version. 🤷🏾‍♂️<br><br>
        Sincerely,<br>
        Us.
      `
  }),
};
export default emails;
