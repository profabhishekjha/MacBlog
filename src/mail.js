import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const fromemail = process.env.FROMEMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromemail,
    pass: pass,
  },
});

export const mailOptions = {
  from: fromemail,
  to: email,
};
