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
            You requested a password reset for the selected ${email} as your email address for your
            Authors' Haven account.<br>Click the link below to continue with this
            request
            <br><br>
            ${passwordResetUrl}
            <br><br>
            Sincerely,<br>
            The Authors' Haven team.
          `
  }),
  passwordResetConfirmation: (email, name) => ({
    to: email,
    from: 'no-reply@authorshaven.com',
    subject: 'Your Author\'s Haven passowrd has been changed',
    html: `
            Hi, ${name},
            <br><br>
            Your password has been changed for the account associated with ${email}.
            <br>
            <br >
            If you did not make this change and believe your Author's Haven account has been compromised, 
            please contact support@authorshaven.com
            <br><br>
            <br><br>
            Sincerely,<br>
            The Authors' Haven team.
          `
  })
};
export default emails;
