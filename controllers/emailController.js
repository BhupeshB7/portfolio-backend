// controllers/emailController.js
const Email = require("../models/emailModel");
// const transporter = require('../config/emailConfig');

// exports.sendEmail = async (req, res) => {
//   const { name, email, message } = req.body;

//   const mailOptions = {
//     from: email,
//     to: 'bhupesh@gmail.com',
//     subject: `Message from ${name}`,
//     text: message
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     const newEmail = new Email({ name, email, message });
//     await newEmail.save();
//     res.status(200).send('Email sent and data saved');
//   } catch (error) {
//     res.status(500).send(error.toString());
//   }
// };
const fs = require("fs");
const util = require("util");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const nodemailerConfig = require("../config/emailConfig"); // Assuming you have a nodemailer configuration file

const readFile = util.promisify(fs.readFile);

exports.sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = nodemailer.createTransport(nodemailerConfig);

    // Load the HTML template
    const template = await readFile("./email-template.html", "utf-8");

    // Use EJS to render the template with dynamic data
    const html = ejs.render(template, { name, email, message });

    const mailOptions = {
      from: nodemailerConfig.auth.user,
      to: "bhupeshkr2912@gmail.com", // Replace with your Gmail address
      subject: "New Contact Form From Bhupesh portfolio",
      html: html,
    };

    await transporter.sendMail(mailOptions);
    const newEmail = new Email({ name, email, message });
    // await newEmail.save();
    // res.status(200).send("Email sent and data saved");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
