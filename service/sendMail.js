const nodemailer = require("nodemailer");
const config = require("../config/mail");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Silahkan salin kode dibawah dan pergi ke halaman aktivasi akun</p>
          <h3>Kode Aktivasi: ${confirmationCode}</h3>
          </div>`,
  }).catch(err => console.log(err, 'ok'));
};