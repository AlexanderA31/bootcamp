const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const send = (opts) => transporter.sendMail({
  from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
  ...opts
});

const safeSend = async (opts) => {
  try { return await send(opts); }
  catch (e) { console.warn('Email error:', e.message); return null; }
};

module.exports = { send, safeSend };
