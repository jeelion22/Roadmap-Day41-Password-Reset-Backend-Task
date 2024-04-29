const nodemailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USERNAME,
  EMAIL_PWD,
} = require("../utils/config");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,

    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PWD,
    },
  });

  //   defining email options
  const emailOPtions = {
    from: "JCompany support<support@jcompnay.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOPtions);
};

module.exports = sendEmail;
