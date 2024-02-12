import nodemailer from "nodemailer";
import config from "../config/config.js";
import { layoutMail, mailType } from "../config/email.js";

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => console.log("Connected to email server"))
    .catch(() =>
      console.log(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const sendEmail = async (to, subject, type, token) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html: layoutMail(type, token),
  };
  await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password";
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  await sendEmail(to, subject, mailType.FORGOT_PASSWORD, token);
};

const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification";
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  await sendEmail(to, subject, mailType.VERIFICATION_EMAIL, token);
};

const emailService = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};

export default emailService;
