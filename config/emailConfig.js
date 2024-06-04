// // config/emailConfig.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS
//   }
// });

// module.exports = transporter;
module.exports = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
};
